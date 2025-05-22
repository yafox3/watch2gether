import { Button, useToast } from '@/ui'
import { IoPersonAddOutline } from 'react-icons/io5'

const InviteFriends = () => {
	const { toast } = useToast()

	const inviteFriend = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			toast({
				title: 'Ссылка для приглашения скопирована',
				description: 'Теперь вы можете поделиться ей с друзьями.',
			})
		})
	}

	return (
		<Button variant={'link'} size={'icon'} onClick={inviteFriend}>
			<IoPersonAddOutline className='cursor-pointer text-2xl' />
		</Button>
	)
}

export { InviteFriends }

