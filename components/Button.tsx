import React from 'react'
import Link from 'next/link'
import styles from './Button.module.css'

type ButtonProps = {
    children?:any;
    path?:string;
    variant?: 'outline' | 'action'
    onClick?:any;
    fullWidth?: Boolean;
    disabled?:boolean | undefined;
}

const Button = ({children, path, variant, onClick, fullWidth, disabled}:ButtonProps) => {
    return (
        <> 
            {variant !== 'action' ? 
                <>
                    {path ? 
                        <Link onClick={onClick} href={path} target='_blank' className={` ${fullWidth == true ? 'w-stretch' : 'w-fit'}`}>
                            <button disabled={disabled} className={`${variant === 'outline' && styles.outline} ${styles.button} ${fullWidth == true && 'w-full'}`}>
                                {children}
                            </button>
                        </Link>
                        :
                        <button disabled={disabled} onClick={onClick} className={` ${variant === 'outline' && styles.outline}  ${styles.button} ${fullWidth == true && 'w-full'}`}>
                            {children}
                        </button>
                    }
                </>
             :
            <button disabled={disabled} onClick={onClick} className='w-fit flex flex-row items-center gap-1 whitespace-nowrap rounded-md bg-[--clr-grey-extralight] font-semibold px-3 py-1  text-xs'>
                {children}
            </button>
            }
        </>
    )
}


export default Button;