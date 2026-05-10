# 快速开始

这页带你把项目跑起来，并快速确认组件库、文档站和示例应用都正常工作。

## 适合谁看

- 想在本地运行 Custom UI 文档站的人。
- 想确认组件库能否被真实 Vite 项目使用的人。
- 想先了解整体流程，再继续新增组件或发布的人。

## 环境要求

- Node.js 20.19 或更高
- pnpm 10 或更高

## 安装依赖

```bash
pnpm install
```

## 启动文档站

```bash
pnpm docs:dev
```

## 启动示例应用

```bash
pnpm example:dev
```

示例应用用于验证发布包在真实业务项目里的使用方式。组件开发完成后，建议至少启动一次示例应用，确认导入、样式和交互都正常。

## 在项目中使用

```bash
pnpm add @danran_chen/custom-ui-vue
```

```vue
<script setup lang="ts">
import { CustomProvider, CustomButton } from '@danran_chen/custom-ui-vue';
</script>

<template>
  <CustomProvider>
    <CustomButton type="primary"> Hello Custom UI </CustomButton>
  </CustomProvider>
</template>
```

## 本地验证顺序

第一次接手项目时，建议按这个顺序确认环境：

```bash
pnpm install
pnpm docs:dev
pnpm example:dev
pnpm release:check
```

`pnpm release:check` 会覆盖类型检查、测试、组件构建、文档构建、示例构建和发布 dry-run，是正式发布前最重要的总检查。

## 下一步

- 查看 [主题配置](/guide/theme)
- 浏览 [组件总览](/components/)
- 按 [组件流程](/automation/component-workflow) 新增组件
