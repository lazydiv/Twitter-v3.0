import { Like } from './../../typing.d';
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import {sanityClient} from '../../sanity'



const likeQuery = groq`
  *[_type == "like" && references(*[_type == "tweet" && _id == $tweetId]._id)]{
    _id,
    ...
  } | order(_createdAT desc)
`

type Data = Like[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {tweetId} = req.query
    const likes: Like[] = await sanityClient.fetch(likeQuery, {tweetId})
  res.status(200).json(likes)
}
