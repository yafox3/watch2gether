import { FC } from 'react'

const User: FC<{ username: string }> = ({ username }) => {
	return (
		<div>
			<img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`} alt='User avatar' className='mb-2 mx-auto w-24 md:w-32' />
			<p className='text-center mx-auto text-sm font-bold dark:text-neutral-300 max-w-[128px] break-words line-clamp-1'>{username}</p>
		</div>
	)
}

export { User }

