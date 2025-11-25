import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderById } from "@/hooks/useOrders";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft, Package, Truck, CheckCircle,  } from "lucide-react";
import OrderHistoryCard from "@/customer/components/OrderHistory/OrderHIstoryCard";
import {useEffect} from "react"; // Reuse card

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, isError } = useGetOrderById(Number(orderId));
    useEffect(() => {
        if(!orderId)navigate('/account/orders')
    }, [orderId,navigate]);


    if (isLoading) return <div className="h-[80vh] flex items-center justify-center"><Spinner className={`h-12 w-12`} /></div>;
    if (isError || !order) return <div className="text-center py-20 text-red-500">Order not found.</div>;

    const getStepStatus = (stepStatus: string) => {
        const steps = ["PENDING", "PLACED", "CONFIRMED", "SHIPPED","OUT_FOR_DELIVERY", "DELIVERED"];
        const currentIndex = steps.indexOf(order.status);
        const stepIndex = steps.indexOf(stepStatus);

        if (currentIndex >= stepIndex) return "text-primary border-primary";
        return "text-gray-300 border-gray-300";
    };
    const totalPurchasePrice=order.orderItems.reduce((acc,item)=>acc+item.originalPurchasePrice,0);
    const totalDiscount=order.totalPrice-totalPurchasePrice;


    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate("/account/orders")}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
                    <p className="text-sm text-gray-500">
                        Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                </div>
                <Badge className="ml-auto" variant={order.status === 'DELIVERED' ? 'default' : 'secondary'}>
                    {order.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

                <div className="space-y-8">

                    <div className="border rounded-xl p-6 bg-white shadow-sm">
                        <h2 className="font-semibold mb-6">Order Status</h2>
                        <div className="flex justify-between relative">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />

                            {[
                                { label: "Placed", icon: Package, val: "PLACED" },
                                { label: "Shipped", icon: Truck, val: "SHIPPED" },
                                { label:"Out For Delivery", icon: Truck, val: "OUT_FOR_DELIVERY" },
                                { label: "Delivered", icon: CheckCircle, val: "DELIVERED" }
                            ].map((step) => (
                                <div key={step.val} className="flex flex-col items-center bg-white px-2">
                                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 bg-white ${getStepStatus(step.val)}`}>
                                        <step.icon size={18} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-semibold text-lg">Items</h2>
                        {order.orderItems.map((item) => (
                            <OrderHistoryCard key={item.id} order={order} item={item} />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">

                    <div className="border rounded-xl p-6 bg-white shadow-sm">
                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-gray-500" />
                            Shipping Details
                        </h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-medium text-gray-900">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                            </p>
                            <p>{order.shippingAddress.streetAddress}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                            <p>{order.shippingAddress.zip}</p>
                            <p className="mt-2">Phone: {order.shippingAddress.phoneNo}</p>
                        </div>
                    </div>

                    <div className="border rounded-xl p-6 bg-white shadow-sm">
                        <h2 className="font-semibold mb-4">Payment Summary</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>Rs. {totalPurchasePrice}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span> Rs. {totalDiscount}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Delivery</span>
                                <span>Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg text-gray-900">
                                <span>Total Paid</span>
                                <span>Rs. {order.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;