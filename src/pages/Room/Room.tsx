import { Chat } from '@/modules/chat'
import { RoomHeader } from '@/modules/room-header'
import { UsersRow } from '@/modules/users-row'
import { YoutubePlayer } from '@/modules/youtube-player'

const Room = () => {
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

