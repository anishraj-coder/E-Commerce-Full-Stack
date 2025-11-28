package com.ecommerce.ecommerce_project.exception;

import io.jsonwebtoken.JwtException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles @Valid annotation failures (DTO validation).
     * Returns HTTP 400 Bad Request.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Build a custom error message string from all field errors
        StringBuilder errors = new StringBuilder();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.append(fieldName).append(": ").append(errorMessage).append("; ");
        });

        // Remove the last "; "
        String errorMsg = errors.substring(0, errors.length() - 2);

        ErrorResponse response = new ErrorResponse(errorMsg, HttpStatus.BAD_REQUEST, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    /**
     * Handles exceptions from your services (e.g., "Product not found").
     * You use this for all "findById" failures.
     * Returns HTTP 404 Not Found.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        ErrorResponse response = new ErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    /**
     * Handles duplicate data entries (e.g., unique constraints).
     * You use this for "Product with title already exists".
     * Returns HTTP 409 Conflict.
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityException(DataIntegrityViolationException e) {
        // Provides a cleaner message than the full SQL error
        String message = "A resource with this information already exists.";
        if (e.getMostSpecificCause().getMessage().contains("title")) {
            message = "A product with this title already exists.";
        }

        ErrorResponse response = new ErrorResponse(message, HttpStatus.CONFLICT, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    /**
     * Handles incorrect login credentials.
     * Returns HTTP 401 Unauthorized.
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException e) {
        ErrorResponse response = new ErrorResponse("Invalid email or password.", HttpStatus.UNAUTHORIZED, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    /**
     * Handles user not found during login.
     * Returns HTTP 404 Not Found.
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(UsernameNotFoundException e) {
        ErrorResponse response = new ErrorResponse(e.getMessage(), HttpStatus.NOT_FOUND, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    /**
     * Handles bad request parameters (e.g., passing "abc" for a price).
     * Returns HTTP 400 Bad Request.
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String error = String.format("Parameter '%s' has invalid value '%s'. Expected type: %s",
                ex.getName(), ex.getValue(), ex.getRequiredType().getSimpleName());
        ErrorResponse response = new ErrorResponse(error, HttpStatus.BAD_REQUEST, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    /**
     * A general "catch-all" handler for any other exceptions.
     * This includes NullPointerException, etc.
     * Returns HTTP 500 Internal Server Error.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception e) {
        ErrorResponse response = new ErrorResponse("An unexpected error occurred: " + e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException e){
        ErrorResponse response=new ErrorResponse(e.getMessage(),HttpStatus.UNAUTHORIZED,LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalStateException(IllegalStateException e){
        ErrorResponse response=new ErrorResponse(e.getMessage(),HttpStatus.BAD_REQUEST,LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }
    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ErrorResponse> handleSecurityException(SecurityException e) {
        ErrorResponse response = new ErrorResponse(e.getMessage(), HttpStatus.FORBIDDEN, LocalDateTime.now());
        return ResponseEntity.status(response.status()).body(response);
    }
}