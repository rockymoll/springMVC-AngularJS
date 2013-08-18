package com.springsource.post.service;

import com.springsource.post.domain.Post;
import java.util.List;
import org.springframework.roo.addon.layers.service.RooService;

@RooService(domainTypes = { com.springsource.post.domain.Post.class })
public interface PostService {

	public abstract long countAllPosts();


	public abstract void deletePost(Post post);


	public abstract Post findPost(Long id);


	public abstract List<Post> findAllPosts();


	public abstract List<Post> findPostEntries(int firstResult, int maxResults);


	public abstract void savePost(Post post);


	public abstract Post updatePost(Post post);

}
