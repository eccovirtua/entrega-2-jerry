import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),          // Procesa React/JSX
    tailwindcss(),    // Procesa Tailwind V4
  ],
})