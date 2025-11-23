import {useAuthStore} from "@/store/authStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useMutation, useQuery, } from "@tanstack/react-query";
import { toast } from "sonner"
import {api} from "@/lib/api.ts";
import {type UserInfo, useUserStore} from "@/store/useUserStore.ts";
import {queryClient} from "@/lib/queryClient.ts";
import type {AxiosError} from "axios";


export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNo: string;
}

export interface SignUpResponse{
    email: string;
    id: number
}

export interface SignInRequest{
    email:string;
    password:string;
}

export interface SignInResponse{
    jwt:string,
    id:number,
}



export const useSignUp=()=>{
    return useMutation({
        mutationFn:async (data:SignUpRequest)=>{
            const response=await api.post<SignUpResponse>('/auth/signup',data);
            return response.data;
        },
        onSuccess:(data:SignUpResponse)=>{
            toast.success(`Registration Successful!!!!!!!!!!`,{
                description:`Has been successfully signed  Up with email: ${data.email}`
            });
        },
        onError: (error:AxiosError) => {
            console.log(error)
            toast.error("Registration failed",{
                description: error?.response?.data?.error || "Something went wrong",
            });
        },
    })
};


export const useUserInfo=()=>{
    const token=useAuthStore.getState().token;
    return useQuery({
        queryKey:["user-info"],
        queryFn: async ()=>{
            const response =await api.get<UserInfo>('user/info');
            return response.data;
        },
        enabled: !!token,
        retry:false,
        refetchOnWindowFocus:false,
        gcTime:5*60*1000,
        staleTime: 5*60*1000
    })
}

export const useSignIn=()=>{
    const login=useAuthStore(useShallow(state=>state.login));
    const setUser=useUserStore(useShallow(state => state.setUser));
    return useMutation({
        mutationFn: async(data:SignInRequest)=>{
            const response=await api.post<SignInResponse>("/auth/login",data);
            return response.data;
        },
        onSuccess: async (data:SignInResponse)=>{
            toast.success("Sign In successful!!!!!",{
                description:"Welcome "
            });
            login(data.jwt);

            try{
                const userInfo=await queryClient.fetchQuery({
                    queryKey:['user-info'],
                    queryFn: async()=>{
                        const userInfoResponse=await api.get<UserInfo>("/user/info");
                        return userInfoResponse.data;
                    },
                })

                setUser(userInfo);
            }catch (error) {
                console.error("Failed to fetch user info after login", error);
                toast.error("Login partial", { description: "Could not load user details." });
            }

        },
        onError:(error)=>{
            console.log(error);
            toast.error("Sign In failed",{
                description: error?.message||"Something went wrong"
            });
        }
    })
}
