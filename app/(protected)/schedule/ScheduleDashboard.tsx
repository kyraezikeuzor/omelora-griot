'use client'
import React, {useState, useEffect} from 'react'
import getPosts from '@/lib/getPosts'
import PostTable from '@/app/(protected)/PostTable'
import { PostType } from '@/types'

export default function ScheduleDashboard() {

    const [posts, setPosts] = useState<PostType[]>([])

    useEffect(()=>{
        const handleGetPosts = async () => {
            const data = await getPosts();
            let postsForSchedulePage: PostType[] = []; // Ensure postForDesignPage is of type PostType[]

            postsForSchedulePage = data.filter(data => data.designed === true);

            setPosts(postsForSchedulePage)
        }

        handleGetPosts()
    },[])


    return (
        <main className='w-full flex flex-col'>
            <PostTable posts={posts}/>
        </main>
    )
}