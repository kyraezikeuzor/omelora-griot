import Sidebar from "@/components/private/Sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PrivateNavbar from '@/components/private/PrivateNavbar'

export default async function RootLayout({ children }:{children:React.ReactNode}) {
    
      //added to remove those warnings its a temporary fix
  const conWarn = console.warn
  const conLog = console.log
  
  const IGNORE_WARNINGS = [
    'Using supabase.auth.getSession() is potentially insecure',
    'Using the user object as returned from supabase.auth.getSession()',
  ]
  
  console.warn = function (...args) {
    const match = args.find((arg) =>
      typeof arg === 'string' ? IGNORE_WARNINGS.find((warning) => arg.includes(warning)) : false,
    )
    if (!match) {
      conWarn(...args)
    }
  }
  
  console.log = function (...args) {
    const match = args.find((arg) =>
      typeof arg === 'string' ? IGNORE_WARNINGS.find((warning) => arg.includes(warning)) : false,
    )
    if (!match) {
      conLog(...args)
    }
  }
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/");
    }
    
    return (
    <section className='relative w-full min-h-screen flex flex-row lg:gap-10'>
             
      <Sidebar/>
      
      <section className='flex flex-col w-full bg-red-'>
        <PrivateNavbar/>
        <section className='flex flex-col items-center min-h-screen py-[2vh] lg:mr-[1vw] lg:ml-[3vw] 2xl:mr-[2vw] 2xl:ml-[6vw]'>
            {children}
        </section>
      </section>

    </section>
    )
}