import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://certificate-gen-c66k.onrender.com', // backend server URL
        changeOrigin: true,
      },
    },
  },
});
