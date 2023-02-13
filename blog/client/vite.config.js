import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {global: 'window'},
  server: {
    host: 'localhost',
    port: 8000,
    plugins: [react()]
  }
})
