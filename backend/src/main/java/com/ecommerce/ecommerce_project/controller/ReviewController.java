package com.ecommerce.ecommerce_project.controller;

import com.ecommerce.ecommerce_project.dto.request.ReviewRequest;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.Review;
import com.ecommerce.ecommerce_project.service.AppUserService;
import com.ecommerce.ecommerce_project.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final AppUserService appUserService;

    private AppUser getAppUser(Principal principal) {
        return appUserService.getAppUserFromEmail(principal.getName());
    }


    @PostMapping("/create")
    public ResponseEntity<Review> createReview(Principal principal,
                                               @Valid @RequestBody ReviewRequest request) {
        AppUser user = getAppUser(principal);
        Review review = reviewService.createReview(user, request.getProductId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }


    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<Review>> getProductReviews(@PathVariable Long productId,
                                                          Pageable pageable) {
        return ResponseEntity.ok(reviewService.getAllReviewsOfProduct(productId, pageable));
    }
}