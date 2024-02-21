import { IUser } from './user'

export interface IRoom {
	roomId: string
	users: IUser[]
	videos: string[]
}
