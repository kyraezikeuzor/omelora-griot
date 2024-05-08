import Link from 'next/link'
import {Article} from '@/types';
import Icon from './Icon'

type ArticleComponentProps = {
    position:number,
    link:string,
    title:string,
    source:string,
    date:string,
    snippet:string,
    thumbnail:string
}

export default function ArticleComponent({position,link,title,source,date,snippet,thumbnail}:ArticleComponentProps) {
    return (
        <div className='w-full flex flex-col gap-5 rounded-lg p-5 bg-[--clr-base] border-[--clr-grey-base]'>
            <div className='flex flex-col gap-1 text-xs'>
                <div className='flex flex-row gap-2'>
                    <img src={thumbnail} className='w-20 h-20'/>
                    <div className='flex flex-col gap-1'>
                        <span><span className='font-medium'>Title:</span> {title}</span>
                        <span><span className='font-medium'>Company:</span> {source}</span>
                    </div>
                </div>
                <span><span className='font-medium'>Date:</span> {date}</span>
                <span><span className='font-medium'>Snippet:</span> {snippet}</span>
                <span><span className='font-medium'>Link: </span> <Link target='_blank' href={link}><Icon icon='Location' className='inline ' size='sm'/></Link></span>
            </div>
        </div>
    )
}