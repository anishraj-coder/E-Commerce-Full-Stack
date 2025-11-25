import * as z from 'zod';
import AddressCard from "@/customer/components/checkout/AddressCard.tsx";
import {Loader2}  from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm} from "react-hook-form";
import {ScrollArea} from '@/components/ui/scroll-area'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {zodResolver}from "@hookform/resolvers/zod";
import { useState} from "react";
import type {Address, CreateAddressRequest} from "@/types/address.ts";
import {useCreateAddress, useGetAllAddress} from "@/hooks/useAddress.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useCheckOutStore} from "@/store/useCheckOutStore.ts";
import {useShallow} from "zustand/react/shallow";

const formSchema = z.object({
    firstName: z.string()
        .min(2, "Minimum length of the first name is 2")
        .max(40, "Max length of the first name is 40")
        .regex(/^[a-zA-Z\s]+$/, "First name should only contain letters"),

    lastName: z.string()
        .min(2, "Minimum length of the last name is 2")
        .max(40, "Max length of the last name is 40")
        .regex(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),

    address: z.string()
        .min(10, "Minimum length of the address is 10")
        .max(80, "Max length of the address is 80"),

    phone: z.string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

    zip: z.string()
        .regex(/^\d{3,10}$/, "Zip code must be 3-10 digits only"),

    city: z.string()
        .min(2, "City name must be at least 2 letters long")
        .regex(/^[a-zA-Z\s]+$/, "City name should only contain letters"),

    state: z.string()
        .min(2, "State name must be at least 2 letters long")
        .regex(/^[a-zA-Z\s]+$/, "State name should only contain letters"),
});
type FormType=z.infer<typeof formSchema>;



const DeliveryAddressForm=()=>{
    const [selectedId, setSelectedId] = useState<number|null>(null);
    const {data:addresses,isLoading: isLoadingAddresses}=useGetAllAddress();
    const {mutate:createAddress,isPending:isCreating}=useCreateAddress();
    const {setSelectedAddress}=useCheckOutStore(useShallow(state => ({setSelectedAddress:state.setSelectedAddress, selectedAddress:state.selectedAddress})));
    const form=useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            address:"",
            phone:"",
            city:"",
            state:"",
            zip:"",
        }
    })
    const onSubmit=(data:FormType)=>{
        const createAddressDto:CreateAddressRequest={
            firstName:data.firstName,
            lastName:data.lastName,
            phoneNo:data.phone,
            state: data.state,
            city:data.city,
            streetAddress: data.address,
            zip:data.zip,
        }
        createAddress(createAddressDto,{
            onSuccess: ()=> {
                form.reset();
            },
        });
    }
    const handleSelectAddress=(address:Address)=>{
        setSelectedId(address.id);
        setSelectedAddress(address);
    }


    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Delivery Address</h1>
                <p className="text-gray-600 mt-2">Choose or add a new delivery address</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left: Saved Addresses */}
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Saved Addresses</h2>

                    {isLoadingAddresses ? (
                        <div className="flex justify-center items-center h-64">
                            <Spinner className="h-12 w-12" />
                        </div>
                    ) : addresses && addresses.length > 0 ? (
                        <ScrollArea className="h-96 pr-4 border border-gray-200 rounded-xl p-4 bg-gray-50">
                            <div className="space-y-4">
                                {addresses.map((addr) => (
                                    <AddressCard
                                        key={addr.id}
                                        address={addr}
                                        isSelected={selectedId === addr.id}
                                        onSelect={() => handleSelectAddress(addr)}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <p className="text-gray-500">No saved addresses yet.</p>
                            <p className="text-sm text-gray-400 mt-2">Add a new one below</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Address</h2>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <FormField control={form.control} name="firstName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Anish" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="lastName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Raj" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <FormField control={form.control} name="zip" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zip Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="814101" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="city" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Dumka" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <FormField control={form.control} name="state" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Jharkhand" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="9876543210" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <FormField control={form.control} name="address" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="House no., Street, Landmark, Area..."
                                                className="resize-none h-28"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-12 text-lg font-medium"
                                    disabled={isCreating}
                                >
                                    {isCreating ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Saving Address...
                                        </>
                                    ) : (
                                        "Save new Delivery Address"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeliveryAddressForm;