import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Custom UI',
  description: 'Vue 3 component library built on Naive UI.',
  cleanUrls: true,
  srcExclude: ['superpowers/**'],
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/' },
      { text: '自动化', link: '/automation/component-workflow' }
    ],
    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '主题配置', link: '/guide/theme' }
      ],
      '/components/': [
        { text: '组件总览', link: '/components/' }
      ],
      '/automation/': [
        { text: '组件流程', link: '/automation/component-workflow' },
        { text: '发布检查', link: '/automation/release' }
      ]
    },
    search: {
      provider: 'local'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@custom-ui/vue': new URL('../../packages/vue/src/index.ts', import.meta.url).pathname
      }
    }
  }
});
