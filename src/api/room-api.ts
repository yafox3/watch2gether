import { axios } from '@/http'
import { IRoom } from '@/models'
import { PlayerState } from '@/store/player'
import { CompatClient, Stomp } from '@stomp/stompjs'

interface RoomResponse<T> {
	status: number
	data: T
	socket: CompatClient
}

interface JoinResponse {
	room: IRoom
	playerState: PlayerState
}

export class RoomAPI {
	static async create(username: string): Promise<RoomResponse<string>> {
		const response = await axios.post(
			'room/create',
			{},
			{
				params: {
					username: username.trim()
				}
			}
		)

		const data = {
			data: response.data,
			status: response.status,
			socket: this.getSocket()
		}

		return data
	}

	static async join(username: string, roomId: string): Promise<RoomResponse<JoinResponse>> {
		const response = await axios.post(
			`room/${roomId}/join`,
			{},
			{
				params: {
					username: username.trim()
				}
			}
		)
		
		const data = {
			data: response.data,
			status: response.status,
			socket: this.getSocket()
		}

		return data
	}

	static getSocket(): CompatClient {
		// @ts-expect-error SockJS cannot be typed via cdn
		const socket: WebSocket = new SockJS(import.meta.env.VITE_API_URL + 'ws')
		const stompClient = Stomp.over(socket)

		stompClient.debug = () => {}
		stompClient.reconnectDelay = 1000
		return stompClient
	}
}
