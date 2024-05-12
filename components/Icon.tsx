import React from 'react'
import {icons} from '@/utils/icons'

type IconD = typeof icons[number]['d'];

type IconProps = {
    icon: `${IconD}`,
    onClick?: any,
    className?: any,
    size?: 'sm' | 'lg'
    button?: true
}

const Icon = ({icon, onClick, className,size, button}: IconProps) => {

    const getIcon = () => {
        for (let i = 0; i < icons.length; i++) {
          if (icons[i].name == icon) {
            return icons[i].d;
          }
        }
        return "";
      };

    return (
        <svg 
        onClick={onClick}
        className={`${className} m-auto max-w-full ${button && 'p-[4px] rounded-full flex flex-col items-center hover:cursor-pointer hover:bg-[--clr-base-accent]  box-content'}`}  
        width={size === 'sm' ? '16' : size === 'lg' ? '38' : '24' } 
        height={size === 'sm' ? '16' : size === 'lg' ? '38' : '24' }  
        xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 24 24`}
        fill="none"
        >
            <path 
                className={`block m-auto`}
                fillRule="evenodd" 
                clipRule="evenodd" 
                d={getIcon()} 
            />
        </svg>
        
    )
}
export default Icon;