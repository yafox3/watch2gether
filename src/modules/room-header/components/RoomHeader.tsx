import { AddVideoForm } from './AddVideoForm'
import { InviteFriends } from './InviteFriends'
import { PlaylistEditor } from './PlaylistEditor'

const RoomHeader = () => {
	return (
		<header className='flex items-center justify-between h-20 py-4 gap-4'>
			<div className='absolute top-20 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800'></div>
			<PlaylistEditor />
			<div className='w-full md:w-1/3'>
				<AddVideoForm />
			</div>
			<InviteFriends />
		</header>
	)
}

export { RoomHeader }

