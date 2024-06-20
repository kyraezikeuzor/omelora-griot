'use client'
import React, { useState, useEffect } from 'react';
import Icon from '../Icon';

type CheckboxProps = {
    children?: React.ReactNode;
    checked?: boolean; // prop to control the checkbox state
    onCheckOn?: any; // function to call when checked
    onCheckOff?: any; // function to call when unchecked
}

const Checkbox = ({ children, checked = false, onCheckOn, onCheckOff }: CheckboxProps) => {
    const [click, setClick] = useState(checked);

    useEffect(() => {
        // Update state when the checked prop changes
        setClick(checked);
    }, [checked]);

    useEffect(() => {
        // Call appropriate functions based on the click state
        if (click) {
            onCheckOn && onCheckOn();
        } else {
            onCheckOff && onCheckOff();
        }
    }, [click, onCheckOn, onCheckOff]);

    const handleClick = () => {
        setClick(!click);
    };

    return (
        <>
        {!children ? 
           <div onClick={handleClick} className='flex flex-col items-center cursor-pointer '>
                <div className={`h-5 w-5 rounded-md flex flex-col items-center hover:opacity-75 ${click ? 'bg-[--clr-base-text]' : 'border border-[--clr-grey-base]'}`}>
                    <Icon icon="Check" size='xs' className={`${click ? 'fill-[--clr-base]' : 'fill-[--clr-grey-dark]'}`} />
                </div>
            </div>
            :
            <div onClick={handleClick} className='flex flex-row gap-2 items-center cursor-pointer '>
                <div className={`h-5 w-5 rounded-md flex flex-col items-center hover:opacity-75 ${click ? 'bg-[--clr-base-text]' : 'border border-[--clr-grey-base]'}`}>
                    <Icon icon="Check" size='xs' className={`${click ? 'fill-[--clr-base]' : 'fill-[--clr-grey-dark]'}`} />
                </div>
                <div>
                    {children}
                </div>
            </div>
        }
        </>
    );
}

export default Checkbox;