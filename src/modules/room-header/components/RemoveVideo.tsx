import { FC } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { BsTrash3 } from 'react-icons/bs'

interface RemoveVideoProps {
	isActive: boolean
}

const RemoveVideo: FC<RemoveVideoProps> = ({isActive}) => {
	return (
		<Droppable droppableId='video-remove' direction='vertical'>
			{(provided, snapshot) => (
				<div
					className={'relative w-full h-24 border mt-4 rounded-lg transition-all'.concat(
						' ',
						snapshot.isDraggingOver
							? 'border-red-600 text-red-600'
							: 'border-dashed border-zinc-800 text-zinc-400'
					)}
					{...provided.droppableProps}
					ref={provided.innerRef}
					style={{
						opacity: isActive ? 1 : 0
					}}>
					<BsTrash3 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl' />
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}

export { RemoveVideo }

