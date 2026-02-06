/**
 * Vite config for Showcase build (GitHub Pages)
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // Base path for GitHub Pages (repo name)
  base: '/gps-2.0/',
  build: {
    outDir: 'dist-showcase',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'showcase.html')
      }
    }
  }
});
