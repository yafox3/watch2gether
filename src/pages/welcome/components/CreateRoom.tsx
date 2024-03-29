import { RoomAPI } from '@/api'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { Button, Input, Label, Loader, useToast } from '@/ui'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateRoom = () => {
	const usernameRef = useRef<HTMLInputElement | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const setUser = useUserStore(state => state.setUser)
	const joinUserToRoom = useRoomStore(state => state.joinUserToRoom)
	const routerNavigator = useNavigate()
	const { toast } = useToast()

	const createRoomHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!(usernameRef.current && usernameRef.current.value.trim())) return

		const username = usernameRef.current.value.trim()

		try {
			setIsLoading(true)
			const { data: roomId, socket } = await RoomAPI.create(username)

			const user = {
				username,
				isOwner: true,
				socket
			}

			setUser(user)
			joinUserToRoom({ username: user.username, isOwner: user.isOwner })
			routerNavigator('/room/' + roomId)
		} catch (err) {
			toast({
				title: 'Something went wrong',
				variant: 'destructive'
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='max-w-96 mx-auto p-6 border border-zinc-800 rounded-lg'>
			<h2 className='text-2xl sm:text-3xl text-center mb-6'>Create room</h2>

			<form action='submit' onSubmit={createRoomHandler}>
				<Label htmlFor='username' className='block text-xs sm:text-base mb-2'>
					Username
				</Label>
				<Input
					id='username'
					ref={usernameRef}
					placeholder='Enter your username'
					className='mb-8'
					disabled={isLoading}
				/>

				<Button className='block mx-auto mb-6 w-1/2' disabled={isLoading}>
					Create
				</Button>
			</form>

			{isLoading && <Loader />}
		</div>
	)
}

export { CreateRoom }
