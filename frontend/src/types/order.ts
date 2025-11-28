import { type Address } from "./address";
import { type Product } from "./product";

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    priceAtPurchase: number;
    userId: number;
    selectedSize:string;
    originalPurchasePrice:number;
}

export interface Order {
    id: number;
    orderId: string;
    orderItems: OrderItem[];
    orderDate: string;
    deliveryDate: string;
    shippingAddress: Address;
    totalPrice: number;
    totalDiscountedPrice: number;
    discount: number;
    status: "PENDING" | "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"|"OUT_FOR_DELIVERY";
    totalItem: number;
    createdAt: string;
    razorpayOrderId?: string | null;
    razorpayPaymentId?: string | null;
    razorpaySignature?: string | null;
}

export interface CreateOrderRequest {
    addressId: number;
}

export interface OrderHistoryResponse {
    content: Order[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface OrderHistoryFilters {
    status?:OrderStatus[];
    page?: number;
    size?: number;
    sort?: 'asc'|'desc';
}
export type OrderStatus="PENDING"|"PLACED"|"SHIPPED"|"DELIVERED"|"CANCELLED";