import {useNavigate} from "react-router-dom";

export interface ProductCardProp{

    brand:string;
    description:string;
    price:number;
    image:string;
}

const HomeSectionCard=({brand,description,price,image}:ProductCardProp)=>{
    const navigate=useNavigate();
    const onClick=()=>{
        navigate(`/product/1`);
        window.scrollTo(0,0);
    }

    return(
        <div onClick={onClick} className={`w-[15rem] h-[20 rem] pb-4 overflow-hidden cursor-pointer  select-none flex 
        flex-col items-center gap-2 hover:scale-105 hover:shadow-2xs transition-all duration-200 rounded-lg border-[2px] border-gray-200`}>
            <img className={`w-[13 rem] h-[14.5rem] object-top object-contain mt-[0.5rem]`}
                src={image} alt=""/>
            <h3 className={`font-medium mt-1 text-lg text-gray-900`}>{brand}</h3>
            <h2 className={`text-sm text-gray-600 font-light `}>{description.slice(0,30)}</h2>
            <h2 className={`text-sm font-bold text-gray-700 `}>Rs. {price}</h2>
        </div>
    );
}
export  default HomeSectionCard;