export const getYoutubeId = (url: string) => {
	return url.split(/v=([^\\&]+)/g)[1]
}
