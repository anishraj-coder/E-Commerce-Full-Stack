
import CartDetails from "@/customer/components/cart/CartDetails.tsx";
import {useNavigate} from "react-router-dom";

const CartPage=()=>{
    const navigate=useNavigate();
    const handleOnClick=()=>{
        navigate('/checkout?step=1');
        window.scrollTo(0,0);
    }
    return(
        <div className={`w-full min-h-screen px-10 pb-10`}>
            <h1 className={`text-3xl lg:text-5xl font-bold lg:font-black mb-10`}>Shopping Cart</h1>
            <CartDetails handleOnClick={handleOnClick}/>
        </div>
    );
};
export default CartPage;