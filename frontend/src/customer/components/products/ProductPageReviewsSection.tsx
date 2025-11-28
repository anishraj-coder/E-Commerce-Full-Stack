import { Progress } from "@/components/ui/progress";
import ProductReviewCard from "@/customer/components/products/ProductReviewCard";

const ProductPageReviewsSection = () => {
    return (
        <div className="w-full py-10 px-4 lg:px-20 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                <div className="space-y-6">
                    {Array.from({length: 3}).map((_,i) => (
                        <ProductReviewCard key={i} />
                    ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-xl h-fit space-y-6">
                    <h3 className="text-lg font-semibold">Product Ratings</h3>

                    <div className="space-y-3">
                        {[
                            { label: "Excellent", value: 70, color: "bg-green-500" },
                            { label: "Very Good", value: 45, color: "bg-blue-500" },
                            { label: "Good", value: 30, color: "bg-yellow-500" },
                            { label: "Average", value: 15, color: "bg-orange-500" },
                            { label: "Poor", value: 5, color: "bg-red-500" },
                        ].map((rating) => (
                            <div key={rating.label} className="grid grid-cols-[80px_1fr_40px] items-center gap-3 text-sm">
                                <span className="text-gray-600">{rating.label}</span>
                                <Progress value={rating.value} className="h-2" color={rating.color} />
                                <span className="text-gray-400 text-xs text-right">{rating.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPageReviewsSection;