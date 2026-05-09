---
name: create-component
description: 使用 Custom UI 的自动化流程创建或更新 Vue 组件。
---

# 创建组件

当用户要求在 `@custom-ui/vue` 中新增或更新组件时使用此技能。

## 必须流程

1. 先阅读 `.agents/skills/development-spec/SKILL.md`。
2. 新组件先运行 `pnpm create-component {ComponentName}`。
3. 把脚手架生成的占位 props、demo 和文档改成当前组件的真实内容。
4. 在 `packages/vue/src/components/{kebab-name}/` 中实现组件。
5. 编写或更新真实 demo 文件。
6. 更新 `props.ts` 时为每个属性补上中文 JSDoc 注释，写法遵循 Props 注释规范。
7. 运行 `pnpm generate-api {ComponentName}`，让它直接读取 `props.ts` 注释生成 API 表格。
8. 更新 `docs/components/{kebab-name}.md`，并用 `DemoBlock` 绑定 demo 和源码。
9. 运行 `pnpm check-component {ComponentName}`。
10. 运行该组件的定向测试，例如 `pnpm test packages/vue/src/components/{kebab-name}/__tests__/{kebab-name}.test.ts`。
11. 请求 `code-reviewer` 做代码审查。
12. 请求 `docs-writer` 做文档审查，确认文档页和 demo 源码一致。

不要跳过文档、demo、Props 注释或组件检查。
