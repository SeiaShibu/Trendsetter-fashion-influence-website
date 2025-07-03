import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/trendsetter/', // for GitHub Pages
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
