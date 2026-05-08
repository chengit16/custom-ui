---
name: docs-writer
description: 使用 DemoBlock 和生成的 API 表格编写 Custom UI 的 VitePress 组件文档。
---

# 文档编写

在创建或更新组件文档时使用此技能。

## 规则

- 文档放在 `docs/components/{kebab-name}.md`。
- 使用 `packages/vue/src/components/{kebab-name}/demo/` 下的真实 demo 文件。
- 文档页要导入 demo 组件，同时把同一个 `.vue` 文件以源码形式传给 `DemoBlock`。
- `DemoBlock` 必须通过 `:source` 接收源码，预览区和源码区要对应同一个 demo 文件。
- 如果需要 API 表格，先运行 `pnpm generate-api {ComponentName}`，再把生成的 `docs/components/generated/{kebab-name}-api.md` 引入或引用到文档页。
- 不要手写已经能从 demo 文件读取的代码片段。
- 示例保持简短，优先展示真实使用场景，而不是单纯讲属性。
