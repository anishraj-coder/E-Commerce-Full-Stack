import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

// 1. Data Source (Static Marketing Data)
// In a real app, this might come from a CMS like Contentful or Strapi,
// but usually, these are hardcoded or config-based.
const carouselData = [
    {
        image: "https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/0/10_5.jpg",
        path: "/products?category=women_clothing",
        alt: "Women's Fashion"
    },
    {
        image: "https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/2/12_4.jpg",
        path: "/products?category=lehenga_choli",
        alt: "Lehenga Collection"
    },
    {
        image: "https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/9/_/9_8.jpg",
        path: "/products?category=men_kurta",
        alt: "Men's Collection"
    },
    {
        image: "https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/1/11_4.jpg",
        path: "/products?category=saree",
        alt: "Saree Collection"
    }
];

const HomeCarousel = () => {
    const navigate = useNavigate();

    // 2. The Engine: Autoplay Plugin
    // We use useRef because we want this plugin instance to persist
    // across re-renders without causing re-renders itself.
    const plugin = useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: true // Stops if user touches it
        })
    );

    return (
        // 3. Container
        <div className="w-full">
            <Carousel
                // Embla options
                opts={{
                    align: "start",
                    loop: true
                }}
                // Attach the plugin
                plugins={[plugin.current]}
                className="w-full"
                // Accessibility
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {/* 4. The Rendering Loop */}
                    {carouselData.map((item, index) => (
                        <CarouselItem key={index} onClick={() => navigate(item.path)}>
                            <div className="cursor-pointer relative h-[40vh] sm:h-[60vh] lg:h-[80vh] w-full overflow-hidden">
                                <img
                                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                    src={item.image}
                                    alt={item.alt}
                                    // Performance optimization: Priority load the first image
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                {/* Optional: Dark Overlay for text readability if you add text later */}
                                {/* <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" /> */}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Controls: Hidden on mobile to keep it clean */}
                <CarouselPrevious className="hidden lg:flex left-4 h-12 w-12" />
                <CarouselNext className="hidden lg:flex right-4 h-12 w-12" />
            </Carousel>
        </div>
    );
};

export default HomeCarousel;