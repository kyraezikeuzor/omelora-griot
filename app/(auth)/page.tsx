
import Image from "next/image";
import Generate from '@/components/Generate'
import {getPosts} from '@/lib/getPosts'
import Login from './Login'

export default async function Home() {

  const posts = await getPosts();

  if (!posts) {
      throw new Error("Failed to fetch posts")
  }

  console.log(posts)


  return (
    <section>
      <Login/>
    </section>

  );
}
