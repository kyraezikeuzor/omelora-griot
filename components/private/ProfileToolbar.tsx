import React from "react";
import getSessionUser from "@/lib/getSessionUser";
import Modal from '@/components/Modal'
import Avatar from '@/components/private/Avatar'
import LogOutButton from './LogOutButton'

type ProfileIconProps = {
    size?: 'sm' | 'lg' | 'xl',
}

export default async function ProfileIcon({size}:ProfileIconProps) {
  
  const data = await getSessionUser()
  const userId = data?.id ? data?.id : ''
  
  return (

    <Modal 
    className='z-50 py-2 w-[250px] h-fit absolute left-2 bottom-12 right-2'
    modalTrigger={<Avatar size={size} profileId={userId}/>}
    >
        <div className='w-full h-full flex flex-col gap-3 justify-between'>
          <div >
            My Profile
            <br/>
            Settings
          </div>

          <hr className='bg-[--clr-grey-base] h-[1px]'/>

          <div>
            Help desk
          </div>

          <hr className='bg-[--clr-grey-base] h-[1px]'/>

          <div >
            <LogOutButton/>
          </div>
        </div>
    </Modal>
  );
}
