import { axiosVK } from '@/http'
import { IVideo } from '@/models'
import axios from 'axios'
import pkceChallenge from 'pkce-challenge'

export class VKAPI {
	static generateRandomString = (length: number): string => {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let result = ''
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return result
	}

	static async getVideoById(oid: string, id: string): Promise<IVideo> {
		const response = await axiosVK.get('/video.get', {
			params: {
				videos: `${oid}_${id}`
			}
		})

		if (response.data.error) {
			throw new Error(response.data.error.error_msg)
		}

		const video = response.data.response.items[0]

		return {
			url: `https://vk.com/video${oid}_${id}`,
			title: video.title,
			img: video.image[1]?.url || '',
			platform: 'vk',
			oid,
			id
		}
	}

	static async login() {
		const pkce = await pkceChallenge()
		const requestBody = {
			response_type: 'code',
			client_id: import.meta.env.VITE_VK_CLIENT_ID,
			code_verifier: pkce.code_verifier,
			code_challenge: pkce.code_challenge,
			code_challenge_method: 'S256',
			redirect_uri: 'https://watch2gether.site/',
			state: this.generateRandomString(48),
			scope: 'video'
		}

		const queryString = new URLSearchParams(requestBody).toString()
		const authUrl = `https://id.vk.com/authorize?${queryString}`

		localStorage.setItem('code_verifier', requestBody.code_verifier)
		window.location.assign(authUrl)
	}

	static async exchangeCode() {
		const url = new URL(window.location.href)
		const searchParams = new URLSearchParams(url.search)
		const codeVerifier = localStorage.getItem('code_verifier')

		const params = {
			grant_type: 'authorization_code',
			code_verifier: codeVerifier,
			redirect_uri: 'https://watch2gether.site/',
			client_id: import.meta.env.VITE_VK_CLIENT_ID,
			device_id: searchParams.get('device_id'),
			state: this.generateRandomString(48)
		}

		const { data } = await axios.post(
			'https://id.vk.com/oauth2/auth',
			{ code: searchParams.get('code') },
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				params
			}
		)

		return data
	}

	static async getUser(idToken: string) {
		const { data } = await axios.post(
			'https://id.vk.com/oauth2/public_info',
			{
				id_token: idToken
			},
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				params: {
					client_id: import.meta.env.VITE_VK_CLIENT_ID
				}
			}
		)

		return data
	}
}
