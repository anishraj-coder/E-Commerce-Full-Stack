import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    CarouselItem,
} from "@/components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay"
import {useEffect, useRef, useState} from "react";
export interface EcommerceCarouselType{
    id:number;
    image:string
    title:string;
    description:string;
}

const EcommerceCarousel=()=>{
    const [api,setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const plugin=useRef(
        Autoplay({
            delay:3000,
            stopOnMouseEnter:true,
            stopOnInteraction:true
        })
    )
    useEffect(()=>{
        if(!api)return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap()+1);
        api.on("select",()=>{
            setCurrent(api.selectedScrollSnap()+1);
        })
    },[api]);
    const slides = [
        {
            id: 1,
            image: "/Images/Carousel/carousel1.jpg",
            title: " ",
            description: " "
        },
        {
            id: 2,
            image: "/Images/Carousel/carousel2.jpg",
            title: "",
            description: " "
        },
        {
            id: 3,
            image: "/Images/Carousel/carousel3.png",
            title: " ",
            description: " "
        }
    ]
    return(
        <div className={`w-full relative`}>
            <Carousel className={`w-full`}
                      plugins={[plugin.current]}
                      setApi={setApi}
                      opts={{loop:true}}
            >
                <CarouselContent>
                    {slides.map((item)=>(
                        <CarouselItem key={item.id}>
                            <div  className={`relative w-full h-[400px]`}>
                                <img className={`object-cover object-top w-full h-full`} src={item.image} alt={item.title}/>
                                <div className={`absolute z-10 bottom-10 text-white/60 scale-150  left-25 flex flex-col  items-baseline p-5`}>
                                    <h1 className={`text-3xl font-bold mb-2`}>{item.title}</h1>
                                    <p className={`text-xl font-medium `}>{item.description}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/30 text-white border-0" />
                <CarouselNext className="right-4 bg-white/20 hover:bg-white/30 text-white border-0" />
            </Carousel>
            <div className={`absolute bg-black/10 px-4 py-2 rounded-full   justify-center left-1/2 bottom-0 -translate-x-1/2 flex gap-2 mb-2`}>
                {Array.from({length:count}).map((_,idx)=>(
                    <button key={idx} onClick={()=>api?.scrollTo(idx)}
                            className={`w-2 h-2 transition-all duration-100 rounded-full`}
                            style={{background:idx===current-1?"white":"rgba(255,255,255,0.5)"}}
                    />
                ))}
            </div>
        </div>
    )
};
export default EcommerceCarousel;