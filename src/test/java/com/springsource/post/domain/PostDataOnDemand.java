package com.springsource.post.domain;

import com.springsource.post.repository.PostRepository;
import com.springsource.post.service.PostService;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.roo.addon.dod.RooDataOnDemand;
import org.springframework.stereotype.Component;

@Configurable
@Component
@RooDataOnDemand(entity = Post.class)
public class PostDataOnDemand {

	private Random rnd = new SecureRandom();

	private List<Post> data;

	@Autowired
    PostService postService;

	@Autowired
    PostRepository postRepository;

	public Post getNewTransientPost(int index) {
        Post obj = new Post();
        setText(obj, index);
        setTitle(obj, index);
        return obj;
    }

	public void setText(Post obj, int index) {
        String text = "text_" + index;
        obj.setText(text);
    }

	public void setTitle(Post obj, int index) {
        String title = "title_" + index;
        obj.setTitle(title);
    }

	public Post getSpecificPost(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Post obj = data.get(index);
        Long id = obj.getId();
        return postService.findPost(id);
    }

	public Post getRandomPost() {
        init();
        Post obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return postService.findPost(id);
    }

	public boolean modifyPost(Post obj) {
        return false;
    }

	public void init() {
        int from = 0;
        int to = 10;
        data = postService.findPostEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Post' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Post>();
        for (int i = 0; i < 10; i++) {
            Post obj = getNewTransientPost(i);
            try {
                postService.savePost(obj);
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            postRepository.flush();
            data.add(obj);
        }
    }
}
