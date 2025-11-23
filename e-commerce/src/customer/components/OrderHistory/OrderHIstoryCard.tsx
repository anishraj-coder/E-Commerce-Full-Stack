import {mens_kurta, type ProductInterface} from "@/data/menKurta.ts";
import AdjustIcon from '@mui/icons-material/Adjust';
import {useNavigate} from "react-router-dom";

const OrderHistoryCard=({product=mens_kurta[0]}:{product:ProductInterface})=>{
    const navigate=useNavigate();
    const onClick=()=>{
        navigate('/account/orders/11');
        window.scrollTo(0,0);
    }
    return(
        <div onClick={onClick} className={`flex justify-center rounded-3xl ring-2 ring-gray-200 px-10 mr-10 py-3 cursor-pointer`}>
            <div className={`grid grid-cols-1 lg:grid-cols-3 justify-between px-2 py-4  rounded-lg w-fit`}>
                <div className={`grid-cols-2 grid w-fit gap-x-2 `}>
                    <img src={product.imageUrl} alt={product.title}
                         className={`h-32 w-32 rounded-lg ring-2 ring-gray-400 object-center object-contain`}
                    />
                    <div className={`flex flex-col gap-y-1`}>
                        <h3 className={`h-fit font-medium tracking-tight leading-tight`}>{product.title}</h3>
                        <h3 className={`text-md font-medium text-gray-500`}>Size: {product.size[0].name}</h3>
                    </div>
                </div>
                <h2 className={`py-3 text-xl font-semibold text-center text-green-500`}>Price: Rs. {product.discountedPrice}</h2>
                <div className="flex flex-col gap-y-1 leading-tight">
                    <h4 className="text-lg font-semibold flex gap-1 items-center h-fit">
                        <AdjustIcon sx={{color:'#7bf1a8'}}/>
                        Expected Delivery
                    </h4>

                    <h5>March 3 2025 by 6pm</h5>

                    <h5 className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-300 shadow-2xl shadow-green-300"></span>
                        Item has been Delivered
                    </h5>
                </div>

            </div>
        </div>
    );
};
export default OrderHistoryCard;