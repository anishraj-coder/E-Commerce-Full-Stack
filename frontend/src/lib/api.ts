import axios from 'axios';
import {useAuthStore} from "@/store/authStore.ts";
import {useUserStore} from "@/store/useUserStore.ts";
import {queryClient} from "@/lib/queryClient.ts";

export const api=axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    headers:{
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(config=>{
    const token=useAuthStore.getState().token;
    if(token) {
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (originalRequest._retry) return Promise.reject(error);
        originalRequest._retry = true;

        const status = error.response?.status;
        const isAuthError =
            status === 401 ||
            status === 403 ||
            (status === 500 && error.response?.data?.error?.includes("Cannot find the user"));


        if (isAuthError ) {
            useAuthStore.getState().logout();
            useUserStore.getState().removeUser();
            queryClient.clear();

            localStorage.removeItem('AuthStore');
            if (status === 403) {

                return Promise.reject(error);
            }

            if (!error.response) {
                console.warn("Network error or no response", error);
            }
        }

        return Promise.reject(error);
    }
);