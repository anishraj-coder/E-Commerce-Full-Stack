import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGetAllProducts } from "@/hooks/useProducts";
import HomeSectionCard from "./HomeSectionCard";
import { Skeleton } from "@/components/ui/skeleton"; // npx shadcn@latest add skeleton
import { useNavigate } from "react-router-dom";

interface ProductSectionProps {
    sectionName: string;
    filterCategory?: string;
    sort?: string;
}

const ProductSection = ({ sectionName, filterCategory, sort }: ProductSectionProps) => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetAllProducts({
        category: filterCategory,
        sort: sort,
        page: 0,
        size: 10
    });

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    if (isLoading) {
        return (
            <div className="space-y-4 py-8 px-4 lg:px-8">
                <Skeleton className="h-8 w-48" />
                <div className="flex gap-4 overflow-hidden">
                    {[1,2,3,4,5].map((i) => (
                        <Skeleton key={i} className="h-[300px] w-[200px] rounded-xl shrink-0" />
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.content.length === 0) return null;

    return (
        <div className="w-full px-4 lg:px-8 py-8 border-b border-gray-50 last:border-0">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {sectionName}
                </h2>
                <Button
                    variant="ghost"
                    className="gap-2 text-primary hover:text-primary/80 hidden sm:flex"
                    onClick={() => navigate(`/products?category=${filterCategory}`)}
                >
                    View All <ArrowRight size={16} />
                </Button>
            </div>

            {/* Carousel */}
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[plugin.current]}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {data.content.map((product) => (
                        // Responsive: 1 on mobile, 2 on small tabs, 3 on large tabs, 5 on desktop
                        <CarouselItem key={product.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <HomeSectionCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex" />
            </Carousel>
        </div>
    );
};

export default ProductSection;