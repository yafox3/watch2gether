import { useRoomStore } from '@/store/room'
import { User } from './User'

const UsersRow = () => {
	const users = useRoomStore(state => state.users)

	return (
		<>
			<h3 className='text-xl lg:text-3xl dark:text-neutral-300 mb-1 lg:mb-3'>Пользователи</h3>
			<div className='w-full grid grid-cols-[repeat(auto-fill,_minmax(7rem,_1fr))] place-items-center pb-4 pt-7 px-4 gap-6 border dark:border-zinc-800 rounded-lg'>
				{users.map(user => (
					<User key={user.username} {...user} />
				))}
			</div>
		</>
	)
}

export { UsersRow }

