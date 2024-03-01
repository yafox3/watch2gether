import { IUser } from './user'
import { IVideo } from './youtube'

export interface IRoom {
	roomId: string
	users: IUser[]
	videos: IVideo[]
	hostUsername: string
}
