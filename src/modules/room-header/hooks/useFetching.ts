import { AxiosError } from 'axios'
import { useState } from 'react'

export const useFetching = (callback: () => unknown): [() => Promise<unknown>, boolean, string] => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>('')

	const fetching = async () => {
		try {
			setIsLoading(true)

			return await callback()
		} catch (e: unknown) {
			setError((e as Error | AxiosError).message)
		} finally {
			setIsLoading(false)
		}
	}

	return [fetching, isLoading, error]
}
