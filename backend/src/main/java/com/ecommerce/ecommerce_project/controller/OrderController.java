package com.ecommerce.ecommerce_project.controller;

import com.ecommerce.ecommerce_project.dto.request.OrderRequest;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.Order;
import com.ecommerce.ecommerce_project.entity.types.OrderStatus;
import com.ecommerce.ecommerce_project.repository.AppUserRepository;
import com.ecommerce.ecommerce_project.service.AppUserService;
import com.ecommerce.ecommerce_project.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    private final AppUserService userService;

    private AppUser getAppUserFromPrincipal(Principal principal){
        return userService.getAppUserFromEmail(principal.getName());
    }

    @GetMapping("/history")
    public ResponseEntity<Page<Order>> getOrderHistory(
            Principal principal,
            @RequestParam(required = false) List<OrderStatus> status, // e.g., ?status=PLACED,SHIPPED
            @PageableDefault(size = 10, sort = "orderDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        AppUser user = this.getAppUserFromPrincipal(principal);
        return ResponseEntity.ok(orderService.getOrderPageFromUser(user, status, pageable));
    }
    @GetMapping("/history/{orderId}")
    public ResponseEntity<Order> getOrderFromUserAndId(Principal principal, @PathVariable Long orderId){
        AppUser user=this.getAppUserFromPrincipal(principal);
        return ResponseEntity.ok(orderService.getOrderByIdAndUser(user,orderId));
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(Principal principal, @Valid @RequestBody OrderRequest request){
        AppUser user=this.getAppUserFromPrincipal(principal);
        Order order=orderService.createOrder(user,request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
}
