import { User } from '../typing';

export const fetchUser = async (username: string) => {
    const res = await fetch(`api/getUser?username=${username}`)
    const users: User[] = await res.json()
    
    return users
}