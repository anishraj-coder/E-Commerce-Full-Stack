import { useMutation, useQuery} from "@tanstack/react-query";
import type {CreateOrderRequest, Order, } from "@/types/order.ts";
import {api} from "@/lib/api.ts";
import {toast} from 'sonner';
import {useAuthStore} from "@/store/authStore.ts";
import {type OrderHistoryFilters} from "@/types/order.ts";


export const useCreateOrder=()=>{
    return useMutation({
        mutationFn:async (orderRequest:CreateOrderRequest)=>{
            const response =await api.post<Order>("/orders/place",orderRequest);
            return response.data;
        },
        onError:(error:any)=>{
            console.error("Order Creation Failed", error);
            toast.error("Failed to create order", {
                description: error?.response?.data?.message || "Inventory might be empty"
            });
        }
    })
}

export const useGetOrderHistory=(filters:OrderHistoryFilters)=>{
    const token=useAuthStore.getState().token;
    return useQuery({
        queryKey:['orderHistory',filters],
        queryFn: async ()=>{
            const params:{size?:number,sort?:'asc'|'desc',page:number,status?:string}={
                size: filters.size||5,
                sort:filters.sort||'desc',
                page:filters.page||0,
            };
            if(filters.status &&filters.status.length>0){
                console.log(filters.status);
                params.status=filters.status.join(",");
            }
            const response=await api.get('/orders/history',{params});
            return response.data;
        },
        enabled:!!token,
    });
};

export const useGetOrderById=(orderId:number)=>{
    const token=useAuthStore.getState().token;
    return useQuery({
        queryKey:['orderHistory',orderId],
        queryFn:async()=>{
            const response =await api.get<Order>(`/orders/history/${orderId}`);
            return response.data;
        },
        staleTime: 5*1000*60,
        gcTime: 5*1000*60,
        enabled: !!token,
    });
};