import { IMessage } from '@stomp/stompjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Actions {
	setVideo: (url: string) => void
	receivePause: (message: IMessage) => void
	receivePlay: (message: IMessage) => void
}

interface PlayerState {
	currentVideo: string
	currentTime: number
	isPlaying: boolean
}

const initialState: PlayerState = {
	currentTime: 0,
	currentVideo: '',
	isPlaying: false
}

export const usePlayerStore = create<PlayerState & Actions>()(
	immer(set => ({
		...initialState,
		setVideo(url) {
			set(state => {
				state.currentVideo = url
			})
		},
		receivePause(message) {
			const playerState = JSON.parse(message.body) as PlayerState
			set(state => {
				state.currentTime = playerState.currentTime
				state.currentVideo = playerState.currentVideo
				state.isPlaying = false
			})
		},
		receivePlay(message) {
			const playerState = JSON.parse(message.body) as PlayerState
			set(state => {
				state.currentTime = playerState.currentTime
				state.currentVideo = playerState.currentVideo
				state.isPlaying = true
			})
		}
	}))
)
