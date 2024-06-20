
import Image from "next/image";
import Login from './Login'

export default async function Home() {

  return (
    <section className='p-5 lg:px-[35vw] 2xl:px-[40vw]'>
      <Login/>
    </section>

  );
}
