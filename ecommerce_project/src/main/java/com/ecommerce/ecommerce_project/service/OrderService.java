package com.ecommerce.ecommerce_project.service;

import com.ecommerce.ecommerce_project.dto.request.OrderRequest;
import com.ecommerce.ecommerce_project.entity.*;
import com.ecommerce.ecommerce_project.entity.types.OrderStatus;
import com.ecommerce.ecommerce_project.repository.OrderItemRepository;
import com.ecommerce.ecommerce_project.repository.OrderRepository;
import com.ecommerce.ecommerce_project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final AddressService addressService;
    private final ProductService productService;
    private final OrderItemRepository orderItemRepository;

    @Transactional
    public Order createOrder(AppUser user, OrderRequest request){
        Cart cart=cartService.getOrCreateCart(user);
        if(cart==null||cart.getCartItems().isEmpty()){
            log.warn("Cart is empty");
            throw new IllegalStateException("Cart is empty");
        }

        Address address=addressService.getAddressById(request.getAddressId());

        Order order=Order.builder()
                .orderDate(LocalDateTime.now())
                .user(user)
                .shippingAddress(address)
                .totalPrice(0.0)
                .status(OrderStatus.PENDING)
                .build();
        Order savedOrder=orderRepository.save(order);
        Set<OrderItem> orderItems=new HashSet<>();
        Double totalPrice=0.0;
        for(CartItem cartItem:cart.getCartItems()){
            Product product=cartItem.getProduct();
            if(product.getQuantity()<cartItem.getQuantity()){
                log.error("The product is out of stock Product: {}",product.getTitle());
                throw  new IllegalStateException("The product is out of stock Product: "+product.getTitle());
            }
            product.setQuantity(product.getQuantity()-cartItem.getQuantity());
            productRepository.save(product);
            OrderItem orderItem=OrderItem.builder()
                    .product(product)
                    .priceAtPurchase(product.getDiscountedPrice())
                    .order(savedOrder)
                    .quantity(cartItem.getQuantity())
                    .selectedSize(cartItem.getSelectedSize())
                    .productTitle(product.getTitle())
                    .build();
            OrderItem savedOrderItem=orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
            totalPrice+=savedOrderItem.getPriceAtPurchase()*savedOrderItem.getQuantity();
        }
        savedOrder.setOrderItems(orderItems);
        savedOrder.setTotalPrice(totalPrice);
        savedOrder.setStatus(OrderStatus.PLACED);
        cartService.clearCart(cart.getId());
        log.warn("order successfully placed orderId: {}",savedOrder.getId());
        return orderRepository.save(savedOrder);
    }

    @Transactional(readOnly = true)
    public Page<Order> getOrderPageFromUser(AppUser user, Pageable pageable){
        return orderRepository.findByUserOrderByOrderDateDesc(user,pageable);
    }
    @Transactional(readOnly = true)
    public Order getOrderByIdAndUser(AppUser user,Long id){
        return orderRepository.findByIdAndUser(id,user)
                .orElseThrow(()->{
                    log.error("Cannot find a order with id: {}",id);
                    return new IllegalArgumentException("Cannot find the order referenced to order ID: "+id);
                });
    }

    @Transactional
    public Order cancelOrder(AppUser user,Long orderId){
        Order order=getOrderByIdAndUser(user,orderId);
        if(!order.getUser().getId().equals(user.getId())){
            log.error("Cannot c");
            throw new SecurityException("Cannot cancel order of this account");
        }
        order.setStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public boolean hasPurchased(AppUser user,Product product){
        return orderRepository.existsByUserAndOrderItems_ProductAndStatusIn(user,product, List.of(OrderStatus.DELIVERED));
    }
}
