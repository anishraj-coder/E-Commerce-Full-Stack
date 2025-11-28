package com.ecommerce.ecommerce_project.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateCartRequest {

    @NotNull(message = "Need a quantity param")
    private Integer quantity;
}
