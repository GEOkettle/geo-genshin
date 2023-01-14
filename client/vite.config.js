import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// dev
export default defineConfig({
  plugins: [react()],
  server: {

    port:3000
  }
});
