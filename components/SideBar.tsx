import React from 'react'
import {
    BellIcon,
    HashtagIcon,
    HomeIcon,
    MailIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    UserIcon,
    BookmarkIcon,
} from '@heroicons/react/outline'
import SideBarItems from './SideBarItems'
import { signIn, signOut, useSession } from 'next-auth/react'
function SideBar() {
  const { data: session } = useSession()



  return (
    <div className='flex col-span-2 flex-col items-center px-4 md:items-start'>
        <img src="https://links.papareact.com/drq" className='m-3 h-10 w-10' alt=""/>
        <SideBarItems Icon={HomeIcon} title="Home"/>
        <SideBarItems Icon={HashtagIcon} title="Explore"/>
        <SideBarItems Icon={BellIcon} title="Notifications"/>
        <SideBarItems Icon={MailIcon} title="Messages"/>
        <SideBarItems Icon={CollectionIcon} title="Lists"/>
        <SideBarItems Icon={BookmarkIcon} title="Bookmarks"/>
        <SideBarItems onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'}/>
        <SideBarItems Icon={DotsCircleHorizontalIcon} title="more"/>
    </div>
  )
}

export default SideBar