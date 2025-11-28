package com.ecommerce.ecommerce_project.service;

import com.ecommerce.ecommerce_project.dto.response.UserResponseDTO;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.repository.AppUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository userRepository;

    public AppUser  getAppUserFromEmail(String email){
        return  userRepository.findByEmail(email).orElseThrow(()->{
            log.error("Cannot find the user with email {}",email);
            return new UsernameNotFoundException("Cannot find the user with email: "+email);
        });
    }

    public UserResponseDTO getUseDetails(Principal principal){
        AppUser user=this.getAppUserFromEmail(principal.getName());
        return new UserResponseDTO(user.getId(), user.getEmail(),user.getFirstName(),user.getLastName(),
                user.getPhoneNo(), user.getImageUrl());
    }
}
