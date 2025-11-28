import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {useUserStore} from "@/store/useUserStore.ts";
import {useShallow} from "zustand/react/shallow";
import {useAuthStore} from "@/store/authStore.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {queryClient} from "@/lib/queryClient.ts";

const UserMenu=()=>{
    const user=useUserStore(useShallow(state=>state.user));
    const userInitials=user?`${user.firstName[0]}${user.lastName[0]}`.toUpperCase():'I';
    const navigate=useNavigate();
    const logOut=useAuthStore(state=>state.logout);
    const removeUser=useUserStore(state=>state.removeUser);
    const handleLogOut=()=>{
        logOut();
        removeUser();
        navigate('/');
        queryClient.clear();
        localStorage.removeItem('AuthStore');
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className={`relative h-8 w-8 rounded-full cursor-pointer select-none`}>
                    <Avatar>
                        <AvatarImage className={`w-full h-full`} src={`https://github.com/shadcn.png`} alt={`User Icon`}/>
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-56`} align={`end`}>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <NavLink to={`/account/orders`}>Orders</NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleLogOut} className="text-red-600 cursor-pointer">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;