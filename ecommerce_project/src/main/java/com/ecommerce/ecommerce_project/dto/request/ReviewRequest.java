package com.ecommerce.ecommerce_project.dto.request;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class ReviewRequest {

    @NotNull(message = "need a product id")
    private Long productId;

    @NotBlank(message = "need the review content")
    @Length(min = 4, max =100, message = "Review content must be between 4 and 100 characters")
    private String reviewContent;

    @NotNull(message = "need a rating value")
    @Max(value = 5,message = "max value can be 5")
    @Min(value=1, message = "minimum value can be 1")
    private Integer rating;
}
