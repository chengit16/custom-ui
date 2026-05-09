---
name: create-component
description: 在 Custom UI Vue 组件库中新增、更新、重构或补全文档化组件时使用。
---

# 创建或更新组件

当用户要求新增、更新、重构或补全文档化组件时使用此技能。流程必须连贯执行，不能只生成代码就停下。

## 阶段 1：准备

1. 阅读 `.agents/skills/development-spec/SKILL.md`。
2. 明确组件名、使用场景、需要封装的 Naive UI 能力、Props、事件、插槽和子组件。
3. 如果是新组件，确认是否需要先运行脚手架。

完成标志：组件 API 边界清楚，知道哪些能力来自 Naive UI，哪些是 Custom UI 自己补充。

## 阶段 2：脚手架与实现

新组件先运行：

```bash
pnpm create-component {ComponentName}
```

然后完成：

- 替换脚手架里的占位 props、demo、测试和文档。
- 实现 `packages/vue/src/components/{kebab-name}/{kebab-name}.vue`。
- 更新 `index.ts` 的公共导出。
- `props.ts` 每个属性必须有中文 JSDoc。
- 如果有子组件，建立清晰的文件和导出结构。

## 阶段 3：Demo、文档与 API

1. 编写真实 demo：`packages/vue/src/components/{kebab-name}/demo/*.vue`。
2. 运行：

```bash
pnpm generate-api {ComponentName}
```

3. 更新 `docs/components/{kebab-name}.md`。
4. 文档必须使用 `DemoBlock`，并绑定同一个 demo 文件的源码。
5. SSR 不安全示例使用 `ClientOnly` 包裹。

完成标志：文档页能展示真实 demo、源码和生成 API 表。

## 阶段 4：检查与审查

至少运行：

```bash
pnpm check-component {ComponentName}
pnpm test packages/vue/src/components/{kebab-name}/__tests__/{kebab-name}.test.ts
pnpm docs:build
pnpm lint
```

然后按顺序使用：

1. `code-reviewer` 审查组件实现、API、测试和导出。
2. `docs-writer` 审查文档、demo 和 API 表一致性。

## 完成标准

- 组件能构建、能测试、能在文档中渲染。
- Props 注释完整，API 表由脚本生成。
- 文档示例来自真实 demo，不手写漂移代码。
- `pnpm check-component {ComponentName}` 通过。
- 没有遗留脚手架占位内容。
