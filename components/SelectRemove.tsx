'use client'
import React, {useState, useEffect} from 'react'
import Icon from './Icon'

type SelectProps = {
    children: React.ReactNode;
    onSelectOn?: any;
    onSelectOff?:any;
}

const Select = ({children, onSelectOn, onSelectOff}: SelectProps) => {

    // Page mount state
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

    const handleClick = () => {
      if (!isRefreshing) {
        setClick(!click);
      }
    }

    useEffect(()=>{
      if (isRefreshing == false && click == true) {
        //onSelectOff() // Dont change state when the page refreshes
        console.log('dsafkhdas')
      }
    })

    return (
      <div className={`relative flex flex-row items-center  w-full py-1 px-3 rounded-md bg-[--clr-grey-extralight]`}>
        {children}
        <Icon icon="X" size='sm' onClick={() => handleClick()} className='absolute right-3 cursor-pointer' />
      </div>
    )
}

export default Select;