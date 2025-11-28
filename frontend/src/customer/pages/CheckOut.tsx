import { useSearchParams} from "react-router-dom";
import {useEffect, } from "react";
import {toast} from 'sonner';
import {Box, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import DeliveryAddressForm from "@/customer/components/checkout/DeliveryAddressForm.tsx";
import {Button} from "@/components/ui/button.tsx";
import OrderSummary from "@/customer/components/checkout/OrderSummary.tsx";
import {useCheckOutStore} from "@/store/useCheckOutStore.ts";
import {useShallow} from "zustand/react/shallow";

const steps = [`Login`,'Delivery Address',`Order Summary`,`Payment`];

export default function CheckOut() {
    const [searchParams,setSearchParams]=useSearchParams();
    const activeStep=Number(searchParams.get('step'))||1;
    const {selectedAddress}=useCheckOutStore(useShallow(state=>({selectedAddress:state.selectedAddress,setSelectedAddress:state.setSelectedAddress})));
    const handleNext=()=>{
        if(activeStep===1||!selectedAddress){
            toast.error('Please select a delivery address to proceed');
            return;
        }
        const nextStep=activeStep+1;
        setSearchParams({step:nextStep.toString()});
        window.scrollTo({top:0,behavior:'smooth'});
    }

    const  handlePrevious=()=>{
        if(activeStep<=1)return;
        const prevStep=activeStep-1;
        setSearchParams({step:prevStep.toString()});
    }

    // const handleReset=()=>{
    //     setSearchParams({step:'1'});
    //     setSelectedAddress(null);
    //     window.scrollTo({top:0,behavior:'smooth'});
    // }
    useEffect(() => {
        if(activeStep===1&&selectedAddress){
            const timeout=setTimeout(()=>{
                setSearchParams({step:'2'})
                window.scrollTo({top:0,behavior:'smooth'})
            },200)
            return ()=>clearTimeout(timeout);
        }

    }, [selectedAddress,setSearchParams,activeStep]);

    return (
        <div className={`w-full min-h-screen px-6 py-10 flex flex-col items-center`}>
            <div className={`w-full  lg:w-4/5 mb-10 `}>
                <Box sx={{width:'100%'}}>
                    <Stepper alternativeLabel={!useIsMobile()} activeStep={activeStep}>
                        {steps.map(label=>(
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </div>
            <div className={`w-full lg:w-4/5 flex items-center justify-center `}>
                {activeStep===1&&(
                    <div className={`animate-in w-full fade-in slide-in-from-bottom duration-500`}>
                        <DeliveryAddressForm  />
                    </div>
                )}
                {activeStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom duration-500">
                        {selectedAddress ? (
                            <OrderSummary
                                selectedAddress={selectedAddress}
                                handleNext={handleNext}
                            />
                        ) : (
                            <div className="text-center">
                                <Typography color="error">No address selected.</Typography>
                                <Button onClick={handlePrevious}>Go Back</Button>
                            </div>
                        )}
                    </div>
                )}

                {activeStep === 3 && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold">Payment Gateway</h2>
                        <p className="text-gray-500">Integration coming soon...</p>
                        <Button onClick={handlePrevious} className={`mt-4`}>Back</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
