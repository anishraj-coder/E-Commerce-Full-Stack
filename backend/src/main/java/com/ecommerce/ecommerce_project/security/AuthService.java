package com.ecommerce.ecommerce_project.security;

import com.ecommerce.ecommerce_project.dto.request.LoginRequest;
import com.ecommerce.ecommerce_project.dto.request.SignUpRequest;
import com.ecommerce.ecommerce_project.dto.response.LoginResponse;
import com.ecommerce.ecommerce_project.dto.response.SignUpResponse;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.types.Provider;
import com.ecommerce.ecommerce_project.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final AppUserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthUtils authUtils;
    private AuthenticationManager authenticationManager;
    @Autowired
    private void setAuthenticationManager(@Lazy AuthenticationManager authenticationManager){
        this.authenticationManager=authenticationManager;
    }

    public SignUpResponse signup(SignUpRequest request){
        AppUser user=userRepository.findByEmail(request.getEmail())
                .orElse(null);
        if(user!=null){
            log.error("Email id already exists {}",request.getEmail());
            throw new DataIntegrityViolationException("Email id already exists "+request.getEmail());

        }
        user=AppUser.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .provider(Provider.EMAIL)
                .addresses(new ArrayList<>())
                .providerId("1111")
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNo(request.getPhoneNo())
                .build();
        AppUser savedUser=userRepository.save(user);
        return new SignUpResponse(savedUser.getEmail(),savedUser.getId());
    }

    public LoginResponse login(LoginRequest request){
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );

        CustomUserDetailsClass user=(CustomUserDetailsClass) authentication.getPrincipal();
        String jwt=authUtils.generateJwtToken(user);
        return new LoginResponse(jwt,user.getId());
    }
}
