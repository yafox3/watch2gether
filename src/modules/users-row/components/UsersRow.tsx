import { User } from './User'

const UsersRow = () => {
	const users = [
		'user1',
		'user2',
		'user3',
		'user4',
		'user5',
		'user6'
	]

	return (
		<>
			<h3 className='text-xl lg:text-3xl dark:text-neutral-300 mb-1 lg:mb-3'>Users</h3>
			<div className='w-full grid grid-rows-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 px-6 py-5 gap-6 border dark:border-zinc-800 rounded-lg'>
				{users.map(user => (
					<User key={user} username={user} />
				))}
			</div>
		</>
	)
}

export { UsersRow }

