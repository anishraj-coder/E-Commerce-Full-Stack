package com.ecommerce.ecommerce_project.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderRequest {

    @NotNull(message = "cant be null")
    private Long addressId;
}
