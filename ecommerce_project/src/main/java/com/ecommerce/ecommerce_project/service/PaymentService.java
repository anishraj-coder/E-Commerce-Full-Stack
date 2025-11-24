package com.ecommerce.ecommerce_project.service;


import com.ecommerce.ecommerce_project.dto.request.PaymentCallbackRequest;
import com.ecommerce.ecommerce_project.dto.response.PaymentInitResponse;
import com.ecommerce.ecommerce_project.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.ecommerce.ecommerce_project.entity.Order;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderRepository orderRepository;

    @Value("${razorpay.api.key}")
    private  String keyId;

    @Value("${razorpay.api.secret}")
    private String keySecret;

    private RazorpayClient razorpayClient;

    @PostConstruct
    public void init() throws RazorpayException{
        this.razorpayClient=new RazorpayClient(keyId,keySecret);
    }

    @Transactional
    public PaymentInitResponse createRazorPayOrder(Long orderId){
        Order order=orderRepository.findById(orderId)
                .orElseThrow(()-> {
                    log.error("Cannot find a order with id: {}",orderId);
                    return  new IllegalArgumentException("Order Id does not exists id: "+orderId);
                });
        try{
            JSONObject orderRequest=new JSONObject();

            orderRequest.put("amount",(int)(order.getTotalPrice()*100));
            orderRequest.put("currency","INR");
            orderRequest.put("receipt", "order_" + orderId);

            com.razorpay.Order razorPayOrder=razorpayClient.orders.create(orderRequest);
            String razorOrderId=razorPayOrder.get("id");

            order.setRazorpayOrderId(razorOrderId);
            orderRepository.save(order);
            return new PaymentInitResponse(razorOrderId,orderId,order.getTotalPrice(),"INR",
                    order.getUser().getEmail());
        }catch (Exception e){
            log.error("Error creating Razorpay order", e);
            throw new RuntimeException("Error creating payment link");
        }
    }

    @Transactional
    public Order verifyPayment(PaymentCallbackRequest request){
        try{
            String payload=request.getOrderId() +"|"+request.getRazorpayPaymentId();
            boolean isValid= Utils.verifyPaymentSignature(
                    new JSONObject()
                            .put("razorpay_order_id", request.getRazorpayOrderId())
                            .put("razorpay_payment_id", request.getRazorpayPaymentId())
                            .put("razorpay_signature", request.getRazorpaySignature()),
                    keySecret
            );
            if(isValid){
                Order order=orderRepository.findById(request.getOrderId())
                        .orElseThrow(()->{
                            log.error("Order ID does not exist on database ID: {}",request.getOrderId());
                            return new IllegalArgumentException("Order ID does not exist on database ID: "
                                    +request.getOrderId());
                        });
                order.setRazorpayOrderId(request.getRazorpayOrderId());
                order.setRazorpayPaymentId(request.getRazorpayPaymentId());
                order.setRazorpaySignature(request.getRazorpaySignature());
                return orderRepository.save(order);

            }else{
                throw new IllegalStateException("Payment verification failed: Signature mismatch");
            }
        }catch (RazorpayException e){
            log.error("Cannot verify the payment {}, message: {}",
                    request.getRazorpayPaymentId(),e.getMessage());
            throw new RuntimeException("Payment verification failed");
        }
    }
}
