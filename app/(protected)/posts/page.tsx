
import getPosts from '@/lib/getPosts';
import {Post} from '@/types'
import PostCard from './PostCard'

interface Props {
  posts: Post[];
}
export default async function Home({  }:{}) {

  const posts:Post[] = await getPosts()

  return (
    <section>
      <div className='flex flex-col gap-3 md:grid md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 '>
          {posts.map((item,index) => (
              <PostCard
              key={index}
              id={item.id}
              title={item.title}
              status={item.status}
              postDate={item.postDate}
              tags={item.tags}
              content={item.content}
              caption={item.caption}
              designLink={item.designLink}
              createdBy={item.createdBy}
              />
          ))}
      </div>
    </section>
  );
}