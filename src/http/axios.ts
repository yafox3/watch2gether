import axios from 'axios'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

export const instanceYT = axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3'
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
