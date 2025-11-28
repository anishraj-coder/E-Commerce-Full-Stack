import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog.tsx"
import {useEffect, useState} from "react";
import SignUpForm from "@/customer/components/AuthForms/SignUpForm.tsx";
import SignInForm from "@/customer/components/AuthForms/SignInForm.tsx";
import {useNavigate} from "react-router-dom";


interface SignInModelProps{
    open:boolean,
    handleClose:()=>void
}

const SignInModel=({open,handleClose}:SignInModelProps)=>{
    const [signUp, setSignUp] = useState<boolean>(true);
    const searchParams=new URLSearchParams(location.search);
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=searchParams.get('auth');
        if(auth==='sign_up')setSignUp(true);
        else setSignUp(false);
    },[searchParams.get('auth')]);
    const handleSwitch=(mode:'sign_up'|'sign_in')=>{
        searchParams.delete('auth');
        searchParams.set("auth",mode);
        navigate(`${location.pathname}?${searchParams.toString()}`);
        setSignUp(false);
    }



    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle><span className={`text-2xl font-semibold`}>{signUp?"Sign Up":"Sign In"}</span></DialogTitle>
                    <div>{signUp?<div className={`flex flex-col gap-x-3 text-sm justify-center items-center`}>
                        <SignUpForm onSuccessSignUp={()=>handleSwitch("sign_in")}/>
                        <div className={`flex gap-x-3`}>
                            <h2>Already signup?  </h2>
                            <button className={`text-[#4F39F6] cursor-pointer`} onClick={()=>handleSwitch("sign_in")}>Sign In</button>
                        </div>
                    </div>:<div className={`flex flex-col  gap-x-3 text-sm justify-center items-center`}>
                        <SignInForm onSuccessSignIn={handleClose}/>
                        <div className={`flex gap-x-2 justify-center w-full`}>
                            <h2>Not signed Up?  </h2>
                            <button className={`text-[#4F39F6] cursor-pointer`} onClick={()=>handleSwitch('sign_up')}>Sign Up</button>
                        </div>
                    </div>}</div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
export default SignInModel;