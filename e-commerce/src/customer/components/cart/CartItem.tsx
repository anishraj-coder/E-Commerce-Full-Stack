import {X} from 'lucide-react';
import type {CartItemType} from "@/types/cart.ts";
import {Badge} from '@/components/ui/badge'
import QuantityControl from "./QuantityControl";
import {Button} from  '@/components/ui/button';
import {useDeleteCartItem} from "@/hooks/useCart.ts";


interface CartItemProps{
    item:CartItemType;
}

const CartItem=({item}:CartItemProps)=>{
    const {isPending,mutate:remove}=useDeleteCartItem();
    const productPrice=item.product.price;
    const discountedPrice=item.product.discountedPrice;
    const discount=productPrice-discountedPrice;
    const discountPercent=Math.round(discount*100/productPrice);
    return (
        <div className="p-4 border rounded-xl shadow-sm bg-white flex flex-col sm:flex-row gap-4 relative hover:shadow-md transition-shadow">

            <div className="w-full sm:w-[120px] aspect-[3/4] shrink-0 overflow-hidden rounded-md border border-gray-100">
                <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-top"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between gap-3">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-base text-gray-900 line-clamp-1 pr-6">
                            {item.product.title}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{item.product.brand}</p>

                    <div className="flex items-center gap-2 mt-2 text-sm">
                        <Badge variant="secondary" className="rounded-md px-2 font-normal">
                            Size: {item.selectedSize}
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">
                            Rs. {item.linearPrice}
                        </span>
                        <span className={`text-sm font-light text-muted-foreground line-through`}>{productPrice}</span>
                        <Badge variant={`secondary`} className={`text-green-500`}>{discountPercent}% OFF</Badge>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Reuse your Logic Component */}
                        <QuantityControl
                            cartItemId={item.id}
                            initialQuantity={item.quantity}
                        />

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(item.id)}
                            disabled={isPending}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>

            <button
                onClick={() => remove(item.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors sm:block hidden"
            >
                <X size={18} />
            </button>
        </div>
    );
};
export default CartItem;