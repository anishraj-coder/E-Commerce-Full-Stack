import {create} from "zustand";
import {devtools, } from "zustand/middleware";

export interface UserInfo{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    phoneNo:string,
    imageUrl:string
}

export interface UserStore{
    user:UserInfo|null,
    setUser:(user:UserInfo)=>void,
    removeUser:()=>void
}

export const useUserStore=create<UserStore>()(
    devtools(
        set=>({
            user:null,
            setUser:(user:UserInfo)=>set({user}),
            removeUser:()=>set({user: null})
        }),{name:"user-store"}
    )
);