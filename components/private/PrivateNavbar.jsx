"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import Modal from '@/components/Modal'

export default function PrivateNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    const { error } = supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="z-40 w-full flex sticky top-0 p-5 md:px-[2vw] bg-[--clr-base] border-b border-[--clr-grey-light] shadow-xs">
      
      <span className='w-full ml-16 flex flex-row items-center font-medium'>
        My Dashboard
      </span>

      <div className="hidden flex justify-end w-full ">
      </div>
    </div>
  );
}
