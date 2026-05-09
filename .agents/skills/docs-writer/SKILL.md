---
name: docs-writer
description: 编写或审查 Custom UI VitePress 组件文档、示例、生成的 API 表格或 DemoBlock 示例时使用。
---

# 文档编写

用于创建、更新或审查 `docs/components/{kebab-name}.md`。文档必须以真实 demo 和 `props.ts` 注释为事实来源。

## 文档结构

推荐结构：

````md
# Button 按钮

<script setup>
import BasicDemo from '../../packages/vue/src/components/button/demo/basic.vue';
import basicSource from '../../packages/vue/src/components/button/demo/basic.vue?raw';
</script>

组件简介。

```ts
import { CustomButton } from '@custom-ui/vue';
```
````

## 代码演示

### 基础

<DemoBlock :source="basicSource">
  <BasicDemo />
</DemoBlock>

## API

<!--@include: ./generated/button-api.md-->

```

## 必须规则

- 文档放在 `docs/components/{kebab-name}.md`。
- demo 放在 `packages/vue/src/components/{kebab-name}/demo/`。
- 每个 demo 既要作为组件导入，也要用 `?raw` 作为源码导入。
- `DemoBlock` 的预览和源码必须来自同一个 demo 文件。
- API 表必须先运行 `pnpm generate-api {ComponentName}`。
- 不手写已经能从 demo 文件读取的代码。
- 示例标题使用 `###`，放在 `## 代码演示` 下。
- 示例保持真实、简短，避免只为单个通用属性堆章节；但组件核心能力需要有独立示例。

## API 规则

- Props 说明来自 `props.ts` 中文 JSDoc。
- 生成文件位于 `docs/components/generated/{kebab-name}-api.md`。
- 插槽、事件等脚本暂不能生成的内容，可以在 API 后手写表格。
- 更新 props 后必须重新运行 `pnpm generate-api {ComponentName}`。

## SSR 与交互

- 文档中使用 Popover、Modal、Teleport、浏览器 API 等可能依赖 DOM 的 demo 时，优先用 `ClientOnly` 包裹。
- demo 里可以使用 Naive UI 辅助组件，但要保持示例焦点在当前组件上。

## 审查清单

- 文档能通过 `pnpm docs:build`。
- demo 源码与预览一致。
- 目录标题、页面标题和侧栏命名一致。
- API 表和 `props.ts` 一致。
- 暗黑模式下 demo、代码块、侧栏和正文可读。
```
