'use client'

import { useState } from "react";
import Heading from "../components/Heading"; // Importing Heading component
import Input from "../components/inputs/Input"; // Importing Input component
import { FieldValues,SubmitHandler, useForm } from "react-hook-form"; // Importing necessary types and functions from react-hook-form
import Button from "../components/Button"; // Importing Button component
import Link from "next/link"; // Importing Link component from Next.js
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
    // State to manage loading state
    const [isLoading, setisLoading] =useState(false); 
    // Destructuring useForm hook to register form fields and handle form submission
    const {
        register,
        handleSubmit,
        formState: {errors}
    } =useForm<FieldValues>({
        defaultValues:{
            email: "",
            password:"",
        },
    });

     // Function to handle form submission
    const onSubmit: SubmitHandler<FieldValues> = (data) => 
    {
        setisLoading(true);
        console.log(data);
    };

  return (
    <>
        {/* Heading component */}
        <Heading title="Sign in to Frame of Fame"/>
        <Button
        outline
        label="Continu with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
        ></Button>
        {/* Horizontal line */}
        <hr className="bg-slate-300 w-full h-px "/>
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
        <Button label={isLoading ? "Loading" : 'Login'} 
        onClick={handleSubmit(onSubmit)}
        />
        <p className="text-sm text-white">
            Do not have an account? 
            <Link className="underline" 
            href='/register'>
            Sign up
            </Link>
        </p>
    </>
  );
};

export default LoginForm;