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

function SideBar() {
  const { data: session, status } = useSession()
  const [ theme , setTheme ] =  useState<string>('light')
  const [ user , setUser ] = useState<User>({} as User)
  const [ isSignIn , setIsSignIn ] = useState<boolean>(false)
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    console.log(localTheme)
  }, [theme])
  

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
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
    <div className='flex col-span-1 md:col-span-2 flex-col items-center  '>
        <img src="https://links.papareact.com/drq" className='m-3 mt-5 md:m-3 md:mt-3 h-7 md:h-10 md:w-10' alt=""/>
        
        <SideBarItems Icon={HomeIcon} title="Home"/>
        <SideBarItems Icon={HashtagIcon} title="Explore"/>
        <SideBarItems Icon={BellIcon} title="Notifications"/>
        <SideBarItems Icon={MailIcon} title="Messages"/>
        <SideBarItems Icon={CollectionIcon} title="Lists"/>
        <SideBarItems Icon={BookmarkIcon} title="Bookmarks"/>
        <SideBarItems onClick={session ? signOut : handleSignin} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'}/>
        <SideBarItems Icon={DotsCircleHorizontalIcon} title="more"/>
        <button onClick={handleThemeChange}>
            {
              theme === 'light' ? (
                <SideBarItems Icon={MoonIcon} title='Night'/>
                ) : (
                  <SideBarItems Icon={SunIcon} title='Morning'/>
              )
            }
        </button>
    </div>
  )
}

export default SideBar