package com.ecommerce.ecommerce_project.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_item")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_product",nullable = false)
    @ToString.Exclude
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_item_order")
    private Order order;

    private Integer quantity;

    private String productTitle;

    private String selectedSize;

    private Double priceAtPurchase;

}
