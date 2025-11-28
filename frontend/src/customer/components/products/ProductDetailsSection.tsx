import {cn} from '@/lib/utils'
import type {Product} from "@/types/product.ts";
import {useEffect, useMemo, useState} from "react";
import StarRating from "@/customer/components/ui/Star-rating.tsx";
import {Badge} from '@/components/ui/badge'
import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";
import {useAddItemToCart, useGetCart} from "@/hooks/useCart.ts";
import QuantityControl from "@/customer/components/cart/QuantityControl.tsx";
import {useAuthStore} from "@/store/authStore.ts";
import {useShallow} from "zustand/react/shallow";
import {toast} from 'sonner';
import {useNavigate, useSearchParams} from "react-router-dom";

interface ProductDetailsProps{
    product:Product;
}


const ProductDetailsSection=({product}:ProductDetailsProps)=>{
    const [searchParams,setSearchParams]=useSearchParams();
    const [selectedSize, setSelectedSize] = useState<string|null>(searchParams.get("size")||null);
    const {token}=useAuthStore(useShallow(state => ({token: state.token})));
    const {data:cart} = useGetCart();
    const navigate=useNavigate();
    const {mutate:addItem,}=useAddItemToCart();
    const existing = useMemo(() => {
        if (!cart?.cartItems || !selectedSize) return null;
        return cart.cartItems.find(
            item => item.product.id === product.id && item.selectedSize === selectedSize
        );
    }, [cart?.cartItems, product.id, selectedSize]);
    useEffect(()=>{
        if(product.size.length==1)setSelectedSize(product.size[0].name);
    },[product]);
    const handleAddToCart=()=>{
        if(!selectedSize)return;
        if(!token){
            toast.error("Login first");
            return;
        }
        addItem({
            productId:product.id,
            size:selectedSize,
            quantity:1
        })
    }
    const handleSizeChange=(size:string,isOutOfStock:boolean)=>{
        if(isOutOfStock)return;
        setSearchParams({size});
        setSelectedSize(selectedSize)
    }
    useEffect(() => {
        const sizeFromUrl = searchParams.get("size");
        if (sizeFromUrl) {
            const available = product.size.some(s => s.name === sizeFromUrl && s.quantity > 0);
            if (available) {
                setSelectedSize(sizeFromUrl);
            }
        } else if (product.size.length === 1) {
            setSelectedSize(product.size[0].name);
            setSearchParams({ size: product.size[0].name });
        }
    }, [product.size, searchParams,setSelectedSize,setSearchParams]);
    return(
        <div className={`w-full flex flex-col  gap-6 px-5 md:pr-10`}>
            <div className={`space-y-2 `}>
                <h2 className={`text-sm font-light text-muted-foreground uppercase`}>{product.brand}</h2>
                <h1 className={`text-2xl font-bold text-gray-900 lg:text-3xl `}>{product.brand}</h1>
            </div>
            <div className="flex items-center gap-1">
                <StarRating rating={4.5} size={18} />
                <span className="text-sm text-gray-500 ml-2">(120 Reviews)</span>
            </div>
            <div className={`flex items-baseline gap-3`}>
                <span className={`text-3xl font-semibold text-gray-900`}>Rs. {product.discountedPrice}</span>
                {product.discountPercent&&(
                    <>
                        <span className={`text-md text-muted-foreground line-through`}>{product.price}</span>
                        <Badge variant={'secondary'} className={`text-green-500 bg-green-300/20`}>{product.discountPercent}% OFF</Badge>
                    </>
                )}
            </div>
            <p className={"text-gray-600 text-sm leading-relaxed"}>
                {product.description||"High Quality"}
            </p>
            {product.size&&(
                <div className={`space-y-4`}>
                    <div className={`flex items-center justify-between `}>
                        <span className={`text-md font-mediumtext-gray-900`}>Select Size:</span>
                        <span className={`text-primary hover:text-primary-hover active:text-primary-active cursor-pointer `}>Size chart</span>
                    </div>
                    <div className={`flex flex-wrap gap-3`}>
                        {product.size.map((item)=>{
                            const isOutOfStock=item.quantity<=0;
                            const isSelected=item.name==selectedSize;
                            return(<div key={item.name} className={cn(
                                "h-10 min-w-10 p-1 flex items-center flex-col justify-center border rounded-md text-sm font-medium transition-all cursor-pointer relative",
                                isSelected
                                    ? "border-primary bg-primary text-white shadow-md"
                                    : "border-gray-200 bg-white text-gray-900 hover:border-primary",
                                isOutOfStock && "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 line-through"
                            )}
                                        onClick={()=>handleSizeChange(item.name,isOutOfStock)}
                            >
                                {item.name}

                            </div>)
                        })}
                    </div>
                </div>
            )}
            <div className={`flex gap-4 mt-4 h-12`}>
                {!selectedSize?(
                    <Button className={`flex-1 h-full opacity-50 text-base `}>Select size</Button>
                ):(
                    !existing?(<Button onClick={handleAddToCart}
                            className={`flex-1 h-full cursor-pointer text-base`}>Add to Cart</Button>)
                        :(<>
                            <QuantityControl key={existing.id} cartItemId={existing.id} initialQuantity={existing.quantity}/>
                            <Button onClick={()=>navigate('/account/cart')}
                                    className={`text-base h-full px-8 mx-10 cursor-pointer`}>Go To Cart</Button>
                        </>)
                )}
                <Share2 className={`h-full`}/>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>100% Original Products</li>
                    <li>Pay on delivery might be available</li>
                    <li>Easy 30 days returns and exchanges</li>
                </ul>
            </div>
        </div>
    );
};
export default  ProductDetailsSection;