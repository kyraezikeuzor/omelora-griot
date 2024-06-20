import React from 'react'
import getSessionUser  from "@/lib/getSessionUser"

type AvatarProps = {
    size?: 'sm' | 'lg' | 'xl',
    profileId: string;
}

export default async function Avatar({size, profileId}:AvatarProps) {

    const data = await getSessionUser()

    function getFirstLetter(firstName:string) {
        if (firstName) {
            return firstName.charAt(0);
        }
    }

    return (
        <div 
        className={`${size === 'sm' ? 'w-[18px] h-[18px]' : size === 'lg' ? 'w-[36px] h-[36px]' : size === 'xl' ? 'w-[60px] h-[60px]' : 'w-[28px] h-[28px]'} 
        bg-[--clr-pink-base] relative overflow-hidden flex flex-col items-center rounded-full`}
        >
            <span 
            className={`${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : size === 'xl' ? 'text-3xl' : 'text-base'} 
            text-center w-full self-center font-semibold absolute top-0 right-0 bottom-0 left-0`}>
                {data?.email && 
                getFirstLetter(data.email)?.toUpperCase()
                }
            </span>
        </div>
    )
}