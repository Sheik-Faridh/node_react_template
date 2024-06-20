import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    includeSource: ['src/**/*.{jsx,js}'],
    environment: 'jsdom',
    setupFiles: ['src/tests/setup.js'],
    retry: 2,
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './reports',
    },
  },
})
