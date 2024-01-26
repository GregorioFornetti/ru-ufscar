import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const basePath = process.env.BASE_PATH || '/'
console.log('basePath', basePath)

// https://vitejs.dev/config/
export default ({ mode }: any) => {

  process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};

  return defineConfig({
    base: process.env.BASE_PATH,
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          auth: fileURLToPath(new URL('./auth.html', import.meta.url)),
        }
      }
    }
  })
}