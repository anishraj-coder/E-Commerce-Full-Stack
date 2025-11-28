package com.ecommerce.ecommerce_project.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class CreateAddressRequest {

    @NotBlank(message = "need a first name")
    private String firstName;

    @NotBlank(message = "need a last name")
    private String lastName;

    @NotBlank(message = "need a zip code")
    @Length(min = 4,message = "zip code length can't be less than 4")
    private String zip;

    @NotBlank(message = "need a state")
    private String state;

    @NotBlank(message = "need a city")
    private String city;

    @NotBlank(message = "need a street address")
    private String streetAddress;

    @NotBlank(message = "need a phone number")
    @Length(min = 10,max = 10, message = "need a 10 digit phone number")
    private String phoneNo;
}
