import { axiosYT } from '@/http'
import { IVideo } from '@/models'

export class YoutubeAPI {
	static async getVideoById(id: string): Promise<IVideo> {
		const response = await axiosYT.get('/videos', {
			params: {
				id,
				part: 'snippet'
			}
		})

		return {
			url: 'https://www.youtube.com/watch?v=' + id,
			title: response.data.items[0].snippet.title,
			img: response.data.items[0].snippet.thumbnails.default.url
		}
	}
}
