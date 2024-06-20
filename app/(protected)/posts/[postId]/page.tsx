import React from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'
import {PostType} from '@/types'
import PostPage from './PostPage'
import getPost from '@/lib/getPost'

type PageParamsProps = {
    params: {postId: string}
}

const Page = async ({params}:PageParamsProps) => {

    const post = await getPost(params.postId)
    

    return (

        <section className='w-full flex flex-col gap-5 m-auto p-5 lg:px-[20vw]'>
            <Link href='/posts' className='font-medium text-[--clr-grey-dark]'>
               <Icon icon='ChevronLeft' className='inline fill-[--clr-grey-dark]' size='sm'/> Posts
            </Link>

            <PostPage
            id={post?.id}
            title={post?.title}
            content={post?.content}
            caption={post?.caption}
            sourceLinks={post?.sourceLinks}
            written={post?.written}
            designed={post?.designed}
            posted={post?.posted}
            />
        </section>

    )
}

export default Page;