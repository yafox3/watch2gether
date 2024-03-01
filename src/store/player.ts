import { IVideo } from '@/models'
import { IMessage } from '@stomp/stompjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Actions {
	setVideo: (video: IVideo) => void
	receivePause: (message: IMessage) => void
	receivePlay: (message: IMessage) => void
	resetPlayer: () => void
}

interface PlayerState {
	currentVideo: IVideo | null
	currentTime: number
	isPlaying: boolean
}

const initialState: PlayerState = {
	currentTime: 0,
	currentVideo: null,
	isPlaying: false
}

export const usePlayerStore = create<PlayerState & Actions>()(
	immer(set => ({
		...initialState,
		setVideo(video) {
			set(state => {
				state.currentVideo = video
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
		},
		resetPlayer() {
			set(initialState)
		}
	}))
)
