import DeliveryAddressCard from "@/customer/components/orderDetails/DeliveryAddressCard.tsx";
import {Stepper,Step,StepLabel} from '@mui/material';
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {mens_kurta} from "@/data/menKurta.ts";
import OrderInfoCard from "@/customer/components/orderDetails/OrderInfoCard.tsx";
import {nanoid} from "nanoid";

const steps=[
    {id:'id1',label:"Order Placed"},
    {id:"id2",label:"Order Confirmed"},
    {id:'id3',label: "Shipped"},
    {id:"id4",label: "Out For Delivery"},
    {id:'id5',label :'Delivered'}
]

const OrderDetails=()=>{
    return(
        <div className={`w-full min-h-screen flex flex-col items-center py-10 px-10`}>
            <DeliveryAddressCard/>
            <div className={`w-full px-10 py-5 `}>
                <Stepper  activeStep={1} orientation={useIsMobile()?'vertical':'horizontal'}
                          alternativeLabel={!useIsMobile()} sx={{
                    '& .MuiStepIcon-root.Mui-active': {
                        color: '#10b981', // Change active step color (e.g., emerald green)
                    },
                    '& .MuiStepIcon-root.Mui-completed': {
                        color: '#10b981', // Completed step color
                    },
                    '& .MuiStepIcon-text': {
                        fill: 'white', // Text color inside icon
                    },
                    '& .MuiStepConnector-line': {
                        borderColor: '#10b981', // Line color between steps
                    },
                }}>
                    {steps.map(item=>(
                        <Step key={item.id}>
                            <StepLabel>{item.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <section className={`w-[83%] lg:px-10 flex flex-col items-center gap-y-5  py-10  `}>
                {mens_kurta.slice(0,5).map((item) => (
                    <OrderInfoCard key={nanoid()} product={item}/>
                ))}

            </section>
        </div>
    );
};
export default OrderDetails;