import HomeIcon from "@mui/icons-material/Home";



const DeliveryAddressCard = () => {
    return (
        <div className={`grid grid-cols-[20%_70%] gap-8 w-4/5 p-4 rounded-lg ring-1 ring-gray-400`}>
            <h2 className={`col-span-2 text-xl font-semibold`}>Delivery Address</h2>
            <span className={`h-full flex items-center justify-center`}><HomeIcon sx={{scale:3}}/></span>
            <div className={`w-full flex flex-col gap-2 [&>*]:text-md`}>
                <h3 className={`text-lg font-semibold`}>Customer Name</h3>
                <h4>Phone number: +91 7479447275</h4>
                <h5>Address Dumaka dudhandi</h5>
                <div className={`flex gap-3`}>
                    <h5>Zip code: 814101</h5>
                    <h5>City</h5>
                    <h5>State</h5>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddressCard;