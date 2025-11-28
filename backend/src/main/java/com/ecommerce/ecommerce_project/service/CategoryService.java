package com.ecommerce.ecommerce_project.service;

import com.ecommerce.ecommerce_project.dto.response.CategoryNodeDTO;
import com.ecommerce.ecommerce_project.entity.Category;
import com.ecommerce.ecommerce_project.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public Category findOrCreateCategoryByPath(List<String> path){

        if(path==null||path.isEmpty()){
            throw new IllegalArgumentException("Path of category can't be null or negative");
        }

        Category currentParent=null;
        int level=0;
        for(String categoryName:path){
            Optional<Category> existingCategory=categoryRepository.
                    findByNameAndParentCategory(categoryName,currentParent);
            if(existingCategory.isPresent()){
                currentParent=existingCategory.get();
            }else{
                log.info("Creating a non existing category {} at level {}",categoryName,level);
                Category createdCategory=Category.builder()
                        .name(categoryName)
                        .level(level)
                        .parentCategory(currentParent)
                        .build();
                currentParent=categoryRepository.save(createdCategory);
            }
            level++;
        }

        return currentParent;
    }

    @Transactional
    public Category findCategoryByPath(List<String> categoryPath){
        if(categoryPath==null||categoryPath.isEmpty())return null;
        Category parentCategory=null;
        for(String currName: categoryPath){
            Optional<Category> existingCategory=categoryRepository
                    .findByNameAndParentCategory(currName,parentCategory);
            if(existingCategory.isPresent()){
                parentCategory=existingCategory.get();
            }else{
                log.warn("Category path element '{}' not found, stopping path traversal.", currName);
                return null;
            }
        }
        return parentCategory;
    }
    @Transactional(readOnly = true)
    public List<CategoryNodeDTO> getCategoryWithPath(){

        List<Category> categories=categoryRepository.findByParentCategoryIsNull();

        return categories.stream().map(category -> createCategoryPath(category,null))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryNodeDTO createCategoryPath(Category category,String parentPath){
        String currentPath=(parentPath==null||parentPath.isBlank())?category.getName()
                :parentPath+","+category.getName();

        List<CategoryNodeDTO> childDTOs=category.getSubCategories().stream()
                .map(child->createCategoryPath(child,currentPath)).collect(Collectors.toList());

        return new CategoryNodeDTO(currentPath,category.getName(),childDTOs);
    }
}
