import { SubmitForm } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { BsSend } from 'react-icons/bs'
import { ChatMessage } from './ChatMessage'

export interface Message {
	user: string
	message: string
	time: string
}

const Chat = () => {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState<Message[]>([])
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!message.trim()) return

		const timeStamp = new Date()
		const newMessage = {
			user: 'user1',
			message: message.length > 500 ? message.slice(0, 500) : message,
			time: timeStamp.getHours() + ':' + timeStamp.getMinutes()
		}

		setMessages(prev => [...prev, newMessage])
		setMessage('')
	}

	return (
		<div className='max-h-96 min-h-60 lg:min-h-full lg:min-w-full lg:max-h-[580px] lg:h-[36vw] flex flex-col justify-end p-2 border dark:border-zinc-800 rounded-lg'>
			<div className='mb-2 overflow-y-auto'>
				{messages.map((mes, idx) => (
					<ChatMessage key={idx} user={mes.user} message={mes.message} time={mes.time} />
				))}
				<div ref={messagesEndRef} />
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

