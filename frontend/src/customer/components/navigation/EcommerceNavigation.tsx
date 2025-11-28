import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import SignInModel from "@/customer/components/AuthForms/SignInModel.tsx";
import {useEffect, useState} from "react";
import {NavLink,  useSearchParams} from "react-router-dom";
import UserMenu from "@/customer/components/navigation/UserMenu.tsx";
import {useAuthStore} from "@/store/authStore.ts";
import {useShallow} from "zustand/react/shallow";
import {LucideShoppingBag} from 'lucide-react';
import {useGetCategories} from "@/hooks/useCategories.ts";
import CategoryMenu from "@/customer/components/navigation/CategoryMenu.tsx";

const EcommerceNavigation=()=>{
    const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
    const [searchParams,setSearchParams]=useSearchParams();
    const auth=searchParams.get('auth');
    const handleOpen = () => {
        searchParams.delete('auth');
        setSearchParams({"auth":"sign_up"})
        setSignUpOpen(true)
    };
    const handleClose=()=>{
        setSearchParams({});
        setSignUpOpen(false)
    }
    useEffect(()=>{
        setSignUpOpen(auth!==null)
    },[auth]);
    const {data:categories}=useGetCategories();

    const token=useAuthStore(useShallow(state=>state.token));
    const isLoggedIn=!!token;

    return(
        <div className="w-full px-10 py-7 flex items-center justify-between relative">

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {categories?.map((level1) => (
                        <div className={`flex-1 flex justify-start`}>
                            <NavigationMenuItem key={level1.path}>
                                <NavigationMenuTrigger className="capitalize " >
                                    {level1.name}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <CategoryMenu category={level1} />
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </div>
                    ))}
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