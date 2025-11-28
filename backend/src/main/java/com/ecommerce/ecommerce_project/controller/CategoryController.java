package com.ecommerce.ecommerce_project.controller;


import com.ecommerce.ecommerce_project.dto.response.CategoryNodeDTO;
import com.ecommerce.ecommerce_project.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryNodeDTO>> getAllCategoryWithPath(){
        return ResponseEntity.ok(categoryService.getCategoryWithPath());
    }

}
