import { SubmitForm } from '@/components'
import { useChatStore } from '@/store/chat'
import { useUserStore } from '@/store/user'
import { useEffect, useRef, useState } from 'react'
import { BsSend } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { ChatMessage } from './ChatMessage'

const Chat = () => {
	const [message, setMessage] = useState('')
	const chatRowRef = useRef<HTMLDivElement | null>(null)
	const { id: roomId } = useParams()
	const socket = useUserStore(state => state.socket)
	const username = useUserStore(state => state.username)
	const messages = useChatStore(state => state.messages)

	useEffect(() => {
		if (!messages.length) return

		chatRowRef?.current?.scrollTo({
			top: chatRowRef.current.scrollHeight,
			behavior: 'smooth'
		})
	}, [messages])

	const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!message.trim()) return

		const newMessage = {
			username,
			message
		}

		setMessage('')
		socket?.send(`/app/video/${roomId}/chat`, {}, JSON.stringify(newMessage))
	}

	return (
		<div className='max-h-96 min-h-60 lg:min-h-full lg:min-w-full lg:max-h-[580px] lg:h-[36vw] flex flex-col justify-end p-2 border dark:border-zinc-800 rounded-lg'>
			<div ref={chatRowRef} className='mb-2 overflow-y-auto'>
				{messages.map((mes, idx) => (
					<ChatMessage key={idx} username={mes.username} message={mes.message} />
				))}
			</div>
			<SubmitForm
				onSubmit={sendMessage}
				placeholder='Enter your message'
				value={message}
				setValue={setMessage}
				icon={<BsSend className='text-base' />}
			/>
		</div>
	)
}

export { Chat }

