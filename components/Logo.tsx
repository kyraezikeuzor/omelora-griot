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
        <Link href={path != null ? path : '/' } className={`${className} flex flex-row items-center gap-1`}>
            <img className='w-6 h-auto' src='/omelora-logo.png'/>
            <span className='font-semibold text-xl tracking-tight'>Omelora</span>
        </Link>
    )
}

export default Logo