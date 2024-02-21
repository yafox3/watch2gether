import { Skeleton } from '@/ui/skeleton'

const UsersRowSkeleton = () => {
	return (
		<Skeleton className='w-full grid grid-rows-1 grid-cols-2 sm:grid-cols-3 h-36 lg:grid-cols-6 px-6 py-5 gap-6 border dark:border-zinc-800 rounded-lg'></Skeleton>
	)
}

export { UsersRowSkeleton }
