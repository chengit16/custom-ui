---
name: code-reviewer
description: 审查 Custom UI Vue 组件的 API 质量、Naive UI 封装、文档、示例和测试。
---

# 代码审查

在做组件审查时使用此技能。

## 审查清单

- 组件目录结构是否符合规范。
- 对外组件名是否使用 `Custom{PascalName}`。
- Props 是否有完整类型，并且每个属性都有中文 JSDoc 注释。
- 是否尽量复用 Naive UI 行为，而不是重新造轮子。
- demo 文件是否可编译，并且确实展示真实用法。
- VitePress 文档是否引用了 demo 和生成的 API 文档。
- 测试是否覆盖公共导出和自定义行为。
- `pnpm check-component {ComponentName}` 是否通过。
- 审查时要同时看导出、可访问性、文档一致性，以及是否违反 `development-spec`。

先报告阻断项；如果没有阻断项，再说明通过并列出残余风险。
