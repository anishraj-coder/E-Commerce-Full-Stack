package com.ecommerce.ecommerce_project.entity;


import com.ecommerce.ecommerce_project.entity.types.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_orders",nullable = false)
    @ToString.Exclude
    @JsonIgnore
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private AppUser user;

    @Builder.Default
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference("order_order_items")
    private Set<OrderItem> orderItems=new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_address",nullable = false)
    @ToString.Exclude
    private Address shippingAddress;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Builder.Default
    private Double totalPrice=0.0;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

}
