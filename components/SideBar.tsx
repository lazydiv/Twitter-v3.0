import React, { useEffect, useState } from 'react'
import {
    BellIcon,
    HashtagIcon,
    HomeIcon,
    MailIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    UserIcon,
    BookmarkIcon,
    SunIcon,
    MoonIcon
} from '@heroicons/react/outline'
import SideBarItems from './SideBarItems'
import { signIn, signOut, useSession } from 'next-auth/react'
import { User, UserBody } from '../typing'
import { fetchUser } from '../utils/fetchuser'
import { useTheme } from 'next-themes'

function SideBar() {
  const { theme , setTheme } = useTheme()
  const { data: session, status } = useSession()
  const [ user , setUser ] = useState<User>({} as User)
  const [ isSignIn , setIsSignIn ] = useState<boolean>(false)
  const [isNotDesktop, setNotDesktop] = useState<boolean>(globalThis.innerWidth < 768);

  const updateMedia = () => {
    setNotDesktop(() => globalThis.innerWidth < 768);
  };
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => globalThis.removeEventListener("resize", updateMedia);
  });

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
  

  const handleSignin = async () => {
    await signIn()
    
  }

  const handleUser = async () => {
    const userToSend: UserBody = {
      username: session?.user?.name || 'Unknown',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      email: session?.user?.email || 'unKnown',
      blockUser: false,
      bio: 'No bio',
    }

    const res = await fetch(`/api/UploadUser`, {
        body: JSON.stringify(userToSend),
        method: 'POST',
    })
    const user: User = await res.json()
    console.log(user)
  }
  useEffect(() => {
    if (status === "authenticated") {
      handleUser()
      setIsSignIn(true)
    }
  }, [status])

  return (
    <div className='flex  md:col-span-2 md:justify-start bg-white dark:bg-[#0D1117] md:bg-transparent md:w-fit md:dark:bg-transparent md:border-t-0 md:relative md:items-start md:flex-col fixed bottom-0 z-50 w-full  items-center justify-evenly  border-t'>

        <img src="https://links.papareact.com/drq" className='md:m-3 md:mt-3  md:h-10 md:w-10 md:block hidden' alt=""/>
        
        <SideBarItems Icon={HomeIcon} title="Home"/>
        {isNotDesktop == false ? <SideBarItems Icon={HashtagIcon} title="Explore"/> : null}
        <SideBarItems Icon={BellIcon} title="Notifications"/>
        <SideBarItems Icon={MailIcon} title="Messages"/>
        {isNotDesktop == false ? <SideBarItems Icon={CollectionIcon} title="Lists" /> : null}
        {isNotDesktop == false  ? <SideBarItems Icon={BookmarkIcon} title="Bookmarks" /> : null}
        <SideBarItems onClick={session ? signOut : handleSignin} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'}/>
        <button onClick={handleThemeChange}>
            {
              theme === 'light' ? (
                <SideBarItems Icon={MoonIcon} title='Night'/>
                ) : (
                  <SideBarItems Icon={SunIcon} title='Morning'/>
              )
            }
        </button>
        <SideBarItems Icon={DotsCircleHorizontalIcon} title="more"/>

    </div>
  )
}

export default SideBar