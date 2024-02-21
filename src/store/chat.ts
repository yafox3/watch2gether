import { IChatMessage } from '@/models'
import { IMessage } from '@stomp/stompjs'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Actions {
	addMessage: (message: IChatMessage) => void
	receiveMessage: (res: IMessage) => void
}

interface ChatState {
	messages: IChatMessage[]
}

const initialState: ChatState = {
	messages: []
}

export const useChatStore = create<ChatState & Actions>()(
	immer(set => ({
		...initialState,
		addMessage: message =>
			set(state => {
				state.messages.push(message)
			}),
		receiveMessage: res => {
			const newMessage = JSON.parse(res.body)
			console.log(newMessage)

			set(state => {
				state.messages.push(newMessage)
			})
		}
	}))
)
