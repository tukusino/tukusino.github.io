import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const now = new Date();
const formattedDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(formattedDate),
  },
})
