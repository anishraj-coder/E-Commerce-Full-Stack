// src/utils/Routes.tsx
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

/**
 * Helper – redirects the root of the checkout flow to the first step
 */
const CheckoutRedirect = () => <Navigate to="/checkout?step=1" replace />;

/**
 * All routes live under <App/> (navigation + footer)
 */
export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [

            { index: true, element: <HomePage /> },
            {
                path: "products/:levelOne?/:levelTwo?/:levelThree?",
                element: <ProductPage />,
            },
            {
                path: "product/:productId",
                element: <ProductDetails />,
            },
            { path: "cart", element: <CartPage /> },
            {
                path: "checkout",
                element: <CheckOut />,
                children: [
                    { index: true, element: <CheckoutRedirect /> },
                ],
            },

            { path: "account/orders", element: <OrderHistory /> },
            {
                path: "account/orders/:orderId",
                element: <OrderDetails />,
            },
            { path: "*", element: <NotFound/> },
        ],
    },
]);