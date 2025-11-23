import type {Product} from "@/types/product.ts";
import {Card,CardContent,CardFooter} from "@/components/ui/card"
import {useNavigate} from "react-router-dom";
import {Badge} from "@/components/ui/badge"

interface ProductCardProps{
    product: Product;
}

const ProductCard=({product}:ProductCardProps)=>{
    const navigate=useNavigate();
    return(
        <Card
            className={`w-[15rem]  m-3  relative cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden hover:-translate-y-1 group border-gray-200`}
            onClick={()=> {
                navigate(`/product/${product.id}`)
                window.scrollTo({top:0, behavior:'smooth'})
            }}
        >
            <CardContent className={`p-0 relative h-[12rem] px-2`}>
                <img className="h-full w-full object-center object-contain ring-1 ring-gray-400 rounded-lg" src={product.imageUrl} alt={product.brand}/>
                {product.discountPercent>0&&(
                    <Badge className={`absolute top-2 right-2 font-bold bg-green-300 hover:bg-green-400`}>
                        {product.discountPercent} %
                    </Badge>
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-start px-3 gap-1 bg-white">
                <h3 className="text-lg font-medium text-gray-900 truncate w-full">
                    {product.brand}
                </h3>
                <p className="text-sm text-gray-500 truncate w-full">
                    {product.title}
                </p>

                <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-gray-900">
                        Rs. {product.discountedPrice}
                    </span>
                    {product.price > product.discountedPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            Rs. {product.price}
                        </span>
                    )}
                </div>
            </CardFooter>

        </Card>
    );
};
export default ProductCard;