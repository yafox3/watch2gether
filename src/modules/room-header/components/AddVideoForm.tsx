import { SubmitForm } from '@/components'
import { useState } from 'react'
import { GoPlus } from 'react-icons/go'

const AddVideoForm = () => {
	const [link, setLink] = useState('')

	const addToPlaylist = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!link) {
			return
		}

		console.log(link)
		setLink('')
	}

	return (
		<SubmitForm
			placeholder='Paste a link to Youtube video'
			icon={<GoPlus className='text-xl' />}
			value={link}
			setValue={setLink}
			onSubmit={addToPlaylist}
		/>
	)
}

export { AddVideoForm }

