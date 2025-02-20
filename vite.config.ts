import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: 'node_modules/.vite/ecom-enduser',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/assets/'),
    },
  },
  assetsInclude: [
    '**/*.ttf',
    '**/*.svg',
    '**/*.jpg',
    '**/*.png',
    '**/*.webp',
    '**/*.jpeg',
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    cssMinify: true,
    cssCodeSplit: true,
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
      treeshake: true,
    },
  },
});
