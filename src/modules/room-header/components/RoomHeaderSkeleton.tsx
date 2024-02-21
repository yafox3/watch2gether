import { Skeleton } from '@/ui/skeleton'

const RoomHeaderSkeleton = () => {
	return (
		<div className='flex items-center justify-center h-20 py-4 gap-4'>
			<Skeleton className='absolute top-20 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800'></Skeleton>
			<Skeleton className='w-full md:w-1/3 h-12' />
		</div>
	)
}

export { RoomHeaderSkeleton }
