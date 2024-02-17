import { ForwardedRef, forwardRef } from 'react'

interface DraggableVideoProps extends React.HTMLAttributes<HTMLLIElement> {
	img: string
	title: string
	index: number
}

const DraggableVideo = forwardRef(
	({ img, title, index, ...props }: DraggableVideoProps, ref: ForwardedRef<HTMLLIElement>) => {
		return (
			<li
				ref={ref}
				{...props}
				className='relative p-3 border dark:bg-neutral-800 dark:border-zinc-800 rounded-lg select-none'>
				<div className='flex gap-3'>
					<img src={img} alt='video preview' className='rounded-lg w-26 h-16' />
					<div className='relative w-full'>
						<h3 className='line-clamp-2'>{title}</h3>
						<p className='absolute bottom-0 right-0 text-sm dark:text-zinc-400'>{index + 1}</p>
					</div>
				</div>
			</li>
		)
	}
)

export { DraggableVideo }
