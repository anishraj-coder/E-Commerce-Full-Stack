package com.ecommerce.ecommerce_project.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentCallbackRequest {
    @NotNull(message = "razor pay order id can't be  null")
    private String razorpayOrderId;
    @NotNull(message = "razor pay payment id can't be null")
    private String razorpayPaymentId;
    @NotNull(message = "razor pay signature can't be null")
    private String razorpaySignature;
    @NotNull(message = "order id cant be null")
    private Long orderId;
}
