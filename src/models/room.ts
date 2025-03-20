import { IUser } from './user'
import { IVideo } from './video'

export interface IRoom {
	roomId: string
	users: IUser[]
	videos: IVideo[]
	hostUsername: string
	accessToken?: string
}
