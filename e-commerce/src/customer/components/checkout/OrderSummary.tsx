import CartDetails from "@/customer/components/cart/CartDetails.tsx";
import type {Address} from "@/types/address.ts";
import {MapPin} from "lucide-react";
import {useCheckOutStore} from "@/store/useCheckOutStore.ts";
import {useShallow} from "zustand/react/shallow";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCreateOrder} from "@/hooks/useOrders.ts";
import {useInitPayment, useVerifyPayment} from "@/hooks/usePayment.ts";
import {toast} from'sonner';
import type {PaymentInitResponse} from "@/types/payment.ts";
import {Loader2}  from "lucide-react";
import {useGetCart} from "@/hooks/useCart.ts";

interface OrderSummaryProps{
    selectedAddress:Address;
    handleNext:()=>void
}

const OrderSummary=({selectedAddress}:OrderSummaryProps)=>{
    const {clearSelectedAddress}=useCheckOutStore(useShallow(state=>({selectedAddress:state.selectedAddress,clearSelectedAddress: state.clearSelectedAddress})))
    const [,setSearchParams]=useSearchParams();
    const {mutate:createOrder,isPending:isCreating}=useCreateOrder();
    const {mutate:initPayment,isPending:isInitializing}=useInitPayment();
    const {mutate:verifyPayment,isPending:isVerifying}= useVerifyPayment();
    const {data:cart}=useGetCart();
    const isPending:boolean=isCreating||isInitializing||isVerifying;
    const handleBack=()=>{
        setSearchParams({step:'1'});
        clearSelectedAddress();
    }

    const handleProcessPayment=()=>{
        if (!cart || cart.cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        createOrder(
            { addressId: selectedAddress.id },
            {
                onSuccess: (orderData) => {
                    initPayment(orderData.id, {
                        onSuccess: (paymentData) => {
                            openRazorpayPopup(paymentData);
                        }
                    });
                }
            }
        );
    };
    const navigate=useNavigate();
    const openRazorpayPopup=(paymentData:PaymentInitResponse)=>{
        const options = {
            key: "rzp_test_RjFVt6R4CVispE",
            currency: paymentData.currency,
            name: "Practice Project",
            description: `Order #${paymentData.orderId}`,
            order_id: paymentData.razorpayOrderId,

            handler: function (response: any) {
                verifyPayment({
                    orderId: paymentData.orderId,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature
                }, {
                    onSuccess: () => {
                        toast.success("Payment Successful!");
                        navigate("/account/orders");
                    }
                });
            },
            prefill: {
                email: paymentData.userEmail,
                contact: paymentData.userContact
            },
            theme: {
                color: "#4F39F6"
            }
        }
        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on('payment.failed', function (response: any){
            toast.error("Payment Failed", {
                description: response.error.description
            });
        });
        rzp1.open();
    }

    return (
        <div className={`w-full space-y-5 `}>
            <div className={`w-full p-5  relative border rounded-xl shadow-sm bg-white overflow-hidden`}>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-gray-100 rounded-full shrink-0">
                        <MapPin className="text-gray-600" size={24} />
                    </div>

                    <div className="space-y-1">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            Delivery Address
                            <span className="text-xs font-normal px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                Verified
                            </span>
                        </h3>

                        <div className="text-gray-600 text-sm leading-relaxed mt-2">
                            <p className="font-semibold text-gray-900">
                                {selectedAddress.firstName} {selectedAddress.lastName}
                            </p>
                            <p>{selectedAddress.streetAddress}</p>
                            <p>
                                {selectedAddress.city}, {selectedAddress.state} - <span className="font-medium text-gray-900">{selectedAddress.zip}</span>
                            </p>
                            <p className="font-medium text-gray-900 mt-1">
                                Phone: {selectedAddress.phoneNo}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="relative">
                        {/* Overlay Spinner if processing */}
                        {isPending && (
                            <div className="absolute inset-0 bg-white/50 z-50 flex flex-col items-center justify-center backdrop-blur-sm rounded-lg">
                                <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
                                <p className="font-semibold text-primary">
                                    {isCreating ? "Creating Order..." :
                                        isInitializing ? "Connecting to Bank..." :
                                            "Verifying Payment..."}
                                </p>
                            </div>
                        )}

                        <CartDetails handleOnClick={handleProcessPayment} />
                    </div>
                </div>
            </div>
            {!!selectedAddress&& <div className={`w-full flex justify-center items-center my-5 pt-10`}>
                <Button onClick={handleBack}
                        className={`px-10 py-8 cursor-pointer  text-base`}>
                    Go Back to select Address
                </Button>
            </div>}

        </div>
    );
};
export default OrderSummary;