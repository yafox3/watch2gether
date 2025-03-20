declare namespace VK {
	interface VideoPlayerOptions {
		width?: number
		height?: number
		onPlay?: () => void
		onPause?: () => void
		onEnded?: () => void
	}

	interface VideoPlayer {
		seek(time: number): void
		getCurrentTime(): number
		on(event: 'resumed' | 'paused' | 'ended' | 'timeupdate' | 'inited', listener: () => void): void
		play(): void
		pause(): void
		destroy(): void
	}

	function VideoPlayer(element: HTMLElement, options?: VideoPlayerOptions): VideoPlayer
}
