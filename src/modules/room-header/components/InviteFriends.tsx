import { Button, useToast } from '@/ui'
import { IoPersonAddOutline } from 'react-icons/io5'

const InviteFriends = () => {
	const { toast } = useToast()

	const inviteFriend = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			toast({
				title: 'Invite link copied',
				description: 'You can now share the link with your friends.',
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

