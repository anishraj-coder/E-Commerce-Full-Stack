import { type Product } from "./product";
import type {UserInfo} from "@/store/useUserStore.ts";

export interface CartItemType {
    id: number;
    product: Product;
    quantity: number;
    selectedSize: string | null;
    linearPrice: number;
}

export interface Cart {
    id: number;
    user?: UserInfo;
    cartItems: CartItemType[];
    totalPrice: number;
    totalItem?: number;
    totalDiscountedPrice?: number;
    discount?: number;
}

export interface AddToCartRequest {
    productId: number;
    quantity: number;
    size: string;
}