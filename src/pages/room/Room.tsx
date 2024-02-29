import { Chat } from '@/modules/chat'
import { RoomHeader } from '@/modules/room-header'
import { UsersRow } from '@/modules/users-row'
import { YoutubePlayer } from '@/modules/youtube-player'
import { useChatStore } from '@/store/chat'
import { usePlayerStore } from '@/store/player'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { useToast } from '@/ui'
import { CompatClient } from '@stomp/stompjs'
import { useCallback, useEffect } from 'react'
import { useBeforeUnload, useParams } from 'react-router-dom'
import { JoinRoom } from './components/JoinRoom'

const Room = () => {
	const { toast } = useToast()
	const { id: roomId } = useParams()

	const { username, isOwner, socket, resetUser } = useUserStore()
	const {
		leaveUserFromRoom,
		receiveUserJoin,
		receiveUserLeave,
		resetRoom,
		receiveVideoAdd,
		receiveVideoRemove
	} = useRoomStore()
	const { resetChat, receiveMessage } = useChatStore()
	const { receivePause, receivePlay, resetPlayer } = usePlayerStore()

	const handleLeave = useCallback(async () => {
		leaveUserFromRoom({ username, isOwner, socket }, roomId!)

		await socket?.deactivate()
		resetUser()
		resetChat()
		resetRoom()
		resetPlayer()
	}, [username, socket, isOwner, roomId])

	// notify users when leaving the application
	useBeforeUnload(handleLeave)

	useEffect(() => {
		if (!socket) return
		handleSocketJoin(socket)

		return () => {
			// notify users when leaving the room
			handleLeave()
		}
	}, [socket])

	const handleSocketJoin = async (socket: CompatClient) => {
		socket.connect({}, onSocketConnect, onSocketError)
	}

	const onSocketConnect = () => {
		if (!socket) return

		// chat subscribe
		socket?.subscribe(`/topic/${roomId}/chat`, receiveMessage)
		// room subscribe
		socket?.subscribe(`/topic/${roomId}/join`, receiveUserJoin)
		socket?.subscribe(`/topic/${roomId}/leave`, receiveUserLeave)
		socket?.subscribe(`/topic/${roomId}/video/add`, receiveVideoAdd)
		socket?.subscribe(`/topic/${roomId}/video/remove`, receiveVideoRemove)
		// player subscribes
		socket?.subscribe(`/topic/${roomId}/pause`, receivePause)
		socket?.subscribe(`/topic/${roomId}/resume`, receivePlay)

		const message = {
			username: 'System',
			message: `${username} joined the room`
		}

		socket?.send(`/app/video/${roomId}/chat`, {}, JSON.stringify(message))

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

	if (!username) {
		return <JoinRoom />
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

