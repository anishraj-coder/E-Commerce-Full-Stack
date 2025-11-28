package com.ecommerce.ecommerce_project.service;

import com.ecommerce.ecommerce_project.dto.request.ReviewRequest;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.Product;
import com.ecommerce.ecommerce_project.entity.Review;
import com.ecommerce.ecommerce_project.repository.AppUserRepository;
import com.ecommerce.ecommerce_project.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final AppUserRepository appUserRepository;
    private final ReviewRepository reviewRepository;
    private final ProductService productService;
    private final OrderService orderService;

    @Transactional
    public Review createReview(AppUser user, Long productId, ReviewRequest request){
        Product product=productService.findProductById(productId);
        boolean hasPurchased=orderService.hasPurchased(user,product);
        if(!hasPurchased){
            log.error("user has not purchased the product with id: {}",productId);
            throw new IllegalStateException("User has not purchased the order id: "+productId);
        }
        Review review= Review.builder()
                .createdAt(LocalDateTime.now())
                .review(request.getReviewContent())
                .rating(request.getRating())
                .user(user)
                .product(product)
                .build();
        Review savedReview=reviewRepository.save(review);
        user.getReviews().add(savedReview);
        appUserRepository.save(user);
        return savedReview;
    }

    @Transactional(readOnly = true)
    public Page<Review> getAllReviewsOfProduct(Long productId, Pageable pageable){
        return  reviewRepository.findAllByProductId(productId,pageable);
    }
}
