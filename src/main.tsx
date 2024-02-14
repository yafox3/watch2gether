import { Layout } from '@/components'
import '@/index.css'
import { Room, Welcome } from '@/pages'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Navigate to='/' replace />,
		children: [
			{
				index: true,
				path: '/',
				element: <Welcome />
			},
			{
				path: 'room/:id',
				element: <Room />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router}></RouterProvider>
)
