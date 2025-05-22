import { useRoomStore } from '@/store/room'
import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/ui'
import { LuListOrdered } from 'react-icons/lu'
import { YoutubePlaylist } from './YoutubePlaylist'

const PlaylistEditor = () => {
	const videos = useRoomStore(state => state.videos)

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'link'} size={'icon'}>
					<LuListOrdered className='cursor-pointer text-3xl' />
				</Button>
			</SheetTrigger>
			<SheetContent
				side={'left'}
				className='bg-neutral-50 dark:bg-neutral-900 dark:border-zinc-800 min-w-full sm:min-w-[30%] overflow-auto'>
				<SheetHeader className='mb-6'>
					<SheetTitle>Редактирование плейлиста</SheetTitle>
					<SheetDescription>Измените порядок или удалите видео из списка</SheetDescription>
				</SheetHeader>

				{videos.length ? <YoutubePlaylist /> : <p>Видео не найдены...</p>}
			</SheetContent>
		</Sheet>
	)
}

export { PlaylistEditor }

