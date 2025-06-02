import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/kodeCash',
  // server: {
  //   host: '0.0.0.0',      // allows access from LAN
  //   port: 5173,           // default port (optional)
  //   strictPort: true      // optional: forces use of this port
  // }
})