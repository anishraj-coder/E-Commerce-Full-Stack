export interface PaymentInitResponse {
    razorpayOrderId: string;
    orderId: number;
    amount: number;
    currency: string;
    userEmail: string;
    userContact?: string;
}

export interface PaymentVerifyRequest {
    orderId: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}