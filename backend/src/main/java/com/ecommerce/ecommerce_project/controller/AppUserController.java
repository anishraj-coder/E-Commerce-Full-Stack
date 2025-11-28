package com.ecommerce.ecommerce_project.controller;

import com.ecommerce.ecommerce_project.dto.response.UserResponseDTO;
import com.ecommerce.ecommerce_project.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService userService;

    @GetMapping("/info")
    public ResponseEntity<UserResponseDTO> getUserInfo(Principal principal){
        return ResponseEntity.ok(userService.getUseDetails(principal));
    }
}
