import {useAuthStore} from "@/store/authStore.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "@/lib/api.ts";
import {toast} from 'sonner';
import type {Address, CreateAddressRequest} from "@/types/address.ts";

export const useGetAllAddress=()=>{
    const token=useAuthStore.getState().token;
    return useQuery({
        queryKey:['addresses'],
        queryFn:async()=>{
            const response=await api.get<Address[]>('/address');
            return response.data;
        },
        staleTime:5*60*1000,
        gcTime:5*10*1000,
        enabled:!!token,
    });
};

export const useCreateAddress=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: async(newAddress:CreateAddressRequest)=>{
            const response=await api.post<Address>('/address',newAddress);
            return response.data;
        },
        onSuccess:()=>{
            toast.success("Address has been created successfully!!!");
            queryClient.invalidateQueries({queryKey:['addresses']});
        },
        onError:(error:any)=>{
            toast.error("Failed to save address", {
                description: error.response?.data?.error || "Please check your input."
            });
        },

    })
}

export const useDeleteAddress=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: async (addressId:number)=>{
            const response=await api.delete(`/address/${addressId}`);
            return response.data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['addresses']});
            toast.success("Address has been deleted!!!!!!");
        },
        onError:(error:any)=>{
            toast.error("Failed to delete address",{
                description: error?.resposne?.data?.error||"Something went wrong",
            });
        }
    })
}