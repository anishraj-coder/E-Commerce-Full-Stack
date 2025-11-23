package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}