import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  title: 'Custom UI',
  description: 'Vue 3 component library built on Naive UI.',
  cleanUrls: true,
  srcExclude: ['superpowers/**'],
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '基础组件', link: '/components/' },
      { text: '自动化', link: '/automation/component-workflow' },
      { text: 'GitLab', link: 'https://gitlab.com/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '通用',
          collapsed: false,
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '主题配置', link: '/guide/theme' },
          ],
        },
      ],
      '/components/': [
        {
          text: '概览',
          collapsed: false,
          items: [{ text: '组件总览', link: '/components/' }],
        },
        {
          text: '通用',
          collapsed: false,
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Modal 弹窗', link: '/components/modal' },
          ],
        },
      ],
      '/automation/': [
        {
          text: '流程',
          collapsed: false,
          items: [
            { text: '组件流程', link: '/automation/component-workflow' },
            { text: '发布检查', link: '/automation/release' },
            { text: 'Phase 1 总结', link: '/automation/phase-1-summary' },
          ],
        },
      ],
    },
    outline: {
      level: [2, 3],
      label: 'API',
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    sidebarMenuLabel: '导航',
    returnToTopLabel: '返回顶部',
    search: {
      provider: 'local',
    },
  },
  vite: {
    resolve: {
      alias: {
        '@custom-ui/vue': fileURLToPath(
          new URL('../../packages/vue/src/index.ts', import.meta.url),
        ),
      },
    },
    ssr: {
      noExternal: ['naive-ui'],
    },
  },
});
