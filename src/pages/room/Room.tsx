import { Chat } from '@/modules/chat'
import { RoomHeader } from '@/modules/room-header'
import { UsersRow } from '@/modules/users-row'
import { VKPlayer } from '@/modules/vk-player'
import { YoutubePlayer } from '@/modules/youtube-player'
import { useChatStore } from '@/store/chat'
import { usePlayerStore } from '@/store/player'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { useToast } from '@/ui'
import { CompatClient, IMessage } from '@stomp/stompjs'
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
		receiveVideoRemove,
		receiveVideoReorder
	} = useRoomStore()
	const { resetChat, receiveMessage } = useChatStore()
	const { receivePause, receivePlay, resetPlayer, syncPlayerState, currentVideo } = usePlayerStore()

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

		// chat subscribes
		socket?.subscribe(`/topic/chat/${roomId}`, receiveMessage)
		// room subscribes
		socket?.subscribe(`/topic/room/${roomId}/join`, receiveUserJoin)
		socket?.subscribe(`/topic/room/${roomId}/leave`, receiveUserLeave)
		socket?.subscribe(`/topic/room/${roomId}/playlist/add`, receiveVideoAdd)
		socket?.subscribe(`/topic/room/${roomId}/playlist/remove`, receiveVideoRemove)
		socket?.subscribe(`/topic/room/${roomId}/playlist/update`, (message: IMessage) => {
			resetPlayer()
			receiveVideoReorder(message)
		})
		isOwner &&
			socket?.subscribe(`/topic/room/${roomId}/synchronization`, () =>
				syncPlayerState(socket, roomId!)
			)
		// player subscribes
		socket?.subscribe(`/topic/video/${roomId}/pause`, receivePause)
		socket?.subscribe(`/topic/video/${roomId}/resume`, receivePlay)

		const message = {
			username: username,
			message: `User joined the room`
		}

		socket?.send(`/app/chat/${roomId}`, {}, JSON.stringify(message))

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

	const renderVideoPlayer = () => {
		switch (currentVideo?.platform) {
			case 'vk':
				return <VKPlayer />
			case 'youtube':
				return <YoutubePlayer />
			default:
				return <YoutubePlayer />
		}
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
				<div className='mb-5 md:flex-[1_0_50%] lg:flex-[1_0_70%]'>{renderVideoPlayer()}</div>

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
