'use client'

import { useState } from "react";
import Heading from "../components/Heading"; // Importing Heading component
import Input from "../components/inputs/Input"; // Importing Input component
import { FieldValues,SubmitHandler, useForm } from "react-hook-form"; // Importing necessary types and functions from react-hook-form
import Button from "../components/Button"; // Importing Button component
import Link from "next/link"; // Importing Link component from Next.js
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react';
import { callback } from "chart.js/dist/helpers/helpers.core";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const RegisterFrom = () => {
    // State to manage loading state
    const [isLoading, setisLoading] =useState(false); 
    // Destructuring useForm hook to register form fields and handle form submission
    const {
        register,
        handleSubmit,
        formState: {errors}
    } =useForm<FieldValues>({
        defaultValues:{
            name: "",
            email: "",
            password:"",
        },
    });

    const router = useRouter()

     // Function to handle form submission
    const onSubmit: SubmitHandler<FieldValues> = (data) => 
    {
        setisLoading(true);

        axios.post('/api/register', data).then(() =>{
            toast.success('Account created')


            signIn('credentials',{
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) =>{
                if(callback?.ok){
                    router.push('/cart');
                    router.refresh();
                    toast.success('Logged In');
                }
                
                if(callback?.error){
                    toast.error(callback.error);
                }
            });
        }).catch(()=> toast.error("Something went wrong")).finally(()=>{
            setisLoading(false);
        }); 
    };

  return (
    <>
        {/* Heading component */}
        <Heading title="Sign up for Frame of Fame"/>
        <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
        ></Button>
        {/* Horizontal line */}
        <hr className="bg-slate-300 w-full h-px "/>
        <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        />
        <Button label={isLoading ? "Loading" : 'Sign Up'} onClick={handleSubmit(onSubmit)}
        />
        <p className="text-sm text-white">
            Already have an account? 
            <Link className="underline" 
            href='/login'>
            Log in
            </Link>
        </p>
    </>

  );
};

export default RegisterFrom; // Exporting the RegisterFrom component