package com.ecommerce.ecommerce_project.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {

    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "entera password")
    private String password;
}
