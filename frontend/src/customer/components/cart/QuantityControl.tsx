import {useEffect, useRef, useState} from "react";
import {useDeleteCartItem, useUpdateCartItem} from "@/hooks/useCart.ts";
import {Loader2,Minus,Plus,Trash2} from "lucide-react";
import {Button} from '@/components/ui/button';

const QuantityControl=({cartItemId,initialQuantity}:{cartItemId:number,initialQuantity:number})=>{
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const firstRender = useRef(true);
    const {mutate:removeItem,isPending:isRemoving}= useDeleteCartItem();
    const {mutate:updateQuantity,}=useUpdateCartItem();

    useEffect(()=>{
        if(firstRender.current){
            firstRender.current=false;
            return;
        }

        if(quantity===0){
            removeItem(cartItemId);
            return;
        }

        const handler=setTimeout(()=>{
            updateQuantity({cartItemId, quantity});
        },500);
        return ()=>clearTimeout(handler);

    },[quantity,cartItemId,removeItem,updateQuantity]);
    const increase=()=>setQuantity(prev=>prev+1);
    const decrease=()=>setQuantity(prev=>Math.max(prev-1,0));

    if(isRemoving){
        return <Loader2 className="animate-spin text-red-500" />;
    }
    return (
        <div className={`p-1 bg-gray-300 rounded-lg items-center justify-between flex gap-2`}>
            <Button variant={'ghost'} size={'icon'}  onClick={decrease}
                    className={`h-8 w-8 rounded-md bg-white shadow-sm hover:bg-gray-50`} >
                {quantity === 1 ? <Trash2 size={14} className="text-red-500" /> : <Minus size={14} />}
            </Button>
            <span className="text-sm  h-full flex items-center font-semibold w-8 justify-center text-center tabular-nums">
                {quantity}
            </span>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md bg-white shadow-sm hover:bg-gray-50"
                onClick={increase}
            >
                <Plus size={14} />
            </Button>
        </div>
    );
};
export  default QuantityControl;