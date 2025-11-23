import {create} from "zustand";
import {persist,devtools} from "zustand/middleware";
import type {Address} from "@/types/address.ts";

interface CheckOutState{
    selectedAddress:Address|null;
    setSelectedAddress:(address:Address|null)=>void;
    clearSelectedAddress:()=>void;
}

export const useCheckOutStore=create<CheckOutState>()(
    devtools(
        persist(
            (set) => ({
                selectedAddress:null,
                setSelectedAddress:(address:Address|null)=>set(()=>({selectedAddress:address})),
                clearSelectedAddress:()=>set(()=>({selectedAddress:null}))
            }),
            {name:'checkout-state'}
        ),
        {name:'checkout-state'}
    )
);;