import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // change to whatever you want, 3000, 4000, 8080 etc.
  }
})