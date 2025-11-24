import { Toaster } from "@/components/ui/sonner"
import EcommerceNavigation from "@/customer/components/navigation/EcommerceNavigation.tsx";
import Footer from "@/customer/components/navigation/Footer.tsx";
import {Outlet} from 'react-router-dom'
import {useUserInfo} from "@/hooks/useAuth.ts";
import {useUserStore} from "@/store/useUserStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {useAuthStore} from "@/store/authStore.ts";
import {useCheckOutStore} from "@/store/useCheckOutStore.ts";
import {useGetAllAddress} from "@/hooks/useAddress.ts";



const App = () => {
    const {data:latestUser,error}=useUserInfo();
    const {setUser,removeUser,}=useUserStore(useShallow(state => ({
        setUser: state.setUser,
        removeUser: state.removeUser
    })));
    const {removeAddress,address}=useCheckOutStore(useShallow(state=>({removeAddress:state.clearSelectedAddress,address:state.selectedAddress})))
    const {logout}=useAuthStore(useShallow(state => ({logout:state.logout})));;
    useEffect(()=>{
        if(latestUser)setUser(latestUser);
    },[setUser,latestUser])

    const {data:addresses}=useGetAllAddress();
    useEffect(() => {
        if(error){
            console.log("Force log out user");
            logout();
            removeUser();
            removeAddress();

        }
        if(!addresses||addresses.length===0){
            removeAddress();
            return ;
        }
        if(address){
            const existing=addresses.find(item=>item.id===address.id)
            if(!existing)removeAddress();
        }
    }, [error,logout,address,addresses,removeUser,removeAddress]);


    return (
        <div className={`h-screen w-full`}>
            <EcommerceNavigation/>
            <Outlet/>
            <Footer/>
            <Toaster richColors={true}/>
        </div>
    );
};

export default App;