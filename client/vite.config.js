import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// // prod
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 80,
//     // proxy: {
//     //   "/": {
//     //     target: "http://3.144.80.94:5000",
//     //     changeOrigin: true,
//     //   },
//     // },
//   },
// });

// dev
export default defineConfig({
  plugins: [react()],
  server: {

    port:3000
  }
});
