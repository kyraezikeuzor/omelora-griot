import React from 'react'
import {icons} from '@/assets/icons'

type IconD = typeof icons[number]['d'];

type IconProps = {
    icon: `${IconD}`,
    onClick?: any,
    className?: any,
    size?: 'xs' | 'sm' | 'lg',
    fillColor?: string,
    inline?: boolean,
    button?: boolean
}

const Icon = ({icon, onClick, className, size, fillColor, inline, button}: IconProps) => {

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
        className={`${className} m-auto max-w-full ${size === 'xs' ? 'w-[16px] lg:w-[18px]' : size === 'sm' ? 'w-[22px] lg:w-[24px]' : size === 'lg' ? 'w-[38px] lg:w-[40px]' : 'w-[24px] lg:w-[28px]'}  ${button && 'p-[4px] rounded-full flex flex-col items-center hover:cursor-pointer hover:bg-[--clr-base-accent]  box-content'}`}  
        style={{fill:fillColor, display:`${inline == true ? 'inline' : ''}`}}
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