import { IUser } from '@/models'
import { CompatClient } from '@stomp/stompjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Actions {
	setUser: (user: UserState) => void
	resetUser: () => void
}

interface UserState extends IUser {
	socket: CompatClient | null
}

const initialState: UserState = {
	username: '',
	isOwner: false,
	socket: null
}

export const useUserStore = create<UserState & Actions>()(
	immer(set => ({
		...initialState,
		setUser: (user: UserState) => set(user),
		resetUser: () => set(initialState)
	}))
)
