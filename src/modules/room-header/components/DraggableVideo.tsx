import { IVideo } from '@/models'
import { Draggable } from 'react-beautiful-dnd'

interface DraggableVideoProps extends React.HTMLAttributes<HTMLLIElement> {
	video: IVideo
	index: number
}

const DraggableVideo = ({ video: { img, title, url }, index, ...props }: DraggableVideoProps) => {
	return (
		<Draggable draggableId={url} index={index}>
			{provided => (
				<li
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					{...props}
					className='relative flex max-h-24 h-24 border bg-white dark:bg-neutral-800 dark:border-zinc-800 rounded-lg select-none overflow-hidden'>
					<div className='relative h-full min-w-32 xs:min-w-40'>
						<img src={img} alt='video preview' className='absolute -top-4 left-0 h-32 min-h-full' />
					</div>
					<div className='p-3'>
						<h3 className='line-clamp-2 text-sm'>{title}</h3>
						<p className='absolute bottom-1 right-2 text-xs sm:text-sm dark:text-zinc-400'>
							{index + 1}
						</p>
					</div>
				</li>
			)}
		</Draggable>
	)
}

export { DraggableVideo }

