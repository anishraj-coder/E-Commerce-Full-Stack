package com.ecommerce.ecommerce_project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@EqualsAndHashCode
public class Size {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int quantity;
}