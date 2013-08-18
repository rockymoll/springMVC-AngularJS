package com.springsource.post.repository;

import com.springsource.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.roo.addon.layers.repository.jpa.RooJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@RooJpaRepository(domainType = Post.class)
public interface PostRepository extends JpaSpecificationExecutor<Post>, JpaRepository<Post, Long> {
}
