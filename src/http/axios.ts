import { Axios } from 'axios'

export const instance = new Axios({
	baseURL: import.meta.env.VITE_API_URL,
})

