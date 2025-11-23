package com.ecommerce.ecommerce_project.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class UpdateProductRequest {


    private String title;
    private String brand;
    private String color;
    private String imageUrl;


    @Min(value = 0, message = "Price must be positive")
    private Double price;

    @Min(value = 0, message = "Discount percentage must be positive")
    private Double discountPercent;


    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    private Set<com.ecommerce.ecommerce_project.entity.Size> size;

    private String description;

    private List<String> categories;
}
