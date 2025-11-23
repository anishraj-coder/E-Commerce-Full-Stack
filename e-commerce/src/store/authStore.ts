import {create} from 'zustand';
import {persist,devtools} from "zustand/middleware";

interface AuthState{
    token:string|null;
    isLoggedIn:boolean;
    login: (token:string)=>void;
    logout:()=>void;
}

export const useAuthStore=create<AuthState>()(
    persist(
        devtools(set=>({
            token:null,
            isLoggedIn:false,
            login:(token:string)=>set({token,isLoggedIn:true}),
            logout:()=>set({token:null,isLoggedIn:false})
        }))
        ,{
            name:'AuthStore',
            partialize: state => ({token: state.token})
        }
    )
)