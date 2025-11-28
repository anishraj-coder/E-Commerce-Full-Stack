import CartItem from "@/customer/components/cart/CartItem.tsx";
import { Button } from "@/components/ui/button";
import { useGetCart } from "@/hooks/useCart";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";

const CartDetails = ({ handleOnClick }: { handleOnClick: () => void }) => {
    const { data: cart, isLoading } = useGetCart();

    if (isLoading) {
        return <div className="w-full h-64 flex items-center justify-center"><Spinner className={`h-12 w-12`} /></div>;
    }

    if (!cart || cart.cartItems.length === 0) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center text-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Your cart is empty</h3>
                    <p className="text-muted-foreground text-sm">Add items to get started</p>
                </div>
            </div>
        );
    }


    const totalMRP = cart.cartItems.reduce(
        (acc, item) => acc + (item.product.price * item.quantity),
        0
    );


    const finalPrice = cart.totalPrice;

    const totalDiscount = totalMRP - finalPrice;

    const totalItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);


    return (
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

            <div className="flex flex-col gap-6">
                {cart.cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            <div className="w-full rounded-xl border bg-white shadow-sm p-6 sticky top-24 h-fit">
                <h2 className="font-bold text-lg mb-4 text-gray-900">Price Details</h2>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Price ({totalItems} items)</span>
                        <span>Rs. {totalMRP.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>- Rs. {totalDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Delivery Charges</span>
                        <span>Free</span>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                        <span>Total Amount</span>
                        <span>Rs. {finalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <Button
                    onClick={handleOnClick}
                    className="w-full mt-6 h-12 text-base font-medium shadow-lg shadow-primary/20 cursor-pointer"
                >
                    Place Order
                </Button>
            </div>
        </section>
    );
};

export default CartDetails;