import { IRoom } from '@/models'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Actions {
	setRoom: (room: RoomState) => void
}

interface RoomState extends IRoom {}

const initialState: RoomState = {
	roomId: '',
	users: [],
	videos: []
}

export const useRoomStore = create<RoomState & Actions>()(
	immer(set => ({
		...initialState,
		setRoom(room) {
			set(room)
		}
	}))
)
