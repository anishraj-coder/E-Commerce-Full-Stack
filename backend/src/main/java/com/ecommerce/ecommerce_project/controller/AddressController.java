package com.ecommerce.ecommerce_project.controller;


import com.ecommerce.ecommerce_project.dto.request.CreateAddressRequest;
import com.ecommerce.ecommerce_project.entity.Address;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.repository.AddressRepository;
import com.ecommerce.ecommerce_project.service.AddressService;
import com.ecommerce.ecommerce_project.service.AppUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;
    private final AppUserService appUserService;

    private AppUser getAppUserFromPrincipal(Principal principal){
        String email=principal.getName();
        return appUserService.getAppUserFromEmail(email);
    }

    @GetMapping
    public ResponseEntity<List<Address>> getAddress(Principal principal){
        AppUser user=this.getAppUserFromPrincipal(principal);
        return ResponseEntity.ok(addressService.getAddressFromUser(user));
    }

    @PostMapping
    public ResponseEntity<Address> addAddressToUser(Principal principal,
                                                    @Valid @RequestBody CreateAddressRequest request){
        AppUser user=this.getAppUserFromPrincipal(principal);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addressService.addAddressToUser(user, request));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> removeAddressFromUser(Principal principal, @PathVariable Long addressId){
        addressService.removeAddress(this.getAppUserFromPrincipal(principal),addressId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
