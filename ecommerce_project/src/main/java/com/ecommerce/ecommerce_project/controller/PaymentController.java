package com.ecommerce.ecommerce_project.controller;


import com.ecommerce.ecommerce_project.dto.request.PaymentCallbackRequest;
import com.ecommerce.ecommerce_project.dto.response.PaymentInitResponse;
import com.ecommerce.ecommerce_project.entity.Order;
import com.ecommerce.ecommerce_project.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/init/{orderId}")
    public ResponseEntity<PaymentInitResponse> paymentInit(@PathVariable Long orderId){
        return ResponseEntity.ok(paymentService.createRazorPayOrder(orderId));
    }

    @PostMapping("/verify")
    public ResponseEntity<Order> verifyPayment(@Valid @RequestBody PaymentCallbackRequest request){
        return ResponseEntity.ok(paymentService.verifyPayment(request));
    }
}
