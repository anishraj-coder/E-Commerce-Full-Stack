package com.ecommerce.ecommerce_project.security;

import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.types.RoleTypes;
import com.ecommerce.ecommerce_project.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user=appUserRepository.findByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException("Email not found "+username));
        var roles= user.getRoles().stream().map(role->new SimpleGrantedAuthority("ROLE_"+role.name()))
                .collect(Collectors.toList());
        return new CustomUserDetailsClass(user.getId(),username,user.getPassword(),Set.of(RoleTypes.CUSTOMER),roles);
    }
}
