import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@custom-ui/vue': fileURLToPath(new URL('../../packages/vue/src/index.ts', import.meta.url))
    }
  }
});
