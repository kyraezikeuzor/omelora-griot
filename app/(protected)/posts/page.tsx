
import { getPosts } from '@/lib/getPosts';

interface Post {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}
interface Props {
  posts: Post[];
}
export default async function Home({  }:{}) {

  const posts = await getPosts()

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
  );
}