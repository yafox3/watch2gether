import { useState } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

const YoutubePlaylist = () => {
	const [videos, setVideos] = useState([
		{
			id: '1',
			title: 'Участвую в Codeforces Round 925 (Div. 3) + разбор всех задач!		',
			url: 'https://www.youtube.com/watch?v=video1',
			img: 'https://i.ytimg.com/vi/wCRk9kGgRjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCNffCX5yAP5aosAek0axXruOvotg'
		},
		{
			id: '2',
			title: 'Я Исполнил Мечту и Устроился в Google',
			url: 'https://www.youtube.com/watch?v=video2',
			img: 'https://i.ytimg.com/an_webp/YSLVnWnROss/mqdefault_6s.webp?du=3000&sqp=CLXqtq4G&rs=AOn4CLDgmdYiwRNJ5NTu3dzuAurxruYkvg'
		},
		{
			id: '3',
			title: 'Секреты успешного трудоустройства в АйТи, которые тебе не расскажут',
			url: 'https://www.youtube.com/watch?v=video2',
			img: 'https://i.ytimg.com/an_webp/YSLVnWnROss/mqdefault_6s.webp?du=3000&sqp=CLXqtq4G&rs=AOn4CLDgmdYiwRNJ5NTu3dzuAurxruYkvg'
		},
		{
			id: '4',
			title: 'Я Исполнил Мечту и Устроился в Google',
			url: 'https://www.youtube.com/watch?v=video2',
			img: 'https://i.ytimg.com/an_webp/YSLVnWnROss/mqdefault_6s.webp?du=3000&sqp=CLXqtq4G&rs=AOn4CLDgmdYiwRNJ5NTu3dzuAurxruYkvg'
		},
	])

	const handleOnDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const items = Array.from(videos)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		setVideos(items)
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId='videos'>
				{provided => (
					<ul
						className='videos flex flex-col gap-2'
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{videos.map(({ id, title, img }, index) => (
							<Draggable key={id} draggableId={id} index={index}>
								{provided => (
									<li
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className='p-3 border dark:border-zinc-800 rounded-lg'>
										<div className='flex gap-3'>
											<img src={img} alt='video preview' className='rounded-lg w-24 h-16' />
											<div className='relative w-full'>
												<h3 className='line-clamp-2'>{title}</h3>
												<p className='absolute bottom-0 right-0 text-sm dark:text-zinc-400'>{index + 1}</p>
											</div>
										</div>
									</li>
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

