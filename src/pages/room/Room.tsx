import { Chat } from '@/modules/chat'
import { RoomHeader } from '@/modules/room-header'
import { UsersRow } from '@/modules/users-row'
import { YoutubePlayer } from '@/modules/youtube-player'
import { useChatStore } from '@/store/chat'
import { useUserStore } from '@/store/user'
import { useToast } from '@/ui'
import { CompatClient } from '@stomp/stompjs'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { JoinRoom } from './components/JoinRoom'

const Room = () => {
	const { toast } = useToast()
	const { id: roomId } = useParams()
	const username = useUserStore(state => state.username)
	const socket = useUserStore(state => state.socket)
	const resetUser = useUserStore(state => state.resetUser)
	const receiveMessage = useChatStore(state => state.receiveMessage)
	const resetChat = useChatStore(state => state.resetChat)

	useEffect(() => {
		if (!socket) return

		handleSocketJoin(socket)

		return () => {
			socket.deactivate()
			resetUser()
			resetChat()
		}
	}, [socket])

	if (!username) {
		return <JoinRoom />
	}

	const handleSocketJoin = async (socket: CompatClient) => {
		socket.connect({}, handleSocketConnect, onSocketError)
	}
	
	const handleSocketConnect = () => {
		if (!socket) return

		socket?.subscribe(`/topic/${roomId}/chat`, receiveMessage)

		socket.activate()
		toast({
			title: 'Success',
			description: 'Welcome to the room'
		})
	}

	const onSocketError = () => {
		toast({
			title: 'Something went wrong',
			description: 'Restart page and try again'
		})

		socket?.deactivate()
	}

	return (
		<>
			<div className='mb-10'>
				<RoomHeader />
			</div>
			<div className='flex flex-col md:gap-3 lg:flex-row lg:gap-5 mb-10'>
				<div className='mb-5 md:flex-[1_0_50%] lg:flex-[1_0_70%]'>
					<YoutubePlayer />
				</div>

				<h3 className='lg:hidden block text-xl lg:text-3xl dark:text-neutral-300 mb-1'>Chat</h3>
				<div className='lg:flex-[0_0_30%]'>
					<Chat />
				</div>
			</div>
			<div className='mb-10'>
				<UsersRow />
			</div>
		</>
	)
}

export { Room }

