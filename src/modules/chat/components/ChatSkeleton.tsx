import { Skeleton } from '@/ui/skeleton'

const ChatSkeleton = () => {
	return (
		<Skeleton className='max-h-96 min-h-60 lg:min-h-full lg:min-w-full lg:max-h-[580px] lg:h-[36vw] flex flex-col justify-end p-2 border dark:border-zinc-800 rounded-lg'>
			<Skeleton className='mb-2 overflow-y-auto'></Skeleton>
		</Skeleton>
	)
}

export { ChatSkeleton }
