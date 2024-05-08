import React from "react";
import { getProfileData } from "@/lib/getSessionProfile";
import Modal from '@/components/Modal'
import ProfilePicture from '@/components/ProfilePicture'
import LogOut from './LogOut'

type ProfileIconProps = {
    size?: 'sm' | 'lg' | 'xl',
}

export default async function ProfileIcon({size}:ProfileIconProps) {
  
  const data = await getProfileData()
  
  return (

    <Modal 
    modalClassName='z-50 py-2 w-[250px] h-fit absolute left-2 bottom-12 right-2'
    toggleElement={<ProfilePicture size={size} profileId={data?.user_id}/>}
    >
        <div className='w-full h-full flex flex-col gap-3 justify-between'>
          <div >
            My Profile
            <br/>
            My Courses
            <br/>
            Settings
          </div>

          <hr className='bg-[--clr-grey-base] h-[1px]'/>

          <div>
            Help desk
          </div>

          <hr className='bg-[--clr-grey-base] h-[1px]'/>

          <div >
            <LogOut/>
          </div>
        </div>

    </Modal>
  );
}
