"use client";
import { postData } from "@/lib/requests/requests";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import path for useRouter
import toast from "react-hot-toast";
import { useState } from "react";


export default function LoginPage() {

  const router = useRouter(); // Initialize useRouter outside of the handleSubmit function

  const [isDisabled, setIsDisabled] = useState(false);
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsDisabled(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { userEmail: email, userPassword: password };
    
    const response = await postData("api/loginUser", body);

    console.log(response);
    if (response.valid) {
      // Adjusted property name for clarity
      router.push("/home");
      router.refresh();
    } else {
      toast.error(response.error);
    }
    setIsDisabled(false);
  };

  return (
    <div className="flex flex-col gap-10 w-full h-screen items-center justify-center">
      <h1 className="font-bold text-3xl">Log in to Griot</h1>

      <form
        className="flex flex-col justify-center gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="email" className="block text-left">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className='w-full'
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block text-left">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className='w-full'
            required
          />

          <Link
            href="/forgot-password"
            className="underline text-blue-600 text-sm"
          >
            Forgot Password?
          </Link>

          <button
            className="border-2 rounded-lg mt-3 w-full items-center p-1"
            type="submit"
            disabled={isDisabled}
          >
            Login
          </button>

          <label className="text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-blue-600">
              Sign up
            </Link>
          </label>
        </div>
      </form>

    </div>
  );
}
