import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import brand from './brand/brand.json'

export default defineConfig({
  // index.html carries %BRAND_NAME% until the app sets its own title.
  plugins: [react(), { name: 'brand-name', transformIndexHtml: html => html.replaceAll('%BRAND_NAME%', brand.name) }],
  server: {
    port: 3009,
    open: true,
    fs: {
      allow: ['.'],
    },
  },
  publicDir: 'public',
  build: {
    // public/workspace is a junction into workspace/ (gigabytes of reports).
    // The dashboard is a dev-server tool, so never copy publicDir into dist.
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
})
