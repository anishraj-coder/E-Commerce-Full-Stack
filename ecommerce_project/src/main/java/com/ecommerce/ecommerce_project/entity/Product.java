package com.ecommerce.ecommerce_project.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "product", indexes = {
        @Index(name = "idx_product_brand", columnList = "brand"),
        @Index(name = "idx_product_title", columnList = "title"),

})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Double discountedPrice;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double discountPercent;

    @ElementCollection
    @CollectionTable(name = "product_size", joinColumns = @JoinColumn(name = "product_id"))
    @Builder.Default
    @ToString.Exclude
    private Set<Size> size = new HashSet<>();

    @Column(nullable = false)
    private Integer quantity;

    @Column(length = 5000)
    private String description;

    @JsonManagedReference(value = "product_review")
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @Builder.Default
    @ToString.Exclude
    private List<Review> reviews=new ArrayList<>();


    @ManyToOne()
    @JoinColumn(name = "product_category")
    private Category category;

    @PrePersist
    public void calculateDiscountedPrice(){
        this.discountedPrice=price-(discountPercent*price)/100.0;
        this.discountedPrice=Math.round(this.discountedPrice*100.0)/100.0;
    }


}