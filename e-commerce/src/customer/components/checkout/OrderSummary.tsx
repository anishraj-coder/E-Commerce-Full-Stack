
import CartDetails from "@/customer/components/cart/CartDetails.tsx";
import type {Address} from "@/types/address.ts";
import {MapPin} from "lucide-react";
import {useCheckOutStore} from "@/store/useCheckOutStore.ts";
import {useShallow} from "zustand/react/shallow";
import {Button} from "@/components/ui/button.tsx";
import {useSearchParams} from "react-router-dom";

interface OrderSummaryProps{
    selectedAddress:Address;
    handleNext:()=>void
}

const OrderSummary=({handleNext,selectedAddress}:OrderSummaryProps)=>{
    const {clearSelectedAddress}=useCheckOutStore(useShallow(state=>({selectedAddress:state.selectedAddress,clearSelectedAddress: state.clearSelectedAddress})))
    const [,setSearchParams]=useSearchParams();
    const handleBack=()=>{
        setSearchParams({step:'1'});
        clearSelectedAddress();
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
                    <h2 className="text-xl font-bold mb-4">Order Items</h2>
                    <CartDetails handleOnClick={handleNext} />
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