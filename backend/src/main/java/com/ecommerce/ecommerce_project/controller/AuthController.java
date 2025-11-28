package com.ecommerce.ecommerce_project.controller;


import com.ecommerce.ecommerce_project.dto.request.LoginRequest;
import com.ecommerce.ecommerce_project.dto.request.SignUpRequest;
import com.ecommerce.ecommerce_project.dto.response.LoginResponse;
import com.ecommerce.ecommerce_project.dto.response.SignUpResponse;
import com.ecommerce.ecommerce_project.security.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> sign(@Valid @RequestBody SignUpRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(request));
    }
}
