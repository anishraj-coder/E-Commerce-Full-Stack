import {create} from "zustand";
import {devtools,persist} from "zustand/middleware";
import type {Address} from "@/types/address.ts";

interface CheckOutState{
    selectedAddress:Address|null;
    setSelectedAddress:(address:Address|null)=>void;
    clearSelectedAddress:()=>void;
}

export const useCheckOutStore=create<CheckOutState>()(
    persist(
        devtools(
            (set) => ({
                selectedAddress:null,
                setSelectedAddress:(address:Address|null)=>set(()=>({selectedAddress:address})),
                clearSelectedAddress:()=>set(()=>({selectedAddress:null}))
            }),
            {name:'checkout-state'}
        ),{name: 'checkout-state'}
    )
);