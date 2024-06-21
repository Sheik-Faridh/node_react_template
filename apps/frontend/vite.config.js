import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
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
