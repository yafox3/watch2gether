import { Skeleton } from '@/ui/skeleton'

const YoutubePlayerSkeleton = () => {
	return (
		<Skeleton className='relative pt-[56.25%]'>
			<Skeleton className='absolute top-0 left-0 w-full h-full' />
		</Skeleton>
	)
}

export { YoutubePlayerSkeleton }

