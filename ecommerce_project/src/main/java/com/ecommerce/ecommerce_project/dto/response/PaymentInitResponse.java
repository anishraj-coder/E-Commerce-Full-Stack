package com.ecommerce.ecommerce_project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentInitResponse {
    private String razorpayOrderId;
    private Long orderId;
    private Double amount;
    private String currency;
    private String userEmail;
}
