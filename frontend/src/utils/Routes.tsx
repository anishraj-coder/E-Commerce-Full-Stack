import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App.tsx";

import HomePage from "@/customer/pages/HomePage.tsx";
import ProductPage from "@/customer/pages/ProductPage.tsx";
import ProductDetails from "@/customer/pages/ProductDetails.tsx";
import CartPage from "@/customer/pages/CartPage.tsx";
import CheckOut from "@/customer/pages/CheckOut.tsx";
import OrderHistory from "@/customer/pages/OrderHistory.tsx";
import OrderDetails from "@/customer/pages/OrderDetails.tsx";
import NotFound from "@/customer/pages/NotFound.tsx";
import AuthGuard from "@/utils/AuthGuard.tsx";

const CheckoutRedirect = () => <Navigate to="/checkout?step=1" replace />;

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "products", element: <ProductPage /> },
            { path: "product/:productId", element: <ProductDetails /> },

            {
                path:'account',
                element: <AuthGuard/>,
                children: [
                    { path: "cart", element: <CartPage /> },

                    {
                        path: "checkout",
                        element: <CheckOut />,
                        children: [
                            { index: true, element: <CheckoutRedirect /> },
                        ],
                    },

                    { path: "orders", element: <OrderHistory /> },

                    {
                        path: "orders/:orderId",
                        element: <OrderDetails />,
                    },
                ]
            },

            { path: "*", element: <NotFound/> },
        ],
    },
]);