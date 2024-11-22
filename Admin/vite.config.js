import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://certificate-gen-c66k.onrender.com', // your backend server URL
        changeOrigin: true,
      },
    },
  },
});
