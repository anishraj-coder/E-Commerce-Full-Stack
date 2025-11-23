package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> , JpaSpecificationExecutor<Product> {

    Optional<Product> findByTitle(String title);

    @Query("""
            select p from Product p where p.category.id=:categoryId
            """)
    @EntityGraph(attributePaths= {"reviews","category","size"})
    Page<Product> findByCategoryId(@Param("categoryId") Long id, Pageable pageable);


    @Override
    Page<Product> findAll(Specification specification,Pageable pageable);
}