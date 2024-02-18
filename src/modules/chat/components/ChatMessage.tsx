import { FC } from 'react'
import { Message } from './Chat'

interface ChatMessageProps extends Message {}

const ChatMessage: FC<ChatMessageProps> = ({ message, user, time }) => {
	return (
		<div className='p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md mb-2 max-w-[98%] break-words'>
			<p className='text-xs text-neutral-400 mb-1'>{user} {time}</p>
			<p className='text-sm'>{message}</p>
		</div>
	)
}

export { ChatMessage }

