import { axios } from '@/http'
import { IRoom } from '@/models'
import { CompatClient, Stomp } from '@stomp/stompjs'

interface JoinRoomResponse {
	room: IRoom
	socket: CompatClient
}

interface CreateRoomResponse {
	roomId: string
	socket: CompatClient
}

export class RoomAPI {
	static async create(username: string): Promise<CreateRoomResponse> {
		const { data: roomId } = await axios.post(
			'room/create',
			{},
			{
				params: {
					username: username.trim()
				}
			}
		)

		return { roomId, socket: this.getSocket() }
	}

	static async join(username: string, roomId: string): Promise<JoinRoomResponse> {
		const { data } = await axios.post<IRoom>(
			`room/${roomId}/join`,
			{},
			{
				params: {
					username: username.trim()
				}
			}
		)

		return {
			socket: this.getSocket(),
			room: data
		}
	}

	static getSocket(): CompatClient {
		const socket: WebSocket = new SockJS(import.meta.env.VITE_API_URL + 'ws')
		const stompClient = Stomp.over(socket)

		stompClient.debug = () => {}
		stompClient.reconnectDelay = 1000
		return stompClient
	}
}
