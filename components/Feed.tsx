import React, { useState } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import TweetBox from './TweetBox'
import { Tweet } from './../typing'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'


interface Props {
  tweets: Tweet[]
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  
  
  const handelRefresh = async () => {
    const refreshToast = toast.loading('Refreshing Feed...')
    const tweets = await fetchTweets()
    setTweets(tweets)
    console.log(tweets)
    toast.success('Feed refreshed!', {
      id: refreshToast,
    })
  }

  return (
    <div className='col-span-7 overflow-scroll dark:text-green-500 max-h-screen scrollbar-hide lg:col-span-5 border-x'>
        <div className='flex items-center justify-between '>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon onClick={handelRefresh} className='h-8 w-8  cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125'/>
        </div>
        
        <div>
            <TweetBox setTweets={setTweets}/>
        </div>
        <div>
            {tweets.map(tweet => <TweetComponent key={tweet._id} tweet={tweet} />)}
        </div>
    </div>
  )
}

export default Feed

