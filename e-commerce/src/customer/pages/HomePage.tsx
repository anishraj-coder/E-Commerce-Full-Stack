import EcommerceCarousel from "@/customer/components/navigation/EcommerceCarousel.tsx";
import HomeSectionCarousel from "@/customer/components/HomeSectionCard/HomeSectionCarousel.tsx";
import {mens_kurta} from "@/data/menKurta.ts";
import {men_jeans} from "@/data/menJeans.ts";
import {men_shirt} from "@/data/menShirt.ts";

const HomePage=()=>{

    return(
        <div className={`w-full min-h-screen`}>
            <EcommerceCarousel/>
            <HomeSectionCarousel title={`Men Kurtas`} products={mens_kurta} autoplay={false}/>
            <HomeSectionCarousel title={`Men Jeans`} products={men_jeans} autoplay={false}/>
            <HomeSectionCarousel title={`Men Shirt`} products={men_shirt} autoplay={false}/>
        </div>
    );
}
export default HomePage;