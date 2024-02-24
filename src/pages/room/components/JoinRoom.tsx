import { RoomAPI } from '@/api'
import { SubmitForm } from '@/components'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Loader,
	useToast
} from '@/ui'
import { useState } from 'react'
import { IoEnterOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { RoomSkeleton } from './RoomSkeleton'

const JoinRoom = () => {
	const { id: roomId } = useParams()
	const [username, setUsername] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const stateUsername = useUserStore(state => state.username)
	const setUser = useUserStore(state => state.setUser)
	const setRoom = useRoomStore(state => state.setRoom)

	const joinRoomHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!username.trim()) return

		try {
			setIsLoading(true)
			const { data: room, socket } = await RoomAPI.join(username, roomId!)

			const user = {
				username: username.trim(),
				isOwner: false,
				socket: socket
			}

			setUser(user)
			setRoom(room)
		} catch (err) {
			toast({
				title: 'Something went wrong',
				description: (err as Error).message,
				variant: 'destructive'
			})
		} finally {
			setIsLoading(false)
		}

		setUsername('')
	}

	return (
		<>
			<AlertDialog defaultOpen open={stateUsername === ''}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Welcome</AlertDialogTitle>
						<AlertDialogDescription>
							To join a room, you must be enter your username.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<SubmitForm
						icon={<IoEnterOutline />}
						onSubmit={joinRoomHandler}
						placeholder='Enter username'
						value={username}
						setValue={setUsername}
						isLoading={isLoading}
					/>

					<AlertDialogFooter></AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<RoomSkeleton />

			{isLoading && <Loader />}
		</>
	)
}

export { JoinRoom }
