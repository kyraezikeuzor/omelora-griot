'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Icon from '@/components/Icon'

export default function LogOut() {

    const router = useRouter();

    const signOut = async () => {
      const supabase = createClient();
      const signout = supabase.auth.signOut();
      router.push("/");
    };
    return (
       
    <span onClick={signOut} className='cursor-pointer'>
        <Icon icon="LogOut" className='inline fill-[--clr-red-base]'/>
        <span className='text-[--clr-red-base]'>
            Log Out
        </span>
    </span>

    )
}