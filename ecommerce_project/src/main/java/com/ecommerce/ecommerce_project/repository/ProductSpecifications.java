package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.Product;
import com.ecommerce.ecommerce_project.entity.Size;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecifications {
    public static Specification<Product> filterBy(
            Long categoryId, List<String> colors,List<String> sizes,Double minPrice,Double maxPrice,
            Double minDiscount, Boolean inStock
    ){
        return new Specification<Product>() {
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                List<Predicate>predicates=new ArrayList<>();
                if(categoryId!=null){
                    predicates.add(criteriaBuilder.equal(root.get("category").get("id"),categoryId));
                }
                if(colors!=null&&!colors.isEmpty()){
                    predicates.add(root.get("color").in(colors));
                }
                if(minPrice!=null){
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountedPrice"),minPrice));
                }
                if(maxPrice!=null)
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("discountedPrice"),maxPrice));
                if(minDiscount!=null){
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercent"),minDiscount));
                }
                if(inStock!=null){
                    if(inStock){
                        predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("quantity"),1));
                    }else predicates.add(criteriaBuilder.equal(root.get("quantity"),0));
                }

                if(sizes!=null&&!sizes.isEmpty()){
                    Join<Product,Size> sizeJoin=root.join("size");
                    predicates.add(sizeJoin.get("name").in(sizes));
                    query.distinct(true);
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        };
    }
}
