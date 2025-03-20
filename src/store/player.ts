import { IVideo } from '@/models'
import { CompatClient, IMessage } from '@stomp/stompjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Actions {
	setPlayer: (player: PlayerState) => void
	setVideo: (video: IVideo) => void
	receivePause: (message: IMessage) => void
	receivePlay: (message: IMessage) => void
	syncPlayerState: (socket: CompatClient, roomId: string) => void
	onProgress: (seconds: number) => void
	resetPlayer: () => void
}

export interface PlayerState {
	currentVideo: IVideo | null
	seekTime: number
	currentTime?: number
	isPlaying: boolean
}

const initialState: PlayerState = {
	seekTime: 0,
	currentTime: 0,
	currentVideo: null,
	isPlaying: true
}

export const usePlayerStore = create<PlayerState & Actions>()(
	immer(set => ({
		...initialState,
		setPlayer(player) {
			set(player)
		},
		setVideo(video) {
			set(state => {
				state.currentVideo = video
			})
		},
		receivePause(message) {
			const playerState = JSON.parse(message.body) as PlayerState
			set(state => {
				state.seekTime = playerState.seekTime
				state.currentVideo = playerState.currentVideo
				state.isPlaying = false
			})
		},
		receivePlay(message) {
			const playerState = JSON.parse(message.body) as PlayerState

			set(state => {
				state.seekTime = playerState.seekTime
				state.currentVideo = playerState.currentVideo
				state.isPlaying = true
			})
		},
		syncPlayerState(socket, roomId) {
			set(state => {
				const playerState = {
					currentTime: state.currentTime,
					currentVideo: state.currentVideo,
					isPlaying: state.isPlaying
				}
				socket.send(`/app/${roomId}/synchronizationResponse`, {}, JSON.stringify(playerState))
			})
		},
		onProgress(seconds) {
			set(state => {
				state.currentTime = seconds
			})
		},
		resetPlayer() {
			set(initialState)
		}
	}))
)
