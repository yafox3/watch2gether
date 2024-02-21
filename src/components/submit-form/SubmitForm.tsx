import { Button, Input } from '@/ui'
import React, { FC, ReactNode } from 'react'

interface SubmitFormProps {
	icon: ReactNode
	placeholder: string
	value: string
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	setValue: (v: string) => void
	isLoading?: boolean
}

const SubmitForm: FC<SubmitFormProps> = ({ icon, placeholder, value, onSubmit, setValue, isLoading }) => {
	return (
		<form action='submit' onSubmit={onSubmit} className='flex items-center gap-1'>
			<Input disabled={isLoading} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
			<Button size='icon' disabled={isLoading || !value.trim()}>
				{icon}
			</Button>
		</form>
	)
}

export { SubmitForm }

