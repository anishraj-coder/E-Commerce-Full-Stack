import HomeSectionCard from "@/customer/components/HomeSectionCard/HomeSectionCard.tsx";
import {useRef} from "react";
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import type {ProductInterface} from "@/data/menKurta.ts";
import {nanoid} from "nanoid";

export interface HomeSectionCarouselProps{
    title:string;
    products:ProductInterface[];
    autoplay:boolean;
}

const HomeSectionCarousel=({title,products,autoplay=false}:HomeSectionCarouselProps)=>{
    const plugin=useRef(Autoplay({
        delay:5000,
        stopOnInteraction:true,
        stopOnMouseEnter:true,
    }))
    return(<>
            <div className={`w-full `}>
                <h1 className={`font-bold text-5xl pt-4 pl-10 border-t-[2px] border-gray-400/50`}>{title}</h1>
            </div>

            <div className={`w-full  px-4 flex justify-center `}>

                <Carousel
                    opts={{align:"start",loop:false}}
                    plugins={autoplay?[plugin.current]:[]}
                    className={`w-full  `}
                >
                    <CarouselContent className={`-ml-2 py-5 md:-ml-4 flex justify-start items-center `}>
                        {products.map(product=>(
                            <CarouselItem key={nanoid()} className={`pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6`}>
                                <HomeSectionCard  brand={product.brand} description={product.description} price={product.price} image={product.imageUrl}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className={`left-0 bg-white h-1/2 rounded-md flex justify-center items-center `}/>
                    <CarouselNext className={`right-0 bg-white h-1/2 rounded-md flex justify-center items-center `}/>

                </Carousel>
            </div>
        </>
        );
};
export default HomeSectionCarousel;