import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // So you can use `describe`, `it`, `expect` without importing them
    environment: 'jsdom' // Simulate browser-like environment (use 'node' if not needed)
  }
})
