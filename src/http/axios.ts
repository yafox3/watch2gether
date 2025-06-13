import axios from 'axios'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

export const instanceYT = axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3'
})

export const instanceVK = axios.create({
	baseURL: import.meta.env.VITE_API_URL + 'api/vk'
})

instanceYT.interceptors.request.use(config => {
	return {
		...config,
		params: {
			...config.params,
			key: import.meta.env.VITE_GOOGLE_API_KEY
		}
	}
})

instanceVK.interceptors.request.use(config => {
	const accessToken = localStorage.getItem('access_token') || ''

	return {
		...config,
		params: {
			...config.params,
			v: '5.199',
			access_token: accessToken
		}
	}
})
