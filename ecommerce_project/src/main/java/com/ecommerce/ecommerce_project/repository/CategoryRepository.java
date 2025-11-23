package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);
    Optional<Category> findByNameAndParentCategory(String name, Category parentCategory);
}