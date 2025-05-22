import { RoomAPI, VKAPI } from '@/api'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { Button, Input, Label, Loader, useToast } from '@/ui'
import { TokenResult } from '@vkid/sdk'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import vkLogo from '../assets/VK Logo White.svg'

const CreateRoom = () => {
	const usernameRef = useRef<HTMLInputElement | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const setUser = useUserStore(state => state.setUser)
	const joinUserToRoom = useRoomStore(state => state.joinUserToRoom)
	const routerNavigator = useNavigate()
	const { toast } = useToast()

	useEffect(() => {
		const url = new URL(window.location.href)
		const searchParams = new URLSearchParams(url.search)

		if (!searchParams.get('code')) return
		VKAPI.exchangeCode()
			.then(handleSuccessAuth)
			.catch(() => {
				toast({
					title: 'Ошибка авторизации',
					variant: 'destructive'
				})
			})
	}, [])

	const handleSuccessAuth = async (data: TokenResult) => {
		// cleaning url params
		routerNavigator('/')
		localStorage.setItem('access_token', data.access_token)

		const username = localStorage.getItem('username') || null

		if (username) {
			localStorage.removeItem('username')
			await createRoom(username, data.access_token)
		} else {
			const { user } = await VKAPI.getUser(data.id_token)
			const username = `${user.last_name}${user.first_name}`

			await createRoom(username, data.access_token)
		}
	}

	const createRoom = async (username: string, accessToken?: string) => {
		try {
			setIsLoading(true)
			const { data: roomId, socket } = await RoomAPI.create(username, accessToken ?? '')

			const user = {
				username,
				isOwner: true,
				socket
			}

			setUser(user)
			joinUserToRoom({ username: user.username, isOwner: user.isOwner })
			routerNavigator('/room/' + roomId)
		} catch (err) {
			console.log(err)
			toast({
				title: 'Что-то пошло не так',
				variant: 'destructive'
			})
		} finally {
			setIsLoading(false)
		}
	}

	const createRoomFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!(usernameRef.current && usernameRef.current.value.trim())) return

		const username = usernameRef.current.value.trim()

		await createRoom(username)
	}

	const onVKButtonClick = async () => {
		const username = usernameRef.current ? usernameRef.current.value.trim() : null
		if (username) localStorage.setItem('username', username)

		setIsLoading(true)
		await VKAPI.login()
	}

	return (
		<div className='max-w-96 mx-auto p-6 border border-zinc-800 rounded-lg'>
			<h2 className='text-2xl sm:text-3xl text-center mb-6'>Создание комнаты</h2>

			<form action='submit' onSubmit={createRoomFormHandler}>
				<Label htmlFor='username' className='block text-xs sm:text-base mb-2'>
					Имя пользователя
				</Label>
				<Input
					id='username'
					ref={usernameRef}
					placeholder='Введите свое имя'
					className='mb-8'
					disabled={isLoading}
				/>

				<Button className='block mx-auto mb-3 w-1/2' disabled={isLoading}>
					Создать
				</Button>
				<span className='block text-zinc-400 text-[10px] text-center mb-2'>
					Для просмотра ВК видео, необходима авторизация
				</span>
				<Button
					onClick={onVKButtonClick}
					disabled={isLoading}
					className='mx-auto mb-6 overflow-hidden flex items-center justify-center'
					variant={'vk'}>
					<img src={vkLogo} alt='VK logo' className='w-5 mr-3' /> Вход с VK ID
				</Button>
			</form>

			{isLoading && <Loader />}
		</div>
	)
}

export { CreateRoom }
