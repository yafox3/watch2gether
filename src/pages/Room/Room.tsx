import { RoomHeader } from '@/modules/room-header'
import { YoutubePlayer } from '@/modules/youtube-player'

const Room = () => {
	return (
		<div>
			<div className='mb-10'>
				<RoomHeader />
			</div>
			<div className='flex gap-10'>
				<div className='flex-[0_1_70%]'>
					<YoutubePlayer />
				</div>
			</div>
		</div>
	)
}

export { Room }

