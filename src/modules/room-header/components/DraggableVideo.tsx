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
				className='relative flex max-h-24 h-24 border bg-white dark:bg-neutral-800 dark:border-zinc-800 rounded-lg select-none overflow-hidden'>
				<div className='relative h-full min-w-32 xs:min-w-40'>
					<img src={img} alt='video preview' className='absolute -top-4 left-0 h-32 min-h-full' />
				</div>
				<div className='flex p-3'>
					<h3 className='line-clamp-2 text-sm'>{title}</h3>
					<p className='absolute bottom-1 right-2 text-xs sm:text-sm dark:text-zinc-400'>{index + 1}</p>
				</div>
			</li>
		)
	}
)

export { DraggableVideo }

