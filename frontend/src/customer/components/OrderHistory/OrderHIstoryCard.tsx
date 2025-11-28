import { Calendar, Package } from "lucide-react";
import {useNavigate} from "react-router-dom";
import type {Order, OrderItem} from "@/types/order.ts";
import {Badge} from  '@/components/ui/badge'


interface OrderHistoryCardProps{
    order: Order;
    item:OrderItem
}

const OrderHistoryCard=({order,item}:OrderHistoryCardProps)=>{
    const navigate=useNavigate();
    const formattedDate=new Date(order.orderDate).toLocaleDateString("en-US",{
        year:'numeric',month:'long',day:'numeric'
    });
    const getStatusColor = (status: string) => {
        switch(status) {
            case "DELIVERED": return "bg-green-100 text-green-800 hover:bg-green-100";
            case "CANCELLED": return "bg-red-100 text-red-800 hover:bg-red-100";
            case "SHIPPED": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
    };

    return (
        <div
            onClick={() => navigate(`/account/orders/${order.id}`)}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white flex flex-col sm:flex-row gap-6"
        >
            <div className="w-32 h-32 shrink-0 rounded-lg border border-gray-100 overflow-hidden bg-gray-50">
                <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-top"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                            {item.product.title}
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                            Rs. {item.priceAtPurchase}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                    <p className="text-xs text-gray-400 mt-1">Size: {item.selectedSize}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                    <Badge variant="outline" className={`border-0 px-3 py-1 ${getStatusColor(order.status)}`}>
                        {order.status}
                    </Badge>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>Ordered on {formattedDate}</span>
                    </div>

                    {order.status === 'DELIVERED' && (
                        <div className="flex items-center gap-1 text-sm text-green-600 font-medium ml-auto">
                            <Package size={14} />
                            <span>Delivered</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default OrderHistoryCard;