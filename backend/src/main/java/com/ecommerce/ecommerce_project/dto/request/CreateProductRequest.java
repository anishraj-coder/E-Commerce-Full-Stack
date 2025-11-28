package com.ecommerce.ecommerce_project.dto.request;

import com.ecommerce.ecommerce_project.entity.Size; // Import the embedded Size class
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class CreateProductRequest {


    @NotBlank(message = "Title can't be blank")
    private String title;

    @NotBlank(message = "Brand can't be blank")
    private String brand;

    @NotBlank(message = "Color can't be blank")
    private String color;

    @NotBlank(message = "Image URL can't be blank")
    private String imageUrl;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be positive")
    private Double price;

    @NotNull(message = "Discount percentage is required")
    @Min(value = 0, message = "Discount percentage must be positive")
    private Double discountPercent;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Size and quantity information is required")
    private Set<Size> size;


    @NotNull(message = "Category path cant be null ")
    private List<String> categoryPath;

    private String description;
}