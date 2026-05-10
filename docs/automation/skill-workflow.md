# Skill 与 AI 流程

这份文档说明 Custom UI 的 AI skill 是怎么组织的，以及新增组件时 AI 应该按什么流程工作。

## 1. Skill 目录

Custom UI 专用 skill 放在：

```text
.agents/skills/
```

当前包含：

- `development-spec`：组件库通用开发规范。
- `create-component`：新增、更新、重构组件时使用。
- `docs-writer`：编写和审查 VitePress 组件文档时使用。
- `code-reviewer`：审查组件实现、API、测试和文档一致性。
- `release-checker`：发布前 dry-run 检查。

## 2. 为什么使用 Skill + Script

本项目采用“Skill 负责判断，Script 负责重复动作”的方式。

Skill 负责：

- 判断组件 API 边界。
- 判断哪些能力来自 Naive UI，哪些能力由 Custom UI 补充。
- 约束 demo、文档、API 表和测试质量。
- 在 review 时检查实现、文档和发布风险。

Script 负责：

- 创建组件骨架。
- 检查组件关键文件。
- 从 `props.ts` 生成 API 表格。
- 执行发布前 dry-run。

这样既保留 AI 的上下文判断，也避免重复动作完全靠手工描述。

## 3. 新增组件时的 AI 顺序

当用户说“新增一个组件”时，推荐使用这个顺序：

1. 使用 `create-component` skill 明确组件边界。
2. 如有必要，运行 `pnpm create-component {ComponentName}`。
3. 实现组件和 Naive UI 封装。
4. 编写真实 demo。
5. 在 `props.ts` 中补全中文 JSDoc。
6. 运行 `pnpm generate-api {ComponentName}`。
7. 使用 `docs-writer` 补齐组件文档。
8. 运行 `pnpm check-component {ComponentName}`。
9. 使用 `code-reviewer` 做审查。
10. 发布前使用 `release-checker` 跑 `pnpm release:check`。

## 4. Props 规范

`props.ts` 中每个公开属性都必须有中文 JSDoc。

```ts
export interface ButtonProps {
  /** 文案 */
  text?: string;
  /** 圆角 */
  radius?: number;
  /** 尺寸 */
  size?: 'medium' | 'large';
}
```

API 文档优先从这些注释生成，不手工维护重复说明。

## 5. 文档规范

组件文档必须满足：

- 文档位于 `docs/components/{kebab-name}.md`。
- demo 位于 `packages/vue/src/components/{kebab-name}/demo/`。
- `DemoBlock` 的预览和源码来自同一个 demo 文件。
- API 表来自 `pnpm generate-api {ComponentName}`。
- 如果 demo 依赖浏览器能力，文档中使用 `ClientOnly`。

## 6. Review 规范

审查时优先看问题，不先写泛泛总结。

重点检查：

- 组件是否正确导出。
- Props 类型、默认值、注释和行为是否一致。
- Naive UI 能力是否正确透传。
- demo 是否真实可运行。
- 文档是否能构建。
- 发布产物是否包含不该发布的内容。

## 7. 发布前 Skill 使用

发布前使用 `release-checker`，核心命令是：

```bash
pnpm release:check
```

通过后才能执行：

```bash
pnpm publish:vue
```
