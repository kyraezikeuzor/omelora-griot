import React from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'
import {Post} from '@/types'
import PostPage from './PostPage'

type PageParamsProps = {
    params: {postId: string}
}

const Page = ({params}:PageParamsProps) => {

    return (

        <section className='flex flex-col gap-5 py-[2vh]'>
            <Link href='/posts' className='font-medium text-[--clr-grey-dark]'>
               <Icon icon='ChevronLeft' className='inline fill-[--clr-grey-dark]' size='sm'/> Posts
            </Link>
            <PostPage params={params}/>
        </section>

    )
}

export default Page;