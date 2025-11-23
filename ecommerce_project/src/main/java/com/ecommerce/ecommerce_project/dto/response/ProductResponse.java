package com.ecommerce.ecommerce_project.dto.response;

public record ProductResponse(Long id,String title,Double discountedPrice,Long categoryId) {
}
