/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'media',
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}'
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem'
		},
		extend: {
			screens: {
				xs: '374.99px'
			},
			keyframes: {
				'slide-out-to-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'slide-in-from-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-to-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slide-in-from-bottom': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-in-from-top': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				},
				'out': {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 }
				}
			},
			animation: {
				'slide-out-to-left': 'slide-out-to-left 0.3s ease-in-out',
				'slide-in-from-left': 'slide-in-from-left 0.3s ease-in-out',
				'slide-out-to-right': 'slide-out-to-right 0.2s ease-in-out',
				'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-in-out',
				'slide-in-from-top': 'slide-in-from-top 0.2s ease-in-out',
				'out': 'out 0.2s ease-in-out',
				'in': 'in 0.2s ease-in-out',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [import('tailwindcss-animate')]
}
