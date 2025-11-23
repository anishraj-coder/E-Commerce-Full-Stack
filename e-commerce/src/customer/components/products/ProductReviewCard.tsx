import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from '@/customer/components/ui/Star-rating'

const ProductReviewCard = () => {
    return (
        <div className="flex gap-4 border-b border-gray-100 pb-6 last:border-0">
            <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">R</AvatarFallback>
            </Avatar>

            <div className="grid gap-2 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h4 className="font-semibold text-sm">Ram Sham</h4>
                    <span className="hidden sm:block text-gray-300">•</span>
                    <p className="text-xs text-gray-500">April 14, 2024</p>
                </div>

                <StarRating rating={2.5} size={14} />

                <p className="text-sm text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
        </div>
    );
};

export default ProductReviewCard;