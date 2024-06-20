'use client'
import Link from 'next/link'
import Icon from '@/components/Icon'
import Checkbox from '@/components/events/Checkbox'
import updateTableRow from '@/lib/updateTableRow'

export default function PostPage({id,title,content,caption,sourceLinks,written,designed,posted}:{id:string,title:string,content:string,caption:string,sourceLinks:string[],written:boolean,designed:boolean,posted:boolean}) {
    return (
        <section className='flex flex-col gap-5 border-base rounded-lg p-5 lg:p-12 shadow-md'>
            <h1 className='font-semibold text-lg md:text-xl lg:text-2xl 2xl:text-3xl'>{title}</h1>
            <hr/>
            <div className='flex flex-col gap-1 text-sm'>
                <Checkbox 
                checked={written}
                onCheckOn={() => updateTableRow('Posts', { 'id': id }, { written_check: true })}
                onCheckOff={() => updateTableRow('Posts', { 'id': id }, { written_check: false })}
                >
                    Written
                </Checkbox>
                <Checkbox
                checked={designed}
                onCheckOn={() => updateTableRow('Posts', { 'id': id }, { designed_check: true })}
                onCheckOff={() => updateTableRow('Posts', { 'id': id }, { designed_check: false })}>
                    Designed
                </Checkbox>
                <Checkbox 
                checked={posted}
                onCheckOn={() => updateTableRow('Posts', { 'id': id }, { posted_check: true })}
                onCheckOff={() => updateTableRow('Posts', { 'id': id }, { posted_check: false })}
                >
                    Posted
                </Checkbox>
                
            </div>
            <hr/>
            <div className='flex flex-col gap-1 w-full text-sm'>
                {sourceLinks.map((item,index)=>(
                    <Link 
                    key={index}
                    className='whitespace-pre-wrap rounded-md bg-[--clr-grey-extralight] font-semibold px-4 py-2 hover:opacity-75' 
                    href={item}>
                        {item} <Icon icon='ExternalLink' size='xs' inline/>
                    </Link>
                ))}
            </div>
            <hr/>
            <p className='font-medium whitespace-pre-wrap text-sm'>{caption}</p>
            <hr/>
            <p className='font-medium whitespace-pre-wrap text-sm'>{content}</p>
        </section>
    )
}