import { Button, Input } from '@/ui'
import React, { FC, ReactNode } from 'react'

interface SubmitFormProps {
	icon: ReactNode
	placeholder: string
	value: string
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	setValue: (v: string) => void
}

const SubmitForm: FC<SubmitFormProps> = ({ icon, placeholder, value, onSubmit, setValue }) => {
	return (
		<form action='submit' onSubmit={onSubmit} className='flex items-center gap-1'>
			<Input placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
			<Button size='icon'>
				{icon}
			</Button>
		</form>
	)
}

export { SubmitForm }

