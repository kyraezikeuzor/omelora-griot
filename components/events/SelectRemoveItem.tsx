'use client'
import React, {useState, useEffect} from 'react'
import Icon from '../Icon'

type SelectProps = {
    children: React.ReactNode;
    item:any;
    onSelectOff?:(item: any) => void;
}

const Select = ({children, item, onSelectOff}: SelectProps) => {

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const [click, setClick] = useState(false)

    useEffect(() => {
        const handleBeforeUnload = (event:any) => {
          // Check if the event's type is "beforeunload"
          if (event.type === 'beforeunload') { 
            // Page is refreshing
            console.log('Page is refreshing');
            setIsRefreshing(true);
          }
        };
        
        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        // Cleanup: remove event listener
        return () => { 
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      });

    useEffect(()=>{
      if (isRefreshing == false && click == true) {
        if (onSelectOff) {
          onSelectOff(item)
        }
      }
    },[click,isRefreshing])

    const handleClick = () => {
      setClick(!click)
    }

    return (
      <div className={`relative flex flex-row items-center font-medium w-full rounded-xl bg-[--clr-grey-extralight]`}>
        {children}

        <div onClick={handleClick} className='flex flex-col items-center absolute top-2 right-2 bg-[--clr-grey-light] rounded-full p-1 cursor-pointer'>
            <Icon icon='X' size='xs' fillColor='var(--clr-grey-dark)' />
        </div>
      </div>
    )
}

export default Select;