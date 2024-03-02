import { usePlayerStore } from '@/store/player'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'

const YoutubePlayer = () => {
	const playerRef = useRef<ReactPlayer | null>(null)
	const { id: roomId } = useParams()
	const socket = useUserStore(state => state.socket)
	const videos = useRoomStore(state => state.videos)
	const { isPlaying, currentVideo, currentTime, setVideo, resetPlayer } = usePlayerStore()

	useEffect(() => {
		if (!playerRef.current) return

		playerRef.current.seekTo(currentTime)
	}, [currentTime])

	useEffect(() => {
		setVideo(videos[0])
	}, [videos])

	const handlePause = () => {
		const playerState = {
			currentTime: playerRef.current?.getCurrentTime(),
			currentVideo
		}

		socket?.send(`/app/video/${roomId}/pause`, {}, JSON.stringify(playerState))
	}

	const handlePlay = () => {
		const playerState = {
			currentTime: playerRef.current?.getCurrentTime(),
			currentVideo
		}

		socket?.send(`/app/video/${roomId}/resume`, {}, JSON.stringify(playerState))
	}

	const handleEnding = () => {
		socket?.send(`/app/room/${roomId}/video/remove`, {}, JSON.stringify(currentVideo))
		resetPlayer()
	}

	return (
		<div className='relative pt-[56.25%]'>
			<ReactPlayer
				ref={playerRef}
				controls
				url={currentVideo?.url}
				width={'100%'}
				height={'100%'}
				className='absolute top-0 left-0 bg-black'
				stopOnUnmount
				playing={isPlaying}
				onPlay={handlePlay}
				onPause={handlePause}
				onEnded={handleEnding}
			/>
			{!currentVideo && <h3 className='animate-pulse text-center'>Video not found</h3>}
		</div>
	)
}

export { YoutubePlayer }

