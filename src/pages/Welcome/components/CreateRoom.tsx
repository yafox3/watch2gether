import { Button, Input, Label } from '@/ui'

const CreateRoom = () => {
	return (
		<div className='max-w-96 mx-auto p-6 border border-zinc-800 rounded-lg'>
			<h2 className='text-3xl text-center mb-6'>Create room</h2>

			<form action='submit'>
				<Label htmlFor='username' className='block mb-2'>
					Username
				</Label>
				<Input id='username' placeholder='Enter your username' className='mb-8' />

				<Button variant='secondary' className='block mx-auto mb-6 w-1/2'>
					Create
				</Button>
			</form>
		</div>
	)
}

export { CreateRoom }

