package com.ecommerce.ecommerce_project.controller;

import com.ecommerce.ecommerce_project.dto.request.CreateProductRequest;
import com.ecommerce.ecommerce_project.dto.request.UpdateProductRequest;
import com.ecommerce.ecommerce_project.entity.Product;
import com.ecommerce.ecommerce_project.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> findAllWithFiler(
            @RequestParam(value = "category",required = false) List<String> categoryPath,
            @RequestParam(value = "colors",required = false) List<String> colors,
            @RequestParam(value = "sizes",required = false) List<String> sizes,
            @RequestParam(value = "minPrice",required = false)Double minPrice,
            @RequestParam(value = "maxPrice",required = false)Double maxPrice,
            @RequestParam(value = "minDiscount",required = false)Double minDiscount,
            @RequestParam(value = "inStock",required = false) Boolean inStock,
            Pageable pageable
    ){
        return ResponseEntity.ok(productService.getAllProduct(categoryPath,colors,sizes,minPrice,maxPrice,
                minDiscount,inStock,pageable));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody CreateProductRequest createProductRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(createProductRequest));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id,
                                                 @Valid @RequestBody UpdateProductRequest updateProductRequest){
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(productService.updateProduct(updateProductRequest,id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable(value = "id",required = true)Long id){
        return ResponseEntity.ok(productService.findProductById(id));
    }
}
