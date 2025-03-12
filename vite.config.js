import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Ensure compatibility with modern browsers
    outDir: 'dist', // Cloudflare Pages expects the output in the dist directory
  },
})
