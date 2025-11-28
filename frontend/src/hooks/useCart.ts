import {useAuthStore} from "@/store/authStore.ts";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "@/lib/api.ts";
import type {AddToCartRequest, Cart} from "@/types/cart.ts";
import {toast} from "sonner"

export  const useGetCart=()=>{
    const token=useAuthStore.getState().token;
    return useQuery({
        queryKey:['cart'],
        queryFn: async()=>{
            const response=await api.get<Cart>('/cart');
            return response.data;
        },
        staleTime:5*60*1000,
        gcTime: 5*60*1000,
        enabled: !!token,
        refetchOnMount: true,
        retry: 2,
    });
};

export const useAddItemToCart=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: async(cartRequest:AddToCartRequest)=>{
            const response =await api.post<Cart>('/cart/add',cartRequest);
            return response.data;
        },
        onSuccess: async (data)=>{
            const totalItems=data.cartItems.reduce((sum,item)=>sum+item.quantity,0);
            toast.success("Item added to cart",{
                description: `Total Items in cart : ${totalItems}`
            })
            queryClient.setQueryData(['cart'], data);
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to add item", {
                description: error?.message || "Please login first"
            });
        },
    });
};

export const useUpdateCartItem=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: async({cartItemId,quantity}:{cartItemId:number,quantity:number})=>{
            const response=await api.patch<Cart>(`/cart/item/${cartItemId}`,{quantity});
            return response.data;
        },
        onSuccess: async (data)=>{
            toast.success("Items added to cart");
            queryClient.setQueryData(['cart'],data);
        },
        onError:(error)=>{
            console.log(error);
            toast.error("Failed to update the cart items",{
                description: error?.message||"Please login first",
            });
        }
    });
};

export const useDeleteCartItem=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async(cartItemId:number)=>{
            const response =await api.delete<Cart>(`/cart/item/${cartItemId}`);
            return response.data;
        },
        onSuccess:(data)=>{
            toast.success("Item has been removed from cart");
            queryClient.setQueryData(['cart'],data);
        },
        onError:(error)=>{
            toast.error("Failed to delete the item from cart",{
                description:error?.message||"Please login first",
            });
            console.log(error);
        }
    });
};
