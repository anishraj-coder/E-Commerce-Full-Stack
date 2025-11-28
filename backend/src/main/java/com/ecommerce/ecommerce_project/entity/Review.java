package com.ecommerce.ecommerce_project.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "review")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String review;

    @ManyToOne
    @JoinColumn(name = "user_review")
    @JsonIgnore
    private AppUser user;

    @JsonBackReference(value = "product_review")
    @ManyToOne
    @JoinColumn(name ="product_review" )
    private Product product;

    @Column(nullable = false)
    private Integer rating;


    @CreationTimestamp
    private LocalDateTime createdAt;
}
