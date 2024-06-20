'use client'
import React, {useState, useEffect} from 'react'
import getPosts from '@/lib/getPosts'
import PostTable from '@/app/(protected)/PostTable'
import { PostType } from '@/types'

export default function PostsDashboard() {

    const [posts, setPosts] = useState<PostType[]>([])

    useEffect(()=>{
        const handleGetPosts = async () => {
            const data = await getPosts();
            setPosts(data)
        }

        handleGetPosts()
    },[])


    return (
        <main className='w-full flex flex-col'>
            <PostTable posts={posts}/>
        </main>
    )
}