import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'node:path'
import dts from 'vite-plugin-dts'

const moduleEntries = {
  'utils': resolve(dirname(fileURLToPath(import.meta.url)), 'src/utils/index.ts'),
  'components': resolve(dirname(fileURLToPath(import.meta.url)), 'src/components/index.ts'),
}



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      copyDtsFiles: true,
      staticImport: true,
      rollupTypes: true,
      insertTypesEntry: true,
      compilerOptions: {
        declarationMap: true,
      },
      cleanVueFileName: true,
      entryRoot: resolve(dirname(fileURLToPath(import.meta.url)), './src'),
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    lib: {
      entry: moduleEntries,
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.mjs`,
    },
    rollupOptions: {
      external: ['vue'],
      input: moduleEntries,
      output: {
        globals: {
          vue: 'Vue',
        }
      }
    },
    sourcemap: true,
    minify: false,
    reportCompressedSize: false,
  }
})
