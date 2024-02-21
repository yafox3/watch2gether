import { useEffect, useState } from 'react'
import { Progress } from './progress'

const Loader = () => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		setProgress(33)

		const timeout = setTimeout(() => setProgress(70), 1000)

		const timer = setInterval(() => {
			setProgress(prev => (prev >= 100 ? prev : prev + 1))
		}, 150)

		return () => {
			clearTimeout(timeout)
			clearInterval(timer)
		}
	}, [])

	return <Progress value={progress} className='fixed -top-1.5 left-0 w-screen z-[999999]' />
}

export { Loader }

