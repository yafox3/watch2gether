import { usePlayerStore } from '@/store/player'
import { useUserStore } from '@/store/user'
import { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'

const YoutubePlayer = () => {
	const playerRef = useRef<ReactPlayer | null>(null)
	const { id: roomId } = useParams()
	const socket = useUserStore(state => state.socket)
	const isPlaying = usePlayerStore(state => state.isPlaying)
	const currentVideo = usePlayerStore(state => state.currentVideo)
	const currentTime = usePlayerStore(state => state.currentTime)

	useEffect(() => {
		if (!playerRef.current) return

		playerRef.current.seekTo(currentTime)
	}, [currentTime])

	const handlePause = () => {
		const playerState = {
			currentTime: playerRef.current?.getCurrentTime(),
			isPlaying,
			currentVideo
		}

		socket?.send(`/app/video/${roomId}/pause`, {}, JSON.stringify(playerState))
	}

	const handlePlay = () => {
		const playerState = {
			currentTime: playerRef.current?.getCurrentTime(),
			isPlaying,
			currentVideo
		}

		socket?.send(`/app/video/${roomId}/resume`, {}, JSON.stringify(playerState))
	}

	return (
		<div className='relative pt-[56.25%]'>
			<ReactPlayer
				ref={playerRef}
				controls
				url={currentVideo}
				width={'100%'}
				height={'100%'}
				className='absolute top-0 left-0 bg-black'
				stopOnUnmount
				playing={isPlaying}
				onPlay={handlePlay}
				onPause={handlePause}
			/>
			{!currentVideo && <h3 className='animate-pulse text-center'>Video not found</h3>}
		</div>
	)
}

export { YoutubePlayer }

