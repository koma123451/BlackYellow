import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      secure: false,
      configure: (proxy, options) => {
        proxy.on('proxyRes', function (proxyRes, req, res) {
          res.setHeader('Access-Control-Allow-Credentials', 'true');
        });
      },
    },
  },
},
});