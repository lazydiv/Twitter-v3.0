export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'username',
        title: 'username',
        type: 'string',
      },
      {
        name:'blockUser',
        title:'Block user',
        description:'ADMIN Controls:Toggle if User is inappropriate',
        type:'boolean',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'profileImg',
        title: 'Profile Image',
        type: 'string',
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
      },
      {
        name: 'tweets',
        title: 'Tweets',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'tweet' }],
          },
        ],
      },
      {
        name: 'following',
        title: 'Following',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
      },
      {
        name: 'followers',
        title: 'Followers',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
      },
    ],}