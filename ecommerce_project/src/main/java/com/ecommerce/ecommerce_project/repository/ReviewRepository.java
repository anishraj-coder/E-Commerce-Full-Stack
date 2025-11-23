package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findAllByProductId(Long id, Pageable pageable);
}