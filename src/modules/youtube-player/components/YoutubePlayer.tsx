import { useRef } from 'react'
import ReactPlayer from 'react-player'

const YoutubePlayer = () => {
	const playerRef = useRef<ReactPlayer | null>(null)

	return (
		<div className='relative pt-[56.25%]'>
			<ReactPlayer
				ref={playerRef}
				controls
				url={'https://www.youtube.com/watch?v=O4SDx-aZY5U'}
				width={'100%'}
				height={'100%'}
				className='absolute top-0 left-0'
			/>
		</div>
	)
}

export { YoutubePlayer }

