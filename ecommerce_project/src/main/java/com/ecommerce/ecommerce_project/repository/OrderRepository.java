package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.Order;
import com.ecommerce.ecommerce_project.entity.Product;
import com.ecommerce.ecommerce_project.entity.types.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByUserOrderByOrderDateDesc(AppUser user, Pageable pageable);

    Optional<Order> findByIdAndUser(Long orderId,AppUser user);

    boolean existsByUserAndOrderItems_ProductAndStatusIn(AppUser user, Product product, List<OrderStatus> statuses);
}