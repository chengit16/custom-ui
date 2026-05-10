# Custom UI

`Custom UI` 是一个基于 `Vue 3 + TypeScript + Vite` 的 Web 端组件库，封装自 `Naive UI`，面向单人渐进式开发与后续自动化生成文档、示例和发布流程。

## 特性

- 基于 `Vue 3 + TypeScript + Vite`
- 封装 `Naive UI` 组件并保留可扩展性
- 内置 `VitePress` 文档站
- 支持 demo + API 自动生成
- 支持 Changesets 自动生成版本日志
- 支持发布前 `dry-run` 检查
- 支持 GitHub Pages 自动部署

## 安装

```bash
pnpm add @danran_chen/custom-ui-vue
```

## 使用

```vue
<script setup lang="ts">
import {
  CustomProvider,
  createCustomTheme,
  CustomButton,
} from '@danran_chen/custom-ui-vue';

const themeOverrides = createCustomTheme({
  primaryColor: '#2080f0',
});
</script>

<template>
  <CustomProvider :theme-overrides="themeOverrides">
    <CustomButton type="primary"> Custom UI </CustomButton>
  </CustomProvider>
</template>
```

## 本地开发

```bash
pnpm install
pnpm docs:dev
pnpm example:dev
```

## 常用命令

```bash
pnpm build
pnpm typecheck
pnpm test
pnpm docs:build
pnpm changeset
pnpm version:packages
pnpm release:check
pnpm publish:vue
```

## 文档

- 在线文档：GitHub Pages
- 组件文档：`docs/components`
- 自动化说明：`docs/automation`

## 发布流程

1. 开发组件
2. 生成或更新 demo 和 API 文档
3. 运行 `pnpm changeset` 写入版本日志条目
4. 发布前运行 `pnpm version:packages` 自动生成版本号和 CHANGELOG
5. 运行 `pnpm release:check`
6. 运行 `pnpm publish:vue`
7. 推送到 GitHub，触发文档自动部署

## 技术栈

- Vue 3
- TypeScript
- Vite
- VitePress
- Naive UI
- Changesets
- Husky

## 许可证

MIT
