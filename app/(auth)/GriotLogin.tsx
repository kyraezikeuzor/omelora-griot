"use client";
import { postData } from "@/lib/requests/requests";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import path for useRouter
import toast from "react-hot-toast";
import { useState } from "react";
import Button from '@/components/Button'
import Logo from '@/components/Logo'

const GriotLogin = ({ onLogin }: { onLogin: () => void }) => {

  const router = useRouter(); // Initialize useRouter outside of the handleSubmit function

  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsDisabled(true);
    
    const body = { userEmail: email, userPassword: password };
    
    const response = await postData("api/login", body);

    if (response.valid) {
      // Adjusted property name for clarity
      router.push("/generate");
      router.refresh();
      onLogin();
    } else {
      toast.error(response.error);
    }
    setIsDisabled(false);
  };

  return (
    <section className='w-full'>
        <div className="w-full flex flex-col gap-10 w-full h-screen items-center justify-center">
          <div className='flex flex-col gap-2 text-center items-center'>
            <Logo/>
            <h1 className="font-bold text-4xl">Welcome back!</h1>
            <span className='opacity-80'>Enter your email and password to log in.</span>
          </div>
          <form
            className="w-full flex flex-col justify-center gap-5 items-center"
          >
            <div className="w-full">
              <label htmlFor="email" className="block text-left font-medium">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className='w-full'
                placeholder='name@example.com'
                required
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="block text-left font-medium">
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className='w-full'
                placeholder='1234'
                required
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>
            <Button fullWidth disabled={isDisabled} variant='outline' onClick={handleSubmit}>
              Login
            </Button>
          </form>
        </div>
    </section>
  );
}


export default GriotLogin;