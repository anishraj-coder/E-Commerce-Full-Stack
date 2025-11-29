package com.ecommerce.ecommerce_project.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final AuthUtils authUtils;
    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Incoming request from URL: {}",request.getRequestURL());
        try{
            String header=request.getHeader("Authorization");
            if(header==null||header.isBlank()||!header.startsWith("Bearer ")){
                filterChain.doFilter(request,response);
                return;
            }
            String token=header.split("Bearer ")[1];
            Claims claims=null;
            try{
                claims=authUtils.getClaimsFromToken(token);
            }catch (Exception e){
                log.error("Invalid jwt token: {}", e.getMessage());
                handlerExceptionResolver.resolveException(request, response, null, e);
                return;
            }

            String email=claims.getSubject();
            List<String> roles=claims.get("roles",List.class);

            if(email!=null&&!email.isBlank()&& SecurityContextHolder.getContext().getAuthentication()==null){
                var roleAuth=roles.stream().map(SimpleGrantedAuthority::new).toList();
                UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(
                        email,null,roleAuth
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            filterChain.doFilter(request,response);
        }catch (Exception e){
            log.error(e.getMessage());
            handlerExceptionResolver.resolveException(request,response,null,e);
        }

    }
}
