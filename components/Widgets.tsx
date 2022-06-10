import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
function Widgets() {
  return (
    <div className='px-2 col-span-2 mt-2 hidden lg:inline '>
        <div className='flex items-center space-x-2 p-3 rounded-full mt-2 bg-gray-100'>
            <SearchIcon className='h-5 w-5 text-gray-500'/>
            <input type="text" className='bg-transparent flex-1 outline-none' placeholder='Search Twitter' />
        </div>
        <div>
        <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"

        options={{height: 1000}}
        />
        </div>
    </div>
  )
}

export default Widgets