import { IRoom, IUser, IVideo } from '@/models'
import { IMessage } from '@stomp/stompjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { UserState } from './user'

interface Actions {
	setRoom: (room: RoomState) => void
	receiveUserJoin: (message: IMessage) => void
	joinUserToRoom: (user: IUser) => void
	leaveUserFromRoom: (user: UserState, roomId: string) => void
	receiveUserLeave: (message: IMessage) => void
	receiveVideoAdd: (message: IMessage) => void
	receiveVideoRemove: (message: IMessage) => void
	receiveVideoReorder: (message: IMessage) => void
	resetRoom: () => void
}

interface RoomState extends IRoom {}

const initialState: RoomState = {
	roomId: '',
	users: [],
	videos: [],
	hostUsername: ''
}

export const useRoomStore = create<RoomState & Actions>()(
	immer(set => ({
		...initialState,
		setRoom(room) {
			set(room)
		},
		joinUserToRoom(user) {
			set(state => {
				state.users.push(user)
			})
		},
		leaveUserFromRoom({ socket, username }, roomId) {
			const message = {
				username,
				message: `User left the room`
			}

			socket?.send(`/app/chat/${roomId}`, {}, JSON.stringify(message))
			socket?.send(`/app/room/${roomId}/leave`, {}, username)
		},
		receiveUserJoin(message) {
			const user = JSON.parse(message.body)

			set(state => {
				state.users.push(user)
			})
		},
		receiveUserLeave(message) {
			const username = message.body

			set(state => {
				state.users = state.users.filter(user => user.username !== username)
			})
		},
		receiveVideoAdd(message) {
			const newVideo = JSON.parse(message.body) as IVideo

			set(state => {
				const isVideoExist = state.videos.some(video => video.url === newVideo.url)

				!isVideoExist && state.videos.push(newVideo)
			})
		},
		receiveVideoRemove(message) {
			const removableVideo = JSON.parse(message.body) as IVideo

			set(state => {
				state.videos = state.videos.filter(video => video.url !== removableVideo.url)
			})
		},
		receiveVideoReorder(message) {
			const reorderedVideos = JSON.parse(message.body) as IVideo[]

			set(state => {
				state.videos = reorderedVideos
			})
		},
		resetRoom: () => set(initialState)
	}))
)
