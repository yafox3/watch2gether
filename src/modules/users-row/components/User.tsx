import { IUser } from '@/models'
import { FC } from 'react'
import { LuCrown } from 'react-icons/lu'

interface UserProps extends IUser {}

const User: FC<UserProps> = ({ username, isOwner }) => {
	return (
		<div className='relative rounded-lg w-full py-4 dark:bg-zinc-900 border dark:border-black/10 shadow-lg'>
			<img
				src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`}
				alt='User avatar'
				className='mb-2 mx-auto w-24 md:w-28'
			/>
			{isOwner && (
				<LuCrown className='absolute -top-3 -right-3 rotate-45 text-yellow-400 mx-auto text-2xl' />
			)}
			<p className='text-center mx-auto text-sm font-bold dark:text-neutral-300 max-w-[128px] break-words line-clamp-1'>
				{username}
			</p>
		</div>
	)
}

export { User }

