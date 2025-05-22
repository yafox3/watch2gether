import { SubmitForm } from '@/components'
import { IVideo } from '@/models'
import { useUserStore } from '@/store/user'
import { useToast } from '@/ui'
import { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import { fetchVideoData } from '../utils/fetch-video-data'

const AddVideoForm = () => {
	const [link, setLink] = useState('')
	const { id: roomId } = useParams()
	const { toast } = useToast()
	const socket = useUserStore(state => state.socket)

	const [fetchVideo, isLoading, error] = useFetching(async () => {
		return fetchVideoData(link)
	})

	useEffect(() => {
		if (error) {
			toast({
				title: 'Что-то пошло не так',
				description: error,
				variant: 'destructive'
			})
		}
	}, [error])

	const addToPlaylist = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!link || !socket) {
			return
		}

		const video = (await fetchVideo()) as IVideo
		if (!video) return

		socket.send(`/app/room/${roomId}/playlist/add`, {}, JSON.stringify(video))

		toast({
			title: 'Успех',
			description: 'Видео добавлено в плейлист'
		})
		setLink('')
	}

	return (
		<SubmitForm
			placeholder='Вставьте ссылку на видео Youtube или VK'
			icon={<GoPlus className='text-xl' />}
			isLoading={isLoading}
			value={link}
			setValue={setLink}
			onSubmit={addToPlaylist}
		/>
	)
}

export { AddVideoForm }

