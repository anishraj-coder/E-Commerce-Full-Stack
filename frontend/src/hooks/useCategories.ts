import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {api} from "@/lib/api.ts";
import type {CategoryNode} from "@/types/category.ts";

export const useGetCategories=()=>{
    return useQuery({
        queryKey:['categories'],
        queryFn:async()=>{
            const response=await api.get<CategoryNode[]>('/categories');
            return response.data;
        },
        gcTime: 30*60*1000,
        staleTime: 60*60*1000,
        placeholderData:keepPreviousData,
    })
}