import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
      '**/coverage/**',
      '**/node_modules/**'
    ]
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
