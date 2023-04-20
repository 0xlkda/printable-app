import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@/libs': require('path').resolve(__dirname, 'libs/'),
      '@/api': require('path').resolve(__dirname, 'api/'),
      '@/config': require('path').resolve(__dirname, 'config/'),
      '@/assets': require('path').resolve(__dirname, 'assets/'),
      '@/utils': require('path').resolve(__dirname, 'utils/'),
      '@/components': require('path').resolve(__dirname, 'components/'),
      '@/commands': require('path').resolve(__dirname, 'commands/'),
      '@/js': require('path').resolve(require('os').homedir(), 'code/js/')
    }
  },
  plugins: [react()]
})
