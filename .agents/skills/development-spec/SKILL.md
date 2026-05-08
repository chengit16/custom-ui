---
name: development-spec
description: Custom UI Vue 组件库的开发规范，涵盖组件、文档、示例、测试和发布检查。
---

# 开发规范

在创建、审查或编写 `@custom-ui/vue` 组件时使用此技能。

## 组件规范

- 组件位于 `packages/vue/src/components/{kebab-name}/`。
- 主组件文件是 `{kebab-name}.vue`。
- Props 放在 `props.ts`。
- 对外导出放在 `index.ts`。
- API 元数据放在 `api.ts`。
- Demo 放在 `demo/*.vue`。
- 测试放在 `__tests__/{kebab-name}.test.ts`。
- 组件命名使用 `Custom{PascalName}`。
- 如果 Naive UI 已经提供了对应行为，优先封装而不是重新实现。
- Provider / 主题相关能力优先封装在独立文件中，保持组件入口清晰。
- 组件与示例优先使用 Vue 3 + TS + `<script setup>` 风格。
- Props、事件、插槽和外部可见 API 要保持最小、明确、可文档化。

## 文档规范

- 组件文档位于 `docs/components/{kebab-name}.md`。
- 以真实 demo 文件作为唯一事实来源。
- 使用 `DemoBlock` 展示 demo 预览和源码。
- 使用 `pnpm generate-api {ComponentName}` 生成 API 表格。
- 文档页需要能直接渲染真实 demo，并能展示同一份源码。
- 文档中如果引用 API 表格，优先引用 `docs/components/generated/{kebab-name}-api.md`。

## 校验规范

- 在确认组件完成前运行 `pnpm check-component {ComponentName}`。
- 实现完成后运行测试和类型检查。
- 在做任何发布决策前运行 `pnpm release:check`。
- 审查组件时要同时关注可访问性、Naive UI 复用、类型安全和导出稳定性。
- 如果组件涉及 API 元数据，必须让 `api.ts` 与文档保持同步。
