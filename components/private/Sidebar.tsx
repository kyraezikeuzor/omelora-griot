import Link from "next/link";
import React from "react";
import Logo from '@/components/Logo'
import Icon from '@/components/Icon'
import Modal from '@/components/Modal'
import ProfileIcon from './ProfileIcon'



export default function Sidebar() {

  return (
  <>
    <div className='hidden z-[100] h-full fixed lg:flex'>
      <SidebarComponent/>
    </div>
    <div className='flex lg:hidden'>
      <SidebarComponentMobile/>
    </div>
  </>
);
}

export function SidebarComponent() {


  return (
    
    <div className="w-[4vw] h-full min-h-screen flex flex-col gap-10 items-center justify-between
        bg-[--clr-base] border-r border-[--clr-grey-light] shadow-md">

      <div className='w-full flex flex-col gap-5 px-1'>
        
        <Link href='/' className='flex flex-col items-center'>
          <span className='w-fit p-2 border-2 border-[--clr-grey-light] rounded-lg'>
            <Icon icon="House"/>
          </span>
        </Link>

        <div className="flex flex-col items-center w-full gap-2 text-base font-medium border-t border-[--clr-grey-light]">
          <br/>

          <Link href="/home" className='hover:bg-[--clr-base-accent] p-2 rounded-lg'>
            <span>
              <Icon icon="House" />
            </span>
          </Link>

          <Link href="/home" className='hover:bg-[--clr-base-accent] p-2 rounded-lg'>
            <span>
              <Icon icon="House"/>
            </span>
          </Link>

          <Link href="/posts" className='hover:bg-[--clr-base-accent] p-2 rounded-lg'>
            <span>
              <Icon icon="Bell"/>
            </span>
          </Link>
          {/*<hr className='w-full h-[2px] self-center bg-[--clr-grey-base]'/>*/}
        </div> 
      </div>

      <div className='flex flex-col items-center'>
        <ProfileIcon size='lg'/>
      </div>

    </div>

    )
}

export function SidebarComponentMobile() {

  return (

      <Modal 
      modalClassName='z-50 p-5 w-[250px] h-[500px] absolute left-2 top-10 right-2'
      toggleElement={<Icon icon='HamburgerMenu' size='lg' className='fixed top-1 z-50 px-8 py-2 w-fit h-fit flex flex-col items-center cursor-pointer'/>}
      >

        <div className='flex flex-col gap-10'>
          <div className='relative w-full gap-16 flex flex-row items-center justify-between'>
            <Logo path='/dashboard' className='w-6'/>
            <div 
            className='hidden md:flex flex-col items-center cursor-pointer'>
              <Icon icon="HamburgerMenu"/>
            </div>
          </div>

          <div className="flex flex-col items-start w-full gap-5 text-base font-medium text-lg">
            <Link href="/home" >
              <span className='flex flex-row gap-3'>
                <Icon icon="HamburgerMenu"/>
                <span>
                  Home
                </span>
              </span>
            </Link>

            <Link href="/posts" >
              <span className='flex flex-row gap-3'>
                <Icon icon="HamburgerMenu"/>
                <span>
                  Posts
                </span>
              </span>
            </Link>

          </div>
        </div>

      </Modal>

  )
}

