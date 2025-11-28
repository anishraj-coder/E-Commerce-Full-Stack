import {useNavigate, useParams} from "react-router-dom";
import {useGetProductById} from "@/hooks/useProducts.ts";
import {useEffect} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import ProductDetailsSection from "../components/products/ProductDetailsSection";
import ProductPageReviewsSection from "@/customer/components/products/ProductPageReviewsSection.tsx";

const ProductDetails=()=>{
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const {data:product,isLoading,isError}= useGetProductById(parseInt(productId||'1'));



    useEffect(() => {
        if (!productId) {
            navigate("/products", { replace: true });
        }
    }, [productId, navigate]);

    if (isLoading) {
        return (
            <div className="h-[80vh] w-full flex items-center justify-center">
                <Spinner className={`h-28 w-28`} />
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="h-[50vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
                <p className="text-gray-500 mt-2">The product you are looking for does not exist.</p>
            </div>

        );
    }
    return(<div className={`w-full min-h-screen`}>
        <div className={`w-full px-10 py-4`}>
            Home/{product.category&&product.category.name}/ <span className="text-gray-900 font-medium">{product.title}</span>
        </div>
        <main className="container mx-auto px-4 lg:px-10 pt-6 pb-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">

                <div className="relative w-full lg:sticky lg:top-24">
                    <div className="aspect-square w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-full w-full object-contain object-center transition-transform hover:scale-105 duration-500"
                        />
                    </div>
                </div>

                <div className="mt-10 lg:mt-0 px-0 sm:px-0 lg:px-0">
                    <ProductDetailsSection product={product} />
                </div>
            </div>

            <div className="mt-20">
                <ProductPageReviewsSection />
            </div>
        </main>
    </div>);
};
export default  ProductDetails;