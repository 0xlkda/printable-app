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
      '@/assets': require('path').resolve(__dirname, 'assets/'),
      '@/app': require('path').resolve(__dirname, 'app/'),
      '@/libs': require('path').resolve(__dirname, 'libs/'),
      '@/api': require('path').resolve(__dirname, 'api/'),
      '@/config': require('path').resolve(__dirname, 'config/'),
      '@/components': require('path').resolve(__dirname, 'components/'),
      '@/commands': require('path').resolve(__dirname, 'commands/'),
      '@/utils': require('path').resolve(__dirname, 'utils/'),
      '@/js': require('path').resolve(require('os').homedir(), 'code/js/')
    }
  },
  plugins: [react()]
})
