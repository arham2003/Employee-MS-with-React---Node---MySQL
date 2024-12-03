import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures proper asset paths for deployment
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
  },
});
