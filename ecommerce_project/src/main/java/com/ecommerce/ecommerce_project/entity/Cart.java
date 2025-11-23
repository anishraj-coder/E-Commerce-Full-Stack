package com.ecommerce.ecommerce_project.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.HashSet;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_cart")
    @JsonIgnore
    private AppUser user;


    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    @JsonManagedReference("cart_cart_item")
    @ToString.Exclude
    private Set<CartItem> cartItems=new HashSet<>();

    @Builder.Default
    private Double totalPrice=0.0;
}
