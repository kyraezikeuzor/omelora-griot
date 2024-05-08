'use client'
import React, {useState, useEffect} from 'react'
import Icon from './Icon'

type CheckboxProps = {
    children: React.ReactNode;
    onCheckOn?: any;
    onCheckOff?:any;
}

const Checkbox = ({children, onCheckOn, onCheckOff}: CheckboxProps) => {

    const [click, setClick] = useState(false)
    const [prevClick, setPrevClick] = useState(false);

    useEffect(() => {
      // Update prevClick whenever click changes
      setPrevClick(click);
    }, [click]);

    useEffect(() => {
        // Check conditions and call appropriate functions
        if (!click && prevClick) {
          onCheckOff();
        } else if (click && !prevClick) {
          onCheckOn();
        }
      }, [click, prevClick]);

    return (
        <>
          <div onClick={() => setClick(!click)} className='flex flex-row gap-2 items-center px-1 cursor-pointer hover:bg-[--clr-grey-light]'>
            <div className={`h-3 w-3 rounded-sm flex flex-col items-center ${click ? 'bg-[--clr-base-text]' : 'border border-[--clr-grey-base]'}`}>
                <Icon icon="Check" className={`${click ? 'fill-[--clr-base]':'fill-[--clr-base-text]'}`}/>
            </div>
            <div>
              {children}
            </div>
          </div>
        </>
    )
}

export default Checkbox;