import {Post} from '@/types'
import Link from 'next/link'
import Icon from '@/components/Icon'


export default async function Home({id,title,status,postDate,tags,content,caption,designLink,createdBy}:Post) {

  return (
      <div className='relative flex flex-col gap-3 p-3 border border-[--clr-grey-light] rounded-2xl'>
        <span className='font-medium text-base'>{title}</span>
        <div className='flex flex-col gap-1'>
            <span className='text-sm'><span className='font-medium'>Post Date:</span> {postDate}</span>
            <span className='text-sm'><span className='font-medium'>Status:</span> {status}</span>
        </div>
        
        {caption.length !== 0 && <p className='whitespace-pre-wrap text-sm border border-[--clr-grey-light] rounded-xl py-1 px-2'>
            {caption}
        </p>}

        {tags.length != 0 && <ul className='flex flex-row gap-1 flex-wrap'>
            {tags.map((tag:string,index:number) => (
                <li key={index} className='text-xs font-semibold border border-[--clr-grey-light] rounded-2xl py-1 px-2 bg-[--clr-grey-extralight]' >{tag}</li>
            ))}
        </ul>}

        <br/><br/>

        <Link href={`posts/${id}`}>
          <span className='absolute bottom-3 right-3 left-3 text-sm font-semibold text-center border border-[--clr-grey-light] hover:bg-[--clr-grey-extralight] cursor-pointer rounded-xl py-2 px-2 '>
              View Content <Icon icon='ArrowTopRight' className='inline' size='sm'/>
          </span>
        </Link>
    </div>
  );
}