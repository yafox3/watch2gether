import { IChatMessage } from '@/models'
import { FC } from 'react'

interface ChatMessageProps extends IChatMessage {}

const ChatMessage: FC<ChatMessageProps> = ({ message, username }) => {
	return (
		<div className='p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md mb-2 max-w-[98%] break-words'>
			<p className='text-xs text-neutral-400 mb-1'>{username}</p>
			<p className='text-sm'>{message}</p>
		</div>
	)
}

export { ChatMessage }

