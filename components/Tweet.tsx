import { Comment, CommentBody, Tweet } from '../typing'
import TimeAgo from 'react-timeago'
import{
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon,
  } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'


interface Props {
    tweet: Tweet
}




function TweetComponent({ tweet }: Props) {
    const [comments , setComments] = useState<Comment[]>([])
    const { data: session } = useSession()
    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const commentTextInput = useRef<HTMLInputElement>(null)
    const reloadComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }
    useEffect(() => {
        reloadComments()
    }, [])
    
    const hanleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const commentTOSent: CommentBody = {
            comment: comment,
            username: session?.user?.name || 'Unknown',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            tweetId: tweet._id,
        }
        const res = await fetch(`/api/UploadComment`, {
            body: JSON.stringify(commentTOSent),
            method: 'POST',
        })
        reloadComments()
        setComment('')
        setIsCommentBoxOpen(false)
        toast('Comment Posted!', {
            icon: "🚀",
        })
    }
    
  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
        <div className='flex space-x-3'>
            <img className='h-10 w-10 rounded-full object-cover' src={tweet.profileImg} alt="" />
            <div>
                <div className='flex items-center space-x-1'>
                    <p className='mr-1 font-bold'>{tweet.username}</p>
                    <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet.username.replace(/\s+/g, '').toLowerCase()}</p>

                    <TimeAgo 
                        className="text-sm text-gray-500"
                        date={tweet._createdAt} />
                </div>
                <p className="pt-1">{tweet.text}</p>
                {
                    tweet.image && <img className='ml-0 mb-1 m-5 max-h-60 rounded-lg shadow-sm  object-cover' src={tweet.image} alt="" />
                }
            </div>
        </div>
        <div className='flex justify-between  space-x-3 mt-4'>
            <div onClick={() => session && setIsCommentBoxOpen(!isCommentBoxOpen)} className='flex cursor-pointer items-center space-x-2 text-gray-400'>
                <ChatAlt2Icon className='h-5 w-5 text-gray-500' />
                <p className=''>{comments.length}</p>
            </div>
            <div>
                <HeartIcon className='h-5 w-5 text-gray-500' />
            </div>
            <div>
                <SwitchHorizontalIcon className='h-5 w-5 text-gray-500' />
            </div>
            <div>
                <UploadIcon className='h-5 w-5 text-gray-500' />
            </div>
        </div>
            {comments?.length > 0 && (
                <div className='my-2 mt-5  max-h-44 overflow-y-scroll scrollbar-hide  border-t border-gray-100'>
                    {comments.map(comment => (
                        <div key={comment._id} className='relative flex mt-5 space-x-2'>
                            <hr className='border-x absolute left-5 top-10 h-8' />
                            <img src={comment.profileImg} className='mt-2 h-7 w-7 rounded-full object-cover '/>
                            <div>
                                <div className='flex space-x-1 items-center'>
                                    <p className='mr-1 font-bold'>{comment.username}</p>
                                    <p className='text-gray-500 hidden md:inline text-sm'>@{comment.username.replace(/\s+/g, '').toLowerCase()}</p>
                                    <TimeAgo
                                        className="text-sm text-gray-500"
                                        date={comment._createdAt} />
                                </div>
                            <p className=''>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isCommentBoxOpen && (
                <form onSubmit={hanleCommentSubmit} className='mt-3 flex  space-x-3'>
                    <input value={comment} onChange={(e) => setComment(e.target.value)} ref={commentTextInput} type="text" className='outline-none rounded-full flex-1 bg-gray-100 text-black p-3' placeholder='Write a comment...'/>
                    <button  type='submit' disabled={!comment} className='bg-transparent disabled:opacity-50 px-1 font-bold rounded-full text-twitter'>Post</button>
                </form>
            )}
    </div>
  )
}

export default TweetComponent