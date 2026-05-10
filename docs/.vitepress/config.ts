import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  title: 'Custom UI',
  description: 'Vue 3 component library built on Naive UI.',
  base: '/custom-ui/',
  cleanUrls: true,
  srcExclude: ['superpowers/**'],
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '基础组件', link: '/components/' },
      { text: '自动化', link: '/automation/full-workflow' },
      { text: 'GitHub', link: 'https://github.com/chengit16/custom-ui' },
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
            { text: '全流程总览', link: '/automation/full-workflow' },
            { text: '项目搭建', link: '/automation/project-setup' },
            { text: 'Skill 与 AI 流程', link: '/automation/skill-workflow' },
            { text: '组件流程', link: '/automation/component-workflow' },
            { text: '版本日志', link: '/automation/version-log' },
            { text: '文档部署', link: '/automation/docs-deploy' },
            { text: '发布操作手册', link: '/automation/publish-manual' },
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
