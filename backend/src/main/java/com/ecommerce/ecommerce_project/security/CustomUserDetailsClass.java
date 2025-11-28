package com.ecommerce.ecommerce_project.security;

import com.ecommerce.ecommerce_project.entity.types.RoleTypes;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class CustomUserDetailsClass extends User {
    private Long id;
    private Set<RoleTypes> roles;
    public CustomUserDetailsClass(Long id, String email, String password, Set<RoleTypes>roles, List<SimpleGrantedAuthority> rolesAuth){
        super(email,password,rolesAuth);
        this.id=id;
        this.roles=roles;
    }
}
