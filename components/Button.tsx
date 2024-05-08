import React from 'react'
import Link from 'next/link'
import styles from './Button.module.css'

type ButtonProps = {
    children?:any;
    path?:string;
    outline?: Boolean;
}

const Button = ({children, path, outline}:ButtonProps) => {
    return (
        <>
            {
                path ? 
                <Link href={path}>
                    <button className={outline == true ? `${styles.outline} ${styles.button} ` : `${styles.button}`}>
                        {children}
                    </button>
                </Link>
                :
                <button className={outline == true ? `${styles.outline} ${styles.button} ` : `${styles.button}`}>
                    {children}
                </button>
            }
        </>
    )
}


export default Button;