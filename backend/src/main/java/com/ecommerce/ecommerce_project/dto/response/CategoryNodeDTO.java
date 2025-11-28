package com.ecommerce.ecommerce_project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryNodeDTO {
    String path;
    String name;
    List<CategoryNodeDTO> childNodes;
}
