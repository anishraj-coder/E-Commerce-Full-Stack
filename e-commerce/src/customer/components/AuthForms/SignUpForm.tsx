import z from 'zod';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button.tsx"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner"
import {type SignUpRequest, useSignUp} from "@/hooks/useAuth.ts";

const formSchema=z.object({
    firstName: z.string().min(2,{message:"First name must be at least 2 letter long"})
       .max(20,"First name must be at max 20 characters long "),
    lastName: z.string().min(2,{message:"First name must be at least 2 letter long"})
        .max(20,"First name must be at max 20 characters long "),
    email:z.email(),
    password:z.string().min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
}).refine(data=>data.password===data.confirmPassword,{message:"Password do not match",path:["confirmPassword"]});

export type signUpFromSchema =z.infer<typeof formSchema>;
interface SignUpFromProps{
    onSuccessSignUp?:()=>void;
}
const SignUpForm = ({onSuccessSignUp}:SignUpFromProps) => {
    const {mutate:signUp,isPending}=useSignUp();
    const form=useForm<signUpFromSchema>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            email:'',
            password:"",
            confirmPassword:"",
            mobile: "",
        }
    })
    const handleSubmit=(data:signUpFromSchema)=>{
        const signUpRequest:SignUpRequest={
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            phoneNo:data.mobile,
            password:data.password
        }
        console.log(signUpRequest);
        signUp(signUpRequest,{
            onSuccess:()=>{
                onSuccessSignUp?.();
            }
        });
    }

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center py-5`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={`w-full h-full flex flex-col items-center justify-center gap-2 gap-y-4`}>
                    <div className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4`}>
                        <FormField render={({field})=>(
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl><Input {...field} placeholder={"Enter first name"}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'firstName'}/>
                        <FormField render={({field})=>(
                            <FormItem>
                                <FormLabel>Enter last Name</FormLabel>
                                <FormControl><Input placeholder={"Last name"} {...field}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={"lastName"}/>
                    </div>
                    <div className={`w-full gap-y-4 flex flex-col `}>
                        <FormField render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input placeholder={"Email"} {...field} /></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={"email"}/>
                        <FormField render={({field})=>(
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Mobile number"} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={'mobile'}/>
                        <FormField render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl><Input type={`password`} {...field} placeholder={"Password"}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={"password"}/>
                        <FormField render={({field})=>(
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl><Input type={'password'} {...field} placeholder={"Confirm Password"}/></FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} name={"confirmPassword"}/>

                    </div>
                    <Button disabled={isPending} className={`w-full h-12 cursor-pointer select-none`}>
                        {isPending?<Spinner/>:`Sign Up`}
                    </Button>
                </form>
            </Form>

        </div>
    );
};

export default SignUpForm;