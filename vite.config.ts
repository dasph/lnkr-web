import { defineConfig, mergeConfig, UserConfigExport } from 'vite'
import solid from 'vite-plugin-solid'

import { entry } from './src/plugins'

const common: UserConfigExport = {
  resolve: {
    alias: {
      '@app': '/src/app',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@types': '/src/types',
      '@assets': '/src/assets',
      '@layouts': '/src/layouts',
      '@components': '/src/components'
    }
  },
  plugins: [solid({ ssr: true })]
}

const client: UserConfigExport = {
  build: {
    manifest: true,
    target: 'esnext',
    outDir: './dist/client'
  },
  server: {
    port: 3000,
    host: true
  },
  plugins: [entry('./src/assets/index.html')]
}

const server: UserConfigExport = {
  build: {
    ssr: true,
    outDir: './dist/server',
    rollupOptions: {
      input: {
        index: './src/server.tsx'
      }
    }
  }
}

export default defineConfig(({ mode }) => mergeConfig(common, mode === 'server' ? server : client))
