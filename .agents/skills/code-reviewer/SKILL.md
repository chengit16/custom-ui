---
name: code-reviewer
description: 审查 Custom UI Vue 组件实现、API 设计、Naive UI 封装、测试、示例或文档一致性时使用。
---

# 代码审查

使用代码审查视角，不做泛泛总结。先列问题，按严重程度排序；没有阻断项时明确说明通过和剩余风险。

## 审查前置

1. 阅读 `.agents/skills/development-spec/SKILL.md`。
2. 明确审查范围：单组件、文档变更、脚本变更、发布前检查或 git diff。
3. 读取相关文件：组件实现、`props.ts`、`index.ts`、demo、测试、文档和生成 API。

## 严重程度

- 阻断：会导致构建失败、类型失败、文档无法渲染、公开 API 错误、发布产物错误。
- 高风险：API 设计不稳、Naive UI 行为没有正确透传、demo 与实现不一致、测试缺关键路径。
- 建议：可读性、命名、示例覆盖度、文档表达和样式细节。

## 审查清单

### 组件与导出

- 组件目录、文件命名和导出符合规范。
- 对外组件名使用 `Custom{PascalName}`。
- 子组件命名和导出清晰。
- `packages/vue/src/components/index.ts` 未暴露不应发布的试验组件。

### Props 与 API

- `props.ts` 每个属性都有中文 JSDoc。
- 类型、默认值、注释和实际行为一致。
- 复杂 props 写清楚可选值或使用场景。
- 新增 props 后已运行 `pnpm generate-api {ComponentName}`。
- 生成的 API 表没有缺失、重复或过时内容。

### Naive UI 封装

- 优先透传 Naive UI 能力，不重复实现成熟交互。
- 透传属性名、事件、插槽符合 Vue 组件用法。
- SSR 不安全的 Naive UI 组件在文档中用 `ClientOnly`。

### Demo 与文档

- demo 是真实 `.vue` 文件，可编译。
- 文档通过 `DemoBlock :source` 展示同一 demo 的源码。
- 文档标题和示例顺序符合当前组件的真实使用路径。
- 不手写能从 demo 读取的代码片段。

### 测试与检查

- 测试覆盖公共导出、关键 props、事件或插槽。
- `pnpm check-component {ComponentName}` 通过。
- 必要时运行组件定向测试、`pnpm docs:build`、`pnpm lint`。

## 输出格式

如果发现问题：

1. 先列问题，格式为：`[严重程度] 文件:行 - 问题说明`。
2. 说明影响和建议修复方式。
3. 最后列未验证项。

如果没有问题：

1. 说明“未发现阻断问题”。
2. 列出已检查范围。
3. 列出剩余风险，例如未做浏览器视觉验收或未跑 release dry-run。
