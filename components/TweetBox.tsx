import React, { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react'
import{
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon,
 } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typing'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
    const [tweet, setTweet] = useState<string>('')
    const { data: session } = useSession()
    const [image, setImage] = useState<string>('')
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [isImageBoxOpen, setIsImageBoxOpen] = useState<boolean>(false)

    const addImageToTweet = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        if (!imageInputRef.current?.value) return

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setIsImageBoxOpen(false)
    }
   
    const handleTweet = async () => {
        const tweetToSend: TweetBody = {
            text: tweet,
            username: session?.user?.name || 'Unknown',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image,
        }

        const res = await fetch(`/api/UploadTweet`, {
            body: JSON.stringify(tweetToSend),
            method: 'POST',
        })

        const json = await res.json()

        const newTweets = await fetchTweets()

        setTweets(newTweets)

        toast('Tweet sent!', {
            icon: "🚀",
        })

        return json
    }

   
    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        handleTweet()
        setTweet('')
        setImage('')
        setIsImageBoxOpen(false)
    }

  return (
    <div className='flex space-x-2 p-5'>
        <img className='h-14  w-14 object-cover mt-4 rounded-full' src={session?.user?.image || "https://links.papareact.com/gll"} alt="avatar" />
        <div className='flex flex-1 items-center pl-2'>
        <form className='flex flex-1 flex-col'>
            <input type="text" value={tweet} onChange={e => setTweet(e.target.value)} className='outline-none h-24 w-full bg-transparent text-xl placeholder:text-xl' placeholder="what's Happening?"/>
            <div className='flex  items-center '>
                <div className='flex flex-1 space-x-2 text-twitter'>
                    <PhotographIcon onClick={() => setIsImageBoxOpen(!isImageBoxOpen)} className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                    <SearchCircleIcon className="h-5 w-5" />
                    <EmojiHappyIcon className="h-5 w-5"/>
                    <CalendarIcon className="h-5 w-5"/>
                    <LocationMarkerIcon className="h-5 w-5"/>
                </div>
                <button onClick={handleSubmit}  disabled={!tweet || !session}  className='bg-twitter disabled:opacity-40 text-white px-5 py-2 font-bold rounded-full'>Tweet</button>
            </div>
            {isImageBoxOpen && (
                <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                    <input ref={imageInputRef}  type="text" className='text-white bg-transparent flex-1  p-2 outline-none placeholder:text-white' placeholder='Enter Image Url...'/>
                    <button type='submit' onClick={addImageToTweet} className='text-white font-bold'>Add Image</button>
                </form>
            )}
            {image && <img src={image} className='ml-0 mb-1 mt-10 h-40 rounded-xl object-contain ' alt="tweet image" />}
        </form>
        </div>
    </div>
  )
}

export default TweetBox