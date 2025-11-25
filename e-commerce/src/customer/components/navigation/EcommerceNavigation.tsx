import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import SignInModel from "@/customer/components/AuthForms/SignInModel.tsx";
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import UserMenu from "@/customer/components/navigation/UserMenu.tsx";
import {useAuthStore} from "@/store/authStore.ts";
import {useShallow} from "zustand/react/shallow";
import {LucideShoppingBag} from 'lucide-react';

const EcommerceNavigation=()=>{
    const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
    const navigate=useNavigate();
    const params = new URLSearchParams(location.search);
    const auth=params.get('auth');
    const handleOpen = () => {
        params.delete("auth");
        params.set("auth", "sign_up");
        navigate(`${location.pathname}?${params.toString()}`);
        setSignUpOpen(true)
    };
    const handleClose=()=>{
        setSignUpOpen(false)
        params.delete("auth");
        navigate(`${location.pathname}?${params.toString()}`);
        setSignUpOpen(false)
    }
    useEffect(()=>{
        setSignUpOpen(auth!==null)
    },[auth]);

    const token=useAuthStore(useShallow(state=>state.token));
    const isLoggedIn=!!token;

    return(
        <div className="w-full px-10 py-7 flex items-center justify-between">

            {/* LEFT SECTION — Pages */}
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <NavigationMenuLink href={`/products`}  >Products</NavigationMenuLink>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-3">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href="/">
                                            <div className="text-sm font-medium">Electronics</div>
                                            <p className="text-muted-foreground text-sm">
                                                Laptop, Phone, more...
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>



            <div className="flex items-center gap-4">
                {isLoggedIn?<UserMenu/>:<button
                    onClick={handleOpen}
                    className="px-4 py-2 rounded-md bg-primary text-white cursor-pointer select-none"
                >
                    Sign Up
                </button>}
                {isLoggedIn&&<span className={`p-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer  rounded-full `}>
                    <NavLink to={'/account/cart'}><LucideShoppingBag/></NavLink>
                </span>}
            </div>

            <SignInModel open={signUpOpen} handleClose={handleClose} />
        </div>
    );
}
export default  EcommerceNavigation;