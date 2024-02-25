import { IUser } from '@/models'
import { FC } from 'react'
import { GiCrown } from 'react-icons/gi'

interface UserProps extends IUser {}

const User: FC<UserProps> = ({ username, isOwner }) => {
	return (
		<div className='relative rounded-lg w-full'>
			<img
				src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${username}&radius=12&backgroundColor=e5e5e5`}
				alt='User avatar'
				className={`mb-2 mx-auto`}
			/>
			{isOwner && (
				<GiCrown className='absolute -top-7 left-[55%] translate-x-[-50%] text-yellow-400 mx-auto text-4xl' />
			)}
			<p className='text-center mx-auto text-sm font-bold dark:text-neutral-300 max-w-[128px] break-words line-clamp-1'>
				{username}
			</p>
		</div>
	) //
}

export { User }

