import { Like } from './../../typing.d';
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import {sanityClient} from '../../sanity'



const userQuary = groq`
  *[_type == "users" == username == $]{
    _id,
    ...
  } | order(_createdAT desc)
`

type Data = Like[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {username} = req.query
    const likes: Like[] = await sanityClient.fetch(userQuary, {username})
  res.status(200).json(likes)
}
