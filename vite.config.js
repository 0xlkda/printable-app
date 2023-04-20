import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@/libs': require('path').resolve(__dirname, 'libs/'),
      '@/config': require('path').resolve(__dirname, 'config/'),
      '@/assets': require('path').resolve(__dirname, 'assets/'),
      '@/utils': require('path').resolve(__dirname, 'utils/'),
      '@/components': require('path').resolve(__dirname, 'components/'),
      '@/js': require('path').resolve(require('os').homedir(), 'code/js/')
    }
  },
  plugins: [react()]
})
