import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Proxy must match backend `PORT` (see backend/.env). Default 4000 = server.js default.
// Prefer setting VITE_API_URL in .env.development so the browser hits the API directly (no proxy).
// If the browser shows 502 on /api/*, the backend is not running or the proxy port is wrong.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiPort = env.VITE_API_PORT || '4001'
  const apiTarget = `http://127.0.0.1:${apiPort}`

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true },
        '/health': { target: apiTarget, changeOrigin: true },
      },
    },
  }
})
