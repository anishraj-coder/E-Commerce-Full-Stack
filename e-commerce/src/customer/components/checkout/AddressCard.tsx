import type {Address} from "@/types/address.ts";
import {MapPin, CheckCircle, Trash2} from "lucide-react";
import {Button}from '@/components/ui/button';
import {useDeleteAddress} from "@/hooks/useAddress.ts";

interface AddressCardProps{
    address:Address;
    isSelected:boolean;
    onSelect:()=>void;
}

const AddressCard=({address,isSelected,onSelect}:AddressCardProps)=>{
    const {zip,streetAddress,firstName,lastName,phoneNo,state,city}=address;
    const ringStyle = isSelected
        ? "ring-2 ring-primary border-primary bg-primary/5 shadow-md"
        : "ring-1 ring-gray-200 hover:ring-primary/50 bg-white";
    const {mutate:deleteAddress,isPending:isDeleting}=useDeleteAddress();
    return(
        <div className={`p-4 border relative rounded-xl shadow-sm space-y-4 text-sm transition-all duration-200 cursor-pointer ${ringStyle}`}
             onClick={onSelect}
        >
            <div className={`grid grid-cols-[30px_1fr] w-full gap-8`}>
                <div className={`mt-1 relative space-y-4 flex flex-wrap flex-col`}>
                    <MapPin size={24} className={` w-full ${isSelected ? "text-primary" : "text-gray-400"}`} />
                    {isSelected && (
                        <CheckCircle
                            size={20}
                            className="text-primary w-full absolute top-0 left-5 bg-white rounded-full border border-white"
                        />
                    )}

                </div>
                <div className="w-full flex flex-col gap-1 text-sm">
                    <h3 className="text-base font-semibold">{firstName} {lastName}</h3>
                    <p className="text-gray-700">{streetAddress}</p>
                    <div className="flex gap-2 text-gray-500">
                        <span>{city},</span>
                        <span>{state} -</span>
                        <span className="font-medium">{zip}</span>
                    </div>
                    <h4 className="text-gray-600 mt-1">Phone: {phoneNo}</h4>
                </div>
            </div>
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) onSelect();
                }}
                disabled={isSelected}
                className="w-full h-10 font-semibold"
                variant={isSelected ? "default" : "outline"}
                size="lg"
            >
                {isSelected ? "Delivery Selected" : "Deliver Here"}
            </Button>
            <Button variant={'ghost'}
                    onClick={(e)=>{e.stopPropagation();deleteAddress(address.id)}}
                    disabled={isDeleting}
                    className={`h-10 w-10 absolute top-2 right-2 text-red-500
                     hover:bg-zinc-200 rounded-md transition-all duration-200`}><Trash2/></Button>
        </div>
    );
};
export default AddressCard;