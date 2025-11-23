package com.ecommerce.ecommerce_project.dto.response;

import lombok.Builder;
import lombok.Data;


@Builder
public record SignUpResponse(String email,Long id) {}
