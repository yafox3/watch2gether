import { VKAPI, YoutubeAPI } from '@/api'
import { IVideo } from '@/models'
import { getVKVideoParams } from './get-vk-id'
import { getYoutubeId } from './get-youtube-id'

export const fetchVideoData = async (url: string): Promise<IVideo> => {
	if (url.includes('youtube.com') || url.includes('youtu.be')) {
		// YouTube
		const videoId = getYoutubeId(url)
		return YoutubeAPI.getVideoById(videoId)
	} else if (url.includes('vkvideo.ru')) {
		// VK
		const vkParams = getVKVideoParams(url)
		
		if (!vkParams) {
			throw new Error('Invalid VK video URL')
		}

		return VKAPI.getVideoById(vkParams.oid, vkParams.id)
	} else {
		throw new Error('Unsupported video platform')
	}
}
