'use client'

import { useEffect, useState } from "react";
import Heading from "../Components/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../Components/inputs/Input";
import Button from "../Components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps{
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',

        }
    })
    const router = useRouter()
    
    useEffect(() => {
        if(currentUser){
            router.push('/cart')
            router.refresh()
        }
    }, [currentUser, router])

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
       setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

                if (callback?.ok) {
                    router.push('/cart');
                    router.refresh();
                    toast.success('Logged In')
                }

                if (callback?.error) {
                    console.log("Sign-in error:", callback.error);
                    toast.error(callback.error);
                }
        })

    }

    if(currentUser){
        return <p className="text-center">Logged in.    Redirecting...</p>
    }
    return (
        <>
            <Heading title="Sign in to ShopEase" />
            <Button 
            outline
            label="Continue with Google"
            icon={AiOutlineGoogle }
            onClick={() => {signIn('google')}}
            />
            <hr className="bg-slate-300 w-full h-px" />

            <Input
                id='email'
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />

            <Button label={isLoading? 'Loading':'Sign In'} onClick={handleSubmit(onSubmit)}/>

            <p className="text-sm">Do not have an account? <Link href='/register' className="underline">Sign up</Link></p>
        </>
    );
};

export default LoginForm;