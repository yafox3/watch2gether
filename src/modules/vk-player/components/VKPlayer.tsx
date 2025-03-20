import { usePlayerStore } from '@/store/player'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { useCallback, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

const VKPlayer = () => {
	const playerRef = useRef<VK.VideoPlayer | null>(null)
	const iframeRef = useRef<HTMLIFrameElement | null>(null)
	const { id: roomId } = useParams()
	const socket = useUserStore(state => state.socket)
	const videos = useRoomStore(state => state.videos)
	const { currentVideo, seekTime, setVideo, resetPlayer, onProgress, isPlaying } = usePlayerStore()

	useEffect(() => {
		if (iframeRef.current && !playerRef.current) {
			playerRef.current = VK.VideoPlayer(iframeRef.current)
			playerRef.current.on('inited', subscribeToPlayerEvents)
		}

		return () => playerRef.current?.destroy()
	}, [])

	useEffect(() => {
		if (!playerRef.current) return
		playerRef.current.seek(seekTime)
	}, [seekTime])

	useEffect(() => {
		if (isPlaying) {
			playerRef.current?.play()
		} else {
			playerRef.current?.pause()
		}
	}, [isPlaying])

	useEffect(() => {
		setVideo(videos[0])
	}, [videos])

	const handleTimeUpdate = useCallback(() => {
		const newCurrentTime = playerRef.current?.getCurrentTime() ?? 0
		const currentTime = usePlayerStore.getState().currentTime // Получаем актуальное значение из хранилища
		const latency = newCurrentTime - currentTime!

		if (Math.abs(latency) > 3) {
			const playerState = {
				seekTime: newCurrentTime,
				currentVideo
			}
			console.log(playerState)
			console.log(latency)
			console.log(currentTime)
			socket?.send(`/app/video/${roomId}/pause`, {}, JSON.stringify(playerState))
		}

		onProgress(newCurrentTime) // Обновляем состояние в хранилище
	}, [currentVideo, roomId, socket, onProgress])

	const subscribeToPlayerEvents = () => {
		playerRef.current?.on('resumed', handlePlay)
		playerRef.current?.on('paused', handlePause)
		playerRef.current?.on('ended', handleEnding)
		playerRef.current?.on('timeupdate', handleTimeUpdate)
	}

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
		<div className='relative min-h-full rounded-xl overflow-hidden'>
			{currentVideo?.platform === 'vk' && (
				<iframe
					src={`https://vk.com/video_ext.php?oid=${currentVideo.oid}&id=${currentVideo.id}&hd=2&js_api=1`}
					className='block min-h-full'
					width='100%'
					height='520px'
					allow='autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;'
					ref={iframeRef}
					id='player'
				/>
			)}
			{!currentVideo && <div className='w-full h-full absolute top-0 left-0 bg-black'></div>}
		</div>
	)
}

export { VKPlayer }

