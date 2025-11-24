package com.ecommerce.ecommerce_project.controller;

import com.ecommerce.ecommerce_project.dto.request.AddToCartRequest;
import com.ecommerce.ecommerce_project.dto.request.UpdateCartRequest;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.Cart;
import com.ecommerce.ecommerce_project.service.AppUserService;
import com.ecommerce.ecommerce_project.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final AppUserService appUserService;

    @GetMapping
    public ResponseEntity<Cart> getCart(@AuthenticationPrincipal String userEmail){
        AppUser user=appUserService.getAppUserFromEmail(userEmail);
        Cart cart =cartService.getOrCreateCart(user);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItemToCart(@AuthenticationPrincipal String userEmail,
                                              @Valid @RequestBody AddToCartRequest request){
        log.info("Principal Type: {}", userEmail.getClass().getName());
        log.info("Principal Value: {}", userEmail);

        AppUser user=appUserService.getAppUserFromEmail(userEmail);

        return ResponseEntity.status(HttpStatus.CREATED).body(cartService
                .addItemToCart(request.getProductId(),request.getQuantity(),request.getSelectedSize(),user));
    }

    @PatchMapping("/item/{itemId}")
    public ResponseEntity<Cart> updateQuantityOfItem(@AuthenticationPrincipal String userEmail,
                                                     @PathVariable Long itemId,
                                                     @Valid @RequestBody UpdateCartRequest request){
        AppUser user=appUserService.getAppUserFromEmail(userEmail);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(cartService.updateItemQuantity(itemId,request.getQuantity(),user));
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<Cart> deleteItemFromCart(@AuthenticationPrincipal String userEmail,
                                                   @PathVariable Long itemId){
        AppUser user=appUserService.getAppUserFromEmail(userEmail);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(cartService.removeItemFromCart(user,itemId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal String userEmail){
        AppUser user=appUserService.getAppUserFromEmail(userEmail);
        Cart cart=cartService.getOrCreateCart(user);
        cartService.clearCart(cart.getId());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .build();
    }
}
