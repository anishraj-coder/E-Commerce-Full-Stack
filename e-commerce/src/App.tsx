import { Toaster } from "@/components/ui/sonner"
import EcommerceNavigation from "@/customer/components/navigation/EcommerceNavigation.tsx";
import Footer from "@/customer/components/navigation/Footer.tsx";
import {Outlet} from 'react-router-dom'
import {useUserInfo} from "@/hooks/useAuth.ts";
import {useUserStore} from "@/store/useUserStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useEffect} from "react";
import {useAuthStore} from "@/store/authStore.ts";



const App = () => {
    const {data:latestUser,error}=useUserInfo();
    const {setUser,removeUser,}=useUserStore(useShallow(state => ({
        setUser: state.setUser,
        removeUser: state.removeUser
    })));
    const {logout}=useAuthStore(useShallow(state => ({logout:state.logout})));;
    useEffect(()=>{
        if(latestUser)setUser(latestUser);
    },[setUser,latestUser])

    useEffect(() => {
        if(error){
            console.log("Force log out user");
            logout();
            removeUser();
        }
    }, [error,logout,removeUser]);

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