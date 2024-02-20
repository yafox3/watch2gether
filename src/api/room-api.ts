import { axios } from '@/http'

export class RoomAPI {
	static async create(username: string): Promise<string> {
		const { data: roomId } = await axios.post(
			'room/create',
			{},
			{
				params: {
					username
				}
			}
		)

		return roomId
	}
}
