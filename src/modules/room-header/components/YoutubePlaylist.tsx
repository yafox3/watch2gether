import { IVideo } from '@/models'
import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { useToast } from '@/ui'
import { useState } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { isArraysEqual } from '../utils/is-arrays-equal'
import { DraggableVideo } from './DraggableVideo'
import { RemoveVideo } from './RemoveVideo'

const YoutubePlaylist = () => {
	const { id: roomId } = useParams()
	const [draggedItem, setDraggedItem] = useState<string | null>(null)
	const { toast } = useToast()
	const videos = useRoomStore(state => state.videos)
	const socket = useUserStore(state => state.socket)

	const handleOnDragEnd = (result: DropResult) => {
		setDraggedItem(null)

		if (!result.destination || !socket) return

		if (result.destination?.droppableId === 'video-remove') {
			return handleVideoRemove(videos[result.source.index])
		}

		const reorderedVideos = Array.from(videos)
		const [reorderedItem] = reorderedVideos.splice(result.source.index, 1)
		reorderedVideos.splice(result.destination.index, 0, reorderedItem)

		// sent update request only if playlist has been reordered
		!isArraysEqual(reorderedVideos, videos) &&
			socket.send(`/app/room/${roomId}/playlist/update`, {}, JSON.stringify(reorderedVideos))
	}

	const handleVideoRemove = (video: IVideo) => {
		socket?.send(`/app/room/${roomId}/playlist/remove`, {}, JSON.stringify(video))
		toast({
			title: 'Успех',
			description: 'Видео удалено из плейлиста'
		})
	}

	return (
		<DragDropContext
			onDragEnd={handleOnDragEnd}
			onDragStart={({ draggableId }) => setDraggedItem(draggableId)}>
			<Droppable droppableId='videos' direction='vertical'>
				{provided => (
					<ul className='flex flex-col gap-2' {...provided.droppableProps} ref={provided.innerRef}>
						{videos.map((video, index) => (
							<DraggableVideo key={video.url} video={video} index={index} />
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>

			<RemoveVideo isActive={!!draggedItem} />
		</DragDropContext>
	)
}

export { YoutubePlaylist }

