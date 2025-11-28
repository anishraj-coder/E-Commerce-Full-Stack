import z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input } from "@/components/ui/input"
import {Button }from "@/components/ui/button"
import {type SignInRequest, useSignIn} from "@/hooks/useAuth.ts";
import {Spinner} from "@/components/ui/spinner.tsx";


const formSchema=z.object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export type signInForm=z.infer<typeof formSchema>;

interface SignInFormProps{
    onSuccessSignIn?:()=>void
}

const SignInForm=({onSuccessSignIn}:SignInFormProps)=>{
    const form=useForm<SignInForm>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    });
    const {mutate:signIn,isPending}=useSignIn();
    const handleSubmit=(data:signInForm)=>{
        const signInRequest:SignInRequest={
            password:data.password,
            email:data.email
        };
        signIn(signInRequest,{
            onSuccess:()=>{
                onSuccessSignIn?.();
            }
        });
    }
    return(
        <div className={`flex gap-x-3 p-5 w-full h-full`}>
            <Form {...form}>
                <form className={`flex w-full flex-col gap-y-3 `} onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input placeholder={`Email`} {...field}/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={"email"}/>
                    <FormField render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl><Input type={'password'} placeholder={`Password`} {...field}/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} name={"password"}/>
                    <Button type={'submit'} className={`h-12 w-full cursor-pointer select-none`}>
                        {isPending?<Spinner/>:"Sign In"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
export default SignInForm;