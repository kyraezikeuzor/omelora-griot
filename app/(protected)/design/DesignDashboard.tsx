'use client'
import React, {useState, useEffect} from 'react'
import getPosts from '@/lib/getPosts'
import PostTable from '@/app/(protected)/PostTable'
import { PostType } from '@/types'

export default function DesignDashboard() {

    const [posts, setPosts] = useState<PostType[]>([])

    useEffect(()=>{
        const handleGetPosts = async () => {
            const data = await getPosts();
            let postsForDesignPage: PostType[] = []; // Ensure postForDesignPage is of type PostType[]
            
            postsForDesignPage = data.filter(data => data.designed === false);
            
            setPosts(postsForDesignPage)
        }

        handleGetPosts()
    },[])


    return (
        <main className='w-full flex flex-col'>
            <PostTable posts={posts}/>
        </main>
    )
}

