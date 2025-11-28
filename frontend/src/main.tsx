import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {Routes} from "@/utils/Routes.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools client={queryClient} initialIsOpen={false}/>
            <RouterProvider router={Routes}/>
        </QueryClientProvider>
    </React.StrictMode>
);