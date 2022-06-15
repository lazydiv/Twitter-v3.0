import { Like } from "../typing"

export const fetchLikes = async (tweetId: string) => {
    const res = await fetch(`api/getLikes?tweetId=${tweetId}`)

    const likes: Like[] = await res.json()

    return likes
}