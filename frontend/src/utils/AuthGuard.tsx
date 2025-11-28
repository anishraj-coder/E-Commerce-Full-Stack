import {useAuthStore} from "@/store/authStore.ts";
import {useUserStore} from "@/store/useUserStore.ts";
import {Spinner} from '@/components/ui/spinner';
import {Navigate, Outlet} from 'react-router-dom';

const AuthGuard=()=>{

    const token=useAuthStore(state=>state.token);
    const user=useUserStore(state => state.user);
    if(!user&&token){
        return <div className={`w-full h-[70vh] flex items-center justify-center`}>
            <Spinner className={`w-20 h-20`} />
        </div>;
    }

    if(user&&token){
        return <Outlet/>
    }

    return <Navigate to={'/'}/>
};
export default AuthGuard;