import { SVGProps } from 'react'

interface SideBarIconsProps {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title?: string
    onClick?: () => {}
    hidden?: boolean
}


function SideBarItems({Icon, title, onClick}: SideBarIconsProps) {
  return (
  
    <div onClick={() => onClick?.()}  className='flex  md:m-0 md:mx-1 mx-1 m-1  max-w-fit items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group'>
        <Icon className='h-6 w-6'/>
        <p className=' text-base font-light md:text-xl hidden md:inline-flex group-hover:text-twitter'>{title}</p>
    </div>
  )
}

export default SideBarItems