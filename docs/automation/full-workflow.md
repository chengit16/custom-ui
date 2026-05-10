# 全流程总览

这套流程记录 Custom UI 从项目搭建、AI Skill 约束、组件生产、文档部署到 npm 发布的完整链路。后续维护者可以先读本页，再进入对应分主题文档。

## 1. 流程地图

```text
项目搭建
  -> Skill 与 AI 流程
  -> 组件流程
  -> 版本日志
  -> 文档部署
  -> npm 发布
```

对应文档：

- [项目搭建](/automation/project-setup)
- [Skill 与 AI 流程](/automation/skill-workflow)
- [组件流程](/automation/component-workflow)
- [版本日志](/automation/version-log)
- [文档部署](/automation/docs-deploy)
- [发布操作手册](/automation/publish-manual)

## 2. 当前技术选型

- 组件库：Vue 3 + TypeScript + Vite
- 基础 UI：Naive UI
- 文档站：VitePress
- 包管理：pnpm workspace
- 测试：Vitest
- 文档部署：GitHub Pages + GitHub Actions
- npm 包名：`@danran_chen/custom-ui-vue`

## 3. 代码结构

```text
custom-ui/
  packages/vue/        # 组件库源码与构建配置
  docs/                # VitePress 文档站
  examples/vite/       # 本地示例应用
  scripts/             # 自动化脚本
  .agents/skills/      # Custom UI 专用 AI skill
  .github/workflows/   # GitHub Pages 自动部署
```

## 4. 日常开发顺序

新增组件时通常按这个顺序：

```bash
pnpm create-component Button
# 实现组件、demo、props.ts、文档
pnpm generate-api Button
pnpm check-component Button
pnpm release:check
```

如果需要本地看文档：

```bash
pnpm docs:dev
```

如果需要发布：

```bash
pnpm changeset:auto
pnpm release:check
pnpm publish:vue
git push
```

## 5. 维护原则

- 组件实现优先复用 Naive UI 的成熟能力。
- `props.ts` 的中文 JSDoc 是 API 表格的事实来源。
- demo 必须是真实 `.vue` 文件，文档预览和源码展示必须来自同一份 demo。
- 文档站新增页面后要更新 `docs/.vitepress/config.ts` 的侧栏。
- 每次发布前通过 Changesets 生成版本日志。
- 发布前必须先跑 `pnpm release:check`。
- 不在仓库根目录执行 `npm publish`，统一使用 `pnpm publish:vue`。
