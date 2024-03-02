import { useRoomStore } from '@/store/room'
import { useUserStore } from '@/store/user'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { DraggableVideo } from './DraggableVideo'

const YoutubePlaylist = () => {
	const { id: roomId } = useParams()
	const videos = useRoomStore(state => state.videos)
	const socket = useUserStore(state => state.socket)

	const handleOnDragEnd = (result: DropResult) => {
		if (!result.destination || !socket) return

		const reorderedVideos = Array.from(videos)
		const [reorderedItem] = reorderedVideos.splice(result.source.index, 1)
		reorderedVideos.splice(result.destination.index, 0, reorderedItem)

		socket.send(`/app/room/${roomId}/video/update`, {}, JSON.stringify(reorderedVideos))
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId='videos'>
				{provided => (
					<ul
						className='videos flex flex-col gap-2'
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{videos.map(({ url, title, img }, index) => (
							<Draggable key={url} draggableId={url} index={index}>
								{provided => (
									<DraggableVideo
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										title={title}
										img={img}
										index={index}
									/>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export { YoutubePlaylist }

