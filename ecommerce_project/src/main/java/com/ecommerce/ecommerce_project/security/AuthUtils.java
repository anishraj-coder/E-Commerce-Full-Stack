package com.ecommerce.ecommerce_project.security;


import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class AuthUtils {

    @Value("${jwt.secretKey}")
    private String secretKey;

    public String generateJwtToken(CustomUserDetailsClass user){
        var roles=user.getRoles().stream().map(role->"ROLE_"+role.name()).toList();
        return Jwts.builder()
                .subject(user.getUsername())
                .claim("userId",user.getId().toString())
                .claim("roles",roles)
                .signWith(this.getSecretKey())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .compact();
    }

    public SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
    public Claims getClaimsFromToken(String token){
        return Jwts.parser().verifyWith(this.getSecretKey()).build().parseSignedClaims(token).getPayload();
    }
    public String getEmailFromToken(String token){
        Claims claims=this.getClaimsFromToken(token);

        return String.valueOf(claims.get("email"));
    }
}
