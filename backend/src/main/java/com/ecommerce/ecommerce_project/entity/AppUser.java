package com.ecommerce.ecommerce_project.entity;


import com.ecommerce.ecommerce_project.entity.types.Provider;
import com.ecommerce.ecommerce_project.entity.types.RoleTypes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="app_user",indexes = {

            @Index(name = "idx_email",columnList = "email")
        })
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    @JsonIgnore
    private String password;

    private String firstName;
    private String lastName;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(length = 10)
    @JsonIgnore
    private String phoneNo;


    @ElementCollection(targetClass = RoleTypes.class,fetch = FetchType.LAZY)
    @CollectionTable(name="user_role",joinColumns = @JoinColumn(name="user_id"))
    @Enumerated(EnumType.STRING)
    @Builder.Default
    Set<RoleTypes> roles=Set.of(RoleTypes.CUSTOMER);

    @ToString.Exclude
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @Builder.Default
    List<Address> addresses=new ArrayList<>();


    @ToString.Exclude
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonManagedReference(value = "user_payment")
    @Builder.Default
    List<PaymentInformation> paymentInformation =new ArrayList<>();

    @ToString.Exclude
    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    List<Review> reviews=new ArrayList<>();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Provider provider;
    private String providerId;

    @OneToOne(mappedBy = "user")
    private Cart cart;

    @JsonIgnore
    private String imageUrl;

    @Builder.Default
    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<Order> orders=new ArrayList<>();

    public void addOrder(Order order){
        this.orders.add(order);
        order.setUser(this);
    }

    public void addPayment(PaymentInformation paymentInformation){
        this.paymentInformation.add(paymentInformation);
        paymentInformation.setUser(this);
    }
}
