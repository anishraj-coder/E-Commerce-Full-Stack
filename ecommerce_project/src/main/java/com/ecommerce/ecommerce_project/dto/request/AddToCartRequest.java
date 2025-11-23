package com.ecommerce.ecommerce_project.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddToCartRequest {

    @NotNull(message = "need a product ID")
    private Long productId;

    @NotNull(message = "Need a quantity")
    private Integer quantity;

    @JsonProperty("size")
    @NotNull(message = "Selected size can't be null")
    private String selectedSize;


}
