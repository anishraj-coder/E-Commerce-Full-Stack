import type {Product, ProductFilters, ProductResponse} from "@/types/product.ts";
import {api} from "@/lib/api.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

export const fetchProducts=async(filters:ProductFilters)=>{
    const response= await api.get<ProductResponse>('/products',{
        params:filters
    });
    return response.data;
}

export const useGetAllProducts=(filters:ProductFilters)=>{
    return useQuery<ProductResponse>({
        queryKey:['products',filters],
        queryFn:()=>fetchProducts(filters),
        staleTime: 10*10*1000,
        gcTime: 5*1000*60,
        placeholderData: keepPreviousData
    });
};

export const useGetProductById=(productId:number)=>{
    return useQuery({
        queryKey:['product',productId],
        queryFn: async()=>{
          const response=await api.get<Product>(`/products/${productId}`);
          return response.data;
        },
        enabled:!!productId,
        staleTime: 10*60*1000,
        gcTime: 5*60*1000,
        placeholderData:keepPreviousData,
        retry:2
    });
}