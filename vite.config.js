import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@/api': require('path').resolve(__dirname, 'api/'),
      '@/app': require('path').resolve(__dirname, 'app/'),
      '@/libs': require('path').resolve(__dirname, 'libs/'),
      '@/manager': require('path').resolve(__dirname, 'manager/'),
      '@/user': require('path').resolve(__dirname, 'user/'),
      '@/utils': require('path').resolve(__dirname, 'utils/'),
      '@/js': require('path').resolve(require('os').homedir(), 'code/js/')
    }
  },
  plugins: [react()]
})
