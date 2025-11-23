import OrderHistoryFilter from "@/customer/components/OrderHistory/OrderHistoryFilter.tsx";
import {mens_kurta} from "@/data/menKurta.ts";
import OrderHistoryCard from "@/customer/components/OrderHistory/OrderHIstoryCard.tsx";


const OrderHistory=()=>{
    return (
        <div className={`w-full px-10 lg:py-5 md;py-10  min-h-fit  grid grid-cols-1 lg:grid-cols-[25%_75%] gap-6`}>
            <OrderHistoryFilter/>
            <div className={`flex flex-col w-full gap-y-2 mb-10`}>
                {mens_kurta.slice(0,5).map(item=>(
                    <OrderHistoryCard product={item}/>
                ))}
            </div>
        </div>
    );
};
export default  OrderHistory;