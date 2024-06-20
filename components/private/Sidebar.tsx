import Link from "next/link";
import React from "react";
import Logo from '@/components/Logo'
import Icon from '@/components/Icon'
import Modal from '@/components/Modal'
import ProfileIcon from './ProfileToolbar'
import Tooltip from '@/components/dialog/Tooltip'

export default function Sidebar() {

  return (
  <>
    <div className='hidden lg:flex flex-col z-[100] h-full fixed'>
      <SidebarComponent/>
    </div>
    <div className='flex flex-col lg:hidden'>
      <SidebarComponentMobile/>
    </div>
  </>
);
}

export function SidebarComponent() {


  return (
    <div className="w-[4vw] h-full min-h-screen flex flex-col gap-10 items-center justify-between
        bg-[--clr-base] border-r border-[--clr-grey-light] shadow-md">

      <div className='w-full flex flex-col gap-[9px] px-1 '>
        <Link href='/' className='flex flex-col items-center mt-3'>
          <span className='w-fit p-2 border-2 border-[--clr-grey-light] rounded-lg'>
            <Icon icon="House" size='sm' />
          </span>
        </Link>
        <div className="flex flex-col items-center w-full gap-2 text-base font-medium border-t border-[--clr-grey-light]">
          <br/>
          <Tooltip tooltipContent='Generate Post'>
            <Link href="/generate" className={`hover:bg-[--clr-grey-extralight] p-2 rounded-lg`}>
              <span>
                <Icon icon="LightningBolt" size='sm'/>
              </span>
            </Link>
          </Tooltip>
          <Tooltip tooltipContent='Design Post'>
            <Link href="/design" className={`hover:bg-[--clr-grey-extralight] p-2 rounded-lg`}>
              <span>
                <Icon icon="Image" size='sm'/>
              </span>
            </Link>
          </Tooltip>
          <Tooltip tooltipContent='Schedule Post'>
            <Link href="/schedule" className={`hover:bg-[--clr-grey-extralight] p-2 rounded-lg`}>
              <span>
                <Icon icon="Calendar" size='sm'/>
              </span>
            </Link>
          </Tooltip>
        </div> 
      </div>
      <div className='fixed bottom-3 flex flex-col items-center'>
        <ProfileIcon size='lg'/>
      </div>
    </div>
    )
}

export function SidebarComponentMobile() {

  return (

      <Modal 
      className='z-50 p-5 w-[250px] h-[500px] absolute left-2 top-10 right-2'
      modalTrigger={<Icon icon='HamburgerMenu' fillColor='white' className='fixed top-3 z-50 ml-10 py-2 cursor-pointer'/>}
      >
        <div className='flex flex-col gap-10'>
          <div className='relative w-full gap-16 flex flex-row items-center justify-between'>
            <Logo path='/dashboard' className='w-6'/>
          </div>
          <div className="flex flex-col items-start w-full gap-5 text-base font-medium">
            <Link href="/generate" >
              <span className='flex flex-row gap-3'>
                <Icon icon="LightningBolt"/>
                <span>
                  Generate
                </span>
              </span>
            </Link>
            <Link href="/design" >
              <span className='flex flex-row gap-3'>
                <Icon icon="Image"/>
                <span>
                  Design
                </span>
              </span>
            </Link>
            <Link href="/design" >
              <span className='flex flex-row gap-3'>
                <Icon icon="Image"/>
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

