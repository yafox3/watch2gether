import { SubmitForm } from '@/components'
import { useUserStore } from '@/store/user'
import { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { useParams } from 'react-router-dom'

const AddVideoForm = () => {
	const [link, setLink] = useState('')
	const { id: roomId } = useParams()
	const socket = useUserStore(state => state.socket)

	const addToPlaylist = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!link || !socket) {
			return
		}

		socket.send(`/app/room/${roomId}/video/add`, {}, link)
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

