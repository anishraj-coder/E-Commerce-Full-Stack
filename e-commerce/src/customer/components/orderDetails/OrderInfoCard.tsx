import {mens_kurta} from "@/data/menKurta.ts";
import StarIcon from '@mui/icons-material/Star';

const OrderInfoCard=({product=mens_kurta[0]})=>{

    return(
        <div className={`w-full grid justify-between rounded-xl ring-2 ring-gray-400 place-items-center grid-cols-1 lg:grid-cols-[40%_20%_40%] gap-y-3 cursor-pointer px-10 py-5 hover:-translate-x-[10px] hover:-translate-y-[10px] hover:shadow-xl hover:shadow-gray-400 transition-all duration-200`}>
            <div className={`flex justify-center  gap-x-3 items-center`}>
                <img src={product.imageUrl} alt={product.title}
                     className={`w-32 h-32 object-contain object-center rounded-lg ring-2 ring-gray-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-400 transition-all duration-200`}
                />
                <span className={`flex flex-col ml-4`}>
                            <h2 className={`text-md font-semibold`}>{product.title}</h2>
                            <h3 className={`text-sm text-gray-500`}>{product.brand}</h3>
                        </span>
            </div>
            <h2 className={`text-lg font-semibold  text-green-600`}>Rs. {product.discountedPrice}</h2>
            <h2 className={`flex gap-x-2 w-full  justify-center`}>
                <StarIcon sx={{width:'20px',color:"#4F39F6"}}/>
                <p className={`text-[#4F39F6]`}>Rate and review</p>
            </h2>
        </div>
    );
};
export default OrderInfoCard;