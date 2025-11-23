package com.ecommerce.ecommerce_project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parent_category_id")
    @JsonBackReference
    private Category parentCategory;

    @OneToMany(mappedBy = "parentCategory",cascade = CascadeType.ALL)
    @JsonManagedReference
    @Builder.Default
    private List<Category> subCategories=new ArrayList<>();

    @Builder.Default
    private Integer level=0;

    @JsonIgnore
    public void addSubCategory(Category category){
        category.setLevel(this.getLevel()+1);
        category.setParentCategory(this);
        subCategories.add(category);
    }

    @JsonIgnore
    public String getFullPath(){
        if(parentCategory==null)return this.name;
        return parentCategory.getFullPath()+">"+name;
    }
}
