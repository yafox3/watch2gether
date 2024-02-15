import { Toaster } from '@/ui'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div className='container'>
			<Outlet />
			<Toaster />
		</div>
	)
}

export { Layout }

