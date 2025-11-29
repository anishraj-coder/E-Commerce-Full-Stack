package com.ecommerce.ecommerce_project.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebConfig  {
    private final CustomCorsConfiguration corsConfig;
    private final JwtFilter filter;
    private final HandlerExceptionResolver handlerExceptionResolver;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)throws  Exception{
        http.csrf(csrf->csrf.disable())
                .cors(cors->cors.configurationSource(corsConfig.corsConfigurationSource()))
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth->auth
                        .requestMatchers("/auth/**","/health/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/categories/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/products/**").authenticated()
                        .requestMatchers(HttpMethod.PATCH,"/products/**").authenticated()
                        .requestMatchers(HttpMethod.POST,"/products/**").authenticated()
                        .requestMatchers(HttpMethod.GET,"/reviews/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/reviews/**").authenticated()
                        .anyRequest().authenticated()
                ).exceptionHandling(ex->
                        ex.authenticationEntryPoint(customAuthenticationEntryPoint)
                                .accessDeniedHandler(accessDeniedHandler)
                )
                .addFilterBefore(filter, BasicAuthenticationFilter.class);
        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)throws Exception{
        return configuration.getAuthenticationManager();
    }

}
