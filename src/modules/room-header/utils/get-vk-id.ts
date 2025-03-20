export const getVKVideoParams = (url: string): { oid: string; id: string } | null => {
	const regex = /vkvideo\.ru\/video(-?\d+)_(\d+)/
	const match = url.match(regex)

	if (match) {
		return {
			oid: match[1], // owner ID
			id: match[2] // video ID
		}
	}

	return null
}
