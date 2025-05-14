import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/The-Line-between/', // ← имя твоего репозитория на GitHub
  plugins: [vue()],
})