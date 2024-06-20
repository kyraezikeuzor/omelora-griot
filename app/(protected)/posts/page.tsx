
import {PostType} from '@/types'
import getPosts from '@/lib/getPosts';
import PostTable from '@/app/(protected)/PostTable'
import PostsDashboard from './PostsDashboard'

interface Props {
  posts: PostType[];
}
export default async function Home({  }:{}) {

  const posts = await getPosts()


  return (
    <section className='w-full flex flex-col'>
      <PostsDashboard/>
    </section>
  );
}

