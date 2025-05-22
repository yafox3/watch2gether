import { usePlayerStore } from '@/store/player'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { useParams } from 'react-router-dom'

const YoutubePlayer = () => {
	const playerRef = useRef<ReactPlayer | null>(null)
	const { id: roomId } = useParams()
	const socket = useUserStore(state => state.socket)
	const videos = useRoomStore(state => state.videos)
	const { isPlaying, currentVideo, seekTime, currentTime, setVideo, resetPlayer, onProgress } =
		usePlayerStore()

	useEffect(() => {
		if (!playerRef.current) return

		playerRef.current.seekTo(seekTime)
	}, [seekTime])

	useEffect(() => {
		setVideo(videos[0])
	}, [videos])

	const handlePause = () => {
		const playerState = {
			seekTime: playerRef.current?.getCurrentTime(),
			currentVideo
		}

		socket?.send(`/app/video/${roomId}/pause`, {}, JSON.stringify(playerState))
	}

	const handlePlay = () => {
		const playerState = {
			seekTime: playerRef.current?.getCurrentTime(),
			currentVideo
		}

		socket?.send(`/app/video/${roomId}/resume`, {}, JSON.stringify(playerState))
	}

	const handleEnding = () => {
		socket?.send(`/app/room/${roomId}/playlist/remove`, {}, JSON.stringify(currentVideo))
		resetPlayer()
	}

	return (
		<div className='relative pt-[56.25%] rounded-xl overflow-hidden'>
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
				onReady={() => playerRef.current?.seekTo(currentTime ?? seekTime)}
				onProgress={(state: OnProgressProps) => onProgress(state.playedSeconds)}
			/>
			{!currentVideo && <h3 className='animate-pulse text-center'>Видео не найдено</h3>}
		</div>
	)
}

export { YoutubePlayer }

