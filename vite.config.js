import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function publicPath() {
  if (process.env.CI_PAGES_URL) {
    return new URL(process.env.CI_PAGES_URL).pathname
  } else {
    return '/'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    outDir: 'dist'
  },
  base: '/SPEAKS/'
})
