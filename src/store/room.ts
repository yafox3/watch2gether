import { IRoom, IUser } from '@/models'
import { IMessage } from '@stomp/stompjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { UserState } from './user'

interface Actions {
	setRoom: (room: RoomState) => void
	receiveUserJoin: (message: IMessage) => void
	joinUserToRoom: (user: IUser) => void
	leaveUserFromRoom: (user: UserState) => void
	receiveUserLeave: (message: IMessage) => void
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
		leaveUserFromRoom({ socket, username }) {
			const message = {
				username: 'System',
				message: `${username} left the room`
			}
			set(state => {
				socket?.send(`/app/room/${state.roomId}/leave`, {}, username)
				socket?.send(`/app/video/${state.roomId}/chat`, {}, JSON.stringify(message))

				socket?.deactivate()
			})
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
		resetRoom: () => set(initialState)
	}))
)
