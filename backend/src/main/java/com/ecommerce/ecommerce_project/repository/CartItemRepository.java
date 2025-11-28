package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.Cart;
import com.ecommerce.ecommerce_project.entity.CartItem;
import com.ecommerce.ecommerce_project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    void deleteAllByCart(Cart cart);

    List<CartItem> findAllByCart(Cart cart);

    Optional<CartItem> findByCartAndProductAndSelectedSize(Cart cart, Product product,String size);
}