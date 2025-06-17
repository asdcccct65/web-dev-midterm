import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/web-dev-midterm/',  // 👈 Add this line
  plugins: [react()],
})
