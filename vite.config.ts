import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
  server: {
    host: '0.0.0.0', 
    port: 4173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
})
