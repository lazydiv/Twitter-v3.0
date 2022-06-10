

export interface Tweet extends TweetBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _type: 'tweet'
    _rev: string
    _blockTweet: boolean
}

export type TweetBody = {
    profileImg: string,
    text: string,
    username: string,
    image?: string,
}

export type CommentBody = {
    comment: string,
    username: string,
    profileImg: string,
    tweetId: string
}

export interface Comment extends CommentBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _type: 'comment'
    _rev: string
    tweet: {
        _ref: string
        _type: 'reference'
    }
}


