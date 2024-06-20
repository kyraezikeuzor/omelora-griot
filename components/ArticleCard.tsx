import Link from 'next/link'
import {ArticleType} from '@/types';
import Icon from './Icon'


export default function ArticleComponent({link,title,source,date,snippet,thumbnail}:ArticleType) {
    return (
        <div className='relative w-full h-full flex flex-col gap-5 text-xs p-3 border-base bg-[--clr-base] rounded-lg '>
            
            <div className='flex flex-col lg:flex-row items-center gap-3 py-4'>
                <img src={thumbnail} className='hidden lg:flex lg:w-1/3 lg:h-auto rounded-md'/>
                
                <div className='w-full lg:w-2/3 flex flex-col justify-between gap-2'>
                    <span className='font-semibold text-sm'>
                        <Link className='hover:text-[--clr-grey-dark] underline decoration-[1px]' target='_blank' href={link}>
                            {title}
                        </Link>
                    </span>
                    <span>
                        {snippet}
                    </span>
                </div>
            </div>  

            <span className='absolute top-1 left-2 text-xs font-semibold '>
                <span className='font-medium'>Date:</span> {date}
            </span>
            <span className='absolute bottom-1 right-2 text-xs font-semibold '>
                <span className='font-medium'>By:</span> {source}
            </span>
        </div>
    )
}