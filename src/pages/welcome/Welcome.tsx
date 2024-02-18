import { CreateRoom } from './components/CreateRoom'

const Welcome = () => {
	return (
		<div className='py-6'>
			<h1 className='text-center text-5xl mb-48'>
				Watch<span className='text-yellow-400'>2</span>gether
			</h1>

			<CreateRoom />
		</div>
	)
}

export { Welcome }

