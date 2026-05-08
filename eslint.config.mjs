import js from '@eslint/js';
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
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
