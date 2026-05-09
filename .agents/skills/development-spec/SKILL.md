---
name: development-spec
description: 创建、更新、审查、编写文档或发布检查 Custom UI Vue 组件时使用。
---

# Custom UI 开发规范

这是 `@custom-ui/vue` 的规范层。其他 skill 需要先参考它，再执行组件实现、文档编写、代码审查或发布检查。

## 基本原则

- 项目采用“脚本 + Skill”模式：脚本负责骨架、检查、API 生成和发布 dry-run；Skill 负责需求判断、组件 API 设计、示例设计和质量审查。
- 优先封装 Naive UI 已有能力，不重复实现成熟交互。
- 对外 API 保持小而清楚，所有 Props、事件、插槽都必须可文档化。
- 组件、demo、文档和 API 表必须一致，不能只改其中一处。

## 目录规范

- 组件目录：`packages/vue/src/components/{kebab-name}/`
- 主组件：`{kebab-name}.vue`
- Props：`props.ts`
- 导出：`index.ts`
- Demo：`demo/*.vue`
- 测试：`__tests__/{kebab-name}.test.ts`
- 文档：`docs/components/{kebab-name}.md`
- 生成 API：`docs/components/generated/{kebab-name}-api.md`

## 命名规范

- 对外组件名使用 `Custom{PascalName}`。
- 子组件使用 `Custom{PascalName}{SubName}`，例如 `CustomButtonGroup`。
- 文件名和目录名使用 kebab-case。
- Vue 文件使用 Vue 3 + TypeScript + `<script setup lang="ts">`。

## Props 规范

所有 Props 必须在 `props.ts` 中定义，并包含中文 JSDoc 注释。注释会被 `pnpm generate-api {ComponentName}` 读取生成文档。

```ts
export const ButtonProps = {
  /**
   * 按钮类型
   *
   * 用于控制按钮的语义色。
   */
  type: {
    type: String,
    default: 'default',
  },
  /** 是否禁用按钮 */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;
```

要求：

- 每个 prop 都必须有中文 JSDoc。
- 复杂取值要在注释里说明使用场景或可选值。
- 默认值应在 props 定义中体现，避免文档手写漂移。
- 新增 props 后必须重新运行 `pnpm generate-api {ComponentName}`。

## Demo 规范

- demo 文件必须是真实可编译 Vue 文件。
- 示例优先展示真实使用场景，而不是机械列属性。
- 一个 demo 只表达一个主题，例如“尺寸”“加载中”“图标按钮”。
- 浏览器专属或 SSR 不安全的示例，在 VitePress 文档中用 `ClientOnly` 包裹。

## 文档规范

- 文档页使用 `## 代码演示` 作为示例主区块。
- 每个示例使用 `###` 标题，并通过 `DemoBlock` 展示预览和源码。
- 文档必须导入 demo 组件和同一文件的 `?raw` 源码。
- API 表优先通过 `<!--@include: ./generated/{kebab-name}-api.md-->` 引入。
- 插槽、事件等脚本暂不能生成的内容，可以在 API 后手写表格。

## 校验规范

组件完成前至少运行：

- `pnpm check-component {ComponentName}`
- 组件定向测试，或必要时 `pnpm test`
- `pnpm generate-api {ComponentName}`
- `pnpm docs:build`
- `pnpm lint`

发布前必须运行：

- `pnpm release:check`

如果 `SmokeTest` 仍被公开导出，`release:check` 预期会阻断发布。
