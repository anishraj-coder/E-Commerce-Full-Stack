package com.ecommerce.ecommerce_project.service;

import com.ecommerce.ecommerce_project.dto.request.CreateProductRequest;
import com.ecommerce.ecommerce_project.dto.request.UpdateProductRequest;
import com.ecommerce.ecommerce_project.entity.Category;
import com.ecommerce.ecommerce_project.entity.Product;
import com.ecommerce.ecommerce_project.entity.Size;
import com.ecommerce.ecommerce_project.repository.CategoryRepository;
import com.ecommerce.ecommerce_project.repository.ProductRepository;
import com.ecommerce.ecommerce_project.repository.ProductSpecifications;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;

    public Product findProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(()->{
                    log.error("Cant find product with id {}",id);
                    return new IllegalArgumentException("Cant find product with id: "+id);
                });
    }

    public Product createProduct(CreateProductRequest request){
        Product product=productRepository.findByTitle(request.getTitle())
                .orElse(null);
        if(product!=null){
            log.error("Product already exists for title {}",request.getTitle());
            throw new DataIntegrityViolationException("product with title already exists "+request.getTitle());
        }
        Category category=categoryService.findOrCreateCategoryByPath(request.getCategoryPath());
        product=Product.builder()
                .title(request.getTitle())
                .brand(request.getBrand())
                .color(request.getColor())
                .price(request.getPrice())
                .discountPercent(request.getDiscountPercent())
                .size(request.getSize())
                .category(category)
                .imageUrl(request.getImageUrl())
                .quantity(request.getQuantity())
                .build();
        product.setDiscountedPrice(this.discountedPriceCalculation(product));
        return productRepository.save(product);
    }

    public void deleteProductById(Long id){
        Product product=productRepository.findById(id)
                .orElseThrow(()-> {
                    log.error("Product id not found id: {}",id);
                    return new IllegalArgumentException("Cant find the product with product Id: " + id);
                });
        productRepository.deleteById(product.getId());
    }

    public Product updateProduct(UpdateProductRequest productRequest,Long id){
        Product product=productRepository.findById(id)
                .orElseThrow(()->{
                    log.error("Cant find product with the product id {}",id);
                    return new IllegalArgumentException("cant find the product with id "+id);
                });
        if(productRequest.getCategories()!=null&&!productRequest.getCategories().isEmpty()){
            Category category=categoryService.findOrCreateCategoryByPath(productRequest.getCategories());

            product.setCategory(category);
        }


        Optional.ofNullable(productRequest.getTitle()).ifPresent(product::setTitle);
        Optional.ofNullable(productRequest.getBrand()).ifPresent(product::setBrand);
        Optional.ofNullable(productRequest.getColor()).ifPresent(product::setColor);
        Optional.ofNullable(productRequest.getImageUrl()).ifPresent(product::setImageUrl);
        Optional.ofNullable(productRequest.getDescription()).ifPresent(product::setDescription);
        Optional.ofNullable(productRequest.getPrice()).ifPresent(product::setPrice);
        Optional.ofNullable(productRequest.getDiscountPercent()).ifPresent(product::setDiscountPercent);
        Optional.ofNullable(productRequest.getQuantity()).ifPresent(product::setQuantity);
        Optional.ofNullable(productRequest.getSize()).ifPresent(product::setSize);
        Optional.ofNullable(productRequest.getQuantity()).ifPresent(product::setQuantity);
        product.setDiscountedPrice(this.discountedPriceCalculation(product));
        return productRepository.save(product);
    }

    public Page<Product> findProductsWithCategory(Long id, Pageable pageable){
        Category category=categoryRepository.findById(id)
                .orElseThrow(()->{
                    log.error("Can't find a category with id: {}",id);
                    return new IllegalArgumentException("Can't find a category with id: "+id);
                });
        return productRepository.findByCategoryId(id,pageable);
    }

    public Page<Product> getAllProduct(List<String> categoryPath, List<String>colors, List<String>sizes,
                                       Double minPrice,Double maxPrice,Double
                                               minDiscount,Boolean inStock,Pageable pageable){

        Category finalCategory=null;
        if(categoryPath!=null&&!categoryPath.isEmpty()){
            finalCategory=categoryService.findCategoryByPath(categoryPath);
        }

        Long categoryId=(finalCategory!=null)?finalCategory.getId():null;

        Specification filterSpecification= ProductSpecifications.filterBy(categoryId, colors,sizes,
                minPrice,maxPrice,minDiscount,inStock);
        return productRepository.findAll(filterSpecification,pageable);
    }

    private Double discountedPriceCalculation(Product product){
        return product.getPrice()-(product.getPrice()*product.getDiscountPercent())/100.0;
    }
}
