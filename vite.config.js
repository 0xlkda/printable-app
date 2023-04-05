import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@core': require('path').resolve(__dirname, 'packages/'),
      '@js': require('path').resolve(require('os').homedir(), 'code/js/')
    }
  },
  plugins: [react()]
})
