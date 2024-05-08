import { GetStaticProps } from 'next';
import {getPosts} from '@/lib/getPosts'
import {Post} from '@/types';


export default function PostDatabase({posts}:{posts:Post[]}) {
    return (
        <section>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.postedDate}</p>
                    <ul>
                        {post.tags.map((tag:string) => (
                        <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                    <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}