import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CustomUiVue',
      fileName: 'custom-ui-vue',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'naive-ui'],
      output: {
        globals: {
          vue: 'Vue',
          'naive-ui': 'naive'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});
