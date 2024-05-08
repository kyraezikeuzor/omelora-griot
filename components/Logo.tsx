import React from 'react'
import Link from 'next/link'

type LogoProps = {
    minimal?: boolean,
    size?: 'sm' | 'lg' | 'xl',
    className?: any
    path?:string;
}

const Logo = ({minimal, size, className, path}: LogoProps) => {

    return (
        <Link href={path != null ? path : '/' } className={`${className} flex flex-row items-center gap-2`}>
            
            <img className='w-8 md:w-6' src='https://schoolhouse.world/assets/public/logo-new-small-v2.svg'/>
            
            {!minimal && 
            <span className='hidden md:block font-semibold text-base'>
                Computable
            </span>}

        </Link>
    )
}

export default Logo