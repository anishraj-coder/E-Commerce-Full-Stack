import {useMutation} from "@tanstack/react-query";
import {api} from "@/lib/api.ts";
import {toast} from 'sonner';
import type {PaymentInitResponse, PaymentVerifyRequest} from "@/types/payment.ts";
import type {Order} from "@/types/order.ts";


export const useInitPayment=()=>{
    return useMutation({
        mutationFn:async(orderId:number)=>{
            const response=await  api.post<PaymentInitResponse>(`/payment/init/${orderId}`);
            return response.data;
        },
        onError:(error:any)=>{
            console.error("Payment Init Failed", error);
            toast.error("Payment System Error", {
                description: "Could not initiate payment gateway."
            });
        }
    });
};
export const useVerifyPayment = () => {
    return useMutation({
        mutationFn: async (data: PaymentVerifyRequest) => {
            const response = await api.post<Order>('/payment/verify', data);
            return response.data;
        },
        onError: (error: any) => {
            console.error("Verification Failed", error);
            // This is the critical error state mentioned in your workflow
            toast.error("Payment Verification Failed", {
                description: "Money deducted but order not placed. Contact Support."
            });
        }
    });
};