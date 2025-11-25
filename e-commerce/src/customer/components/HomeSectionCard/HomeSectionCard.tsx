import { useNavigate } from "react-router-dom";
import { type Product } from "@/types/product"; // Using Real Type
import { Badge } from "@/components/ui/badge";

interface HomeSectionCardProps {
    product: Product;
}

const HomeSectionCard = ({ product }: HomeSectionCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => {
                navigate(`/product/${product.id}`);
                window.scrollTo(0, 0);
            }}
            className="cursor-pointer flex flex-col w-full group gap-3"
        >
            {/* Image Container with Zoom Effect */}
            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 relative">
                <img
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    src={product.imageUrl}
                    alt={product.title}
                />
                {/* Optional: New Arrival or Discount Badge */}
                {product.discountPercent > 0 && (
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 shadow-sm">
                        -{product.discountPercent}%
                    </Badge>
                )}
            </div>

            {/* Minimalist Details */}
            <div className="flex flex-col gap-1 px-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {product.brand}
                </h3>
                <h2 className="text-sm font-medium text-gray-900 line-clamp-1" title={product.title}>
                    {product.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-gray-900">
                        Rs. {product.discountedPrice}
                    </span>
                    {product.price > product.discountedPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            Rs. {product.price}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeSectionCard;