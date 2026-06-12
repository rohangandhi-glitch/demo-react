import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Project is served from https://rohangandhi-glitch.github.io/demo-react/
  base: '/demo-react/',
  plugins: [react()],
})
