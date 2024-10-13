'use client'

import { useState } from "react";
import Heading from "../Components/Heading";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../Components/inputs/Input";
import Button from "../Components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";


const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',

        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
       setIsLoading(true)
       console.log(data);

    }

    return (
        <>
            <Heading title="Sign up for ShopEase" />
            <Button 
            outline
            label="Sign up with Google"
            icon={AiOutlineGoogle }
            onClick={() => {}}
            />
            <hr className="bg-slate-300 w-full h-px" />

            <Input
                id='name'
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
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

            <Button label={isLoading? 'Loading':'Sign Up'} onClick={handleSubmit(onSubmit)}/>

            <p className="text-sm">Already have an account? <Link href='/login' className="underline">Sign In</Link></p>
        </>
    );
};

export default RegisterForm;