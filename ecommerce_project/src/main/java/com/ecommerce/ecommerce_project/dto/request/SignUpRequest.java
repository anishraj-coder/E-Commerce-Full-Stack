package com.ecommerce.ecommerce_project.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class SignUpRequest {

    @NotBlank(message = "First name required")
    private String firstName;

    @NotBlank(message = "Last name required")
    private String lastName;

    @Email(message = "enter a valid email")
    private String email;

    @NotBlank(message = "password is required")
    private String password;

    @Length(max=10,min = 10,message = "Phone number is 10 digits long")
    private String phoneNo;

}
