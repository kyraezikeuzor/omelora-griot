import {Post} from '@/types'
import Link from 'next/link'
import Icon from '@/components/Icon'
import getPost from '@/lib/getPost'

interface Props {
  posts: Post[];
}

type PageParamsProps = {
  params: {postId: string}
}


export default async function PostPage({params}:PageParamsProps) {

  const data = await getPost(params.postId)
  const post = data[0]

  return (
      <div className='relative flex flex-col gap-3 p-3 border border-[--clr-grey-light] rounded-2xl'>
        <span className='font-semibold text-3xl'>{post.title}</span>
        <div className='flex flex-col gap-1'>
            <span className='text-sm'><span className='font-medium'>Post Date:</span> {post.postDate}</span>
            <span className='text-sm'><span className='font-medium'>Status:</span> {post.status}</span>
        </div>
        
        {post.caption.length !== 0 && <p className='whitespace-pre-wrap text-sm border border-[--clr-grey-light] rounded-xl py-1 px-2'>
            {post.caption}
        </p>}

        {post.tags.length != 0 && <ul className='flex flex-row gap-1 flex-wrap'>
            {post.tags.map((tag:string) => (
                <li className='text-xs font-semibold border border-[--clr-grey-light] rounded-2xl py-1 px-2 bg-[--clr-grey-extralight]' key={tag}>{tag}</li>
            ))}
        </ul>}

        <br/><br/>

        
    </div>
  );
}