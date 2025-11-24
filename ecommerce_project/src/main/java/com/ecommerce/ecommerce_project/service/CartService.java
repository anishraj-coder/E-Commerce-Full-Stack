package com.ecommerce.ecommerce_project.service;

import com.ecommerce.ecommerce_project.entity.*;
import com.ecommerce.ecommerce_project.repository.CartItemRepository;
import com.ecommerce.ecommerce_project.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartService {

    private  final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;

    public Cart getOrCreateCart(AppUser user){
        return cartRepository.findByUserId(user.getId())
                .orElseGet(()->{
                    Cart cart= Cart.builder()
                            .cartItems(new HashSet<>())
                            .totalPrice(0.0)
                            .user(user)
                            .build();
                   return cartRepository.save(cart);
                });
    }
    @Transactional
    public void clearCart(Long cartId){
        Cart cart=cartRepository.findById(cartId)
                        .orElseThrow(()->new IllegalArgumentException("Cart id not valid id:  "+cartId));
        cartItemRepository.deleteAllByCart(cart);
        cart.getCartItems().clear();
        cart.setTotalPrice(0.0);
    }

    private Cart calculateTotal(Cart cart){
        Double total=0.0;
        for(CartItem item:cart.getCartItems())total+=item.getLinearPrice();
        cart.setTotalPrice(total);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart addItemToCart(Long productId,Integer quantity,String selectedSize,AppUser user){
        Cart cart=this.getOrCreateCart(user);
        Product product=productService.findProductById(productId);
        Optional<CartItem> existingItemOpt=cartItemRepository
                .findByCartAndProductAndSelectedSize(cart,product,selectedSize);
        if(existingItemOpt.isPresent()){
            CartItem existingItem=existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity()+quantity);
            existingItem.setLinearPrice(product.getDiscountedPrice()*existingItem.getQuantity());
            cartItemRepository.save(existingItem);
        }else{
            CartItem cartItem=CartItem.builder()
                    .product(product)
                    .selectedSize(selectedSize)
                    .cart(cart)
                    .quantity(quantity)
                    .linearPrice(quantity*product.getDiscountedPrice())
                    .build();
            CartItem savedCartItem =cartItemRepository.save(cartItem);
            cart.getCartItems().add(savedCartItem);
        }
        return calculateTotal(cart);
    }

    @Transactional
    public Cart updateItemQuantity(Long cartItemId,Integer quantity,AppUser user){
        Cart cart=this.getOrCreateCart(user);
        CartItem cartItem=cartItemRepository.findById(cartItemId)
                .orElseThrow(()->{
                    log.error("Can't find the cart item with id: {}",cartItemId);
                    return new IllegalArgumentException("Can't find cart item with id: "+cartItemId);
                });
        if(!cartItem.getCart().getId().equals(cart.getId())){
            throw new SecurityException("You cannot update the quantity of this cart");
        }
        if(quantity<=0){
            return this.removeItemFromCart(cart, cartItem);
        }
        cartItem.setQuantity(quantity);
        cartItem.setLinearPrice(quantity*cartItem.getProduct().getDiscountedPrice());
        cartItemRepository.save(cartItem);
        return calculateTotal(cart);
    }

    @Transactional
    private Cart removeItemFromCart(Cart cart,CartItem cartItem){
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        return calculateTotal(cart);
    }

    @Transactional
    public Cart removeItemFromCart(AppUser user,Long cartItemId){
        Cart cart=this.getOrCreateCart(user);
        CartItem cartItem=cartItemRepository.findById(cartItemId)
                .orElseThrow(()->{
                    log.error("cannot find the cart item with id: {}",cartItemId);
                    return new IllegalArgumentException("Cannot find the cart item with id: "+cartItemId);
                });
        if(!cartItem.getCart().getId().equals(cart.getId()))
            throw new SecurityException("Cant update the products of this cart");

        return this.removeItemFromCart(cart,cartItem);
    }
}
