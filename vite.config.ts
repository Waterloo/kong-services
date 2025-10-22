import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools({
      launchEditor: 'code',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Inject the @kong/design-tokens SCSS variables to make them available for all components.
        additionalData: '@use "@kong/design-tokens/tokens/scss/variables" as *;',
      },
    },
  },
  // for kongponents support define global constant replacement: https://kongponents.konghq.com/guide/#define-global-constant-replacements
  define: {
    'process.env.development': JSON.stringify('development'),
    'process.env.production': JSON.stringify('production'),
  },
  build: {
    // optimize dependency https://kongponents.konghq.com/guide/#optimize-or-transpile-dependencies
    commonjsOptions: {
      include: [
        /@kong\/kongponents/,
        /node_modules/,
      ],
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
})
