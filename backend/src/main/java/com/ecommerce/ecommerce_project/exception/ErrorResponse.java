package com.ecommerce.ecommerce_project.exception;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record ErrorResponse (String error, HttpStatus status, LocalDateTime time){
}
