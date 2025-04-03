import { Skeleton } from '@/ui/skeleton'

const YoutubePlayerSkeleton = () => {
	return (
		<div className='relative pt-[56.25%]'>
			<Skeleton className='absolute top-0 left-0 w-full h-full' />
		</div>
	)
}

export { YoutubePlayerSkeleton }

