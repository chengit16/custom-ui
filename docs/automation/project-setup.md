# 项目搭建

这份文档记录 Custom UI 项目的基础搭建方式，方便后续维护者理解项目为什么这样组织。

## 1. 初始化 workspace

项目采用 pnpm workspace，根目录只负责组织子包，不直接发布 npm。

核心文件：

```text
package.json
pnpm-workspace.yaml
tsconfig.base.json
eslint.config.mjs
```

根目录 `package.json` 保持：

```json
{
  "private": true,
  "packageManager": "pnpm@10.0.0"
}
```

`private: true` 是为了避免误把 workspace 根目录发布到 npm。

## 2. 子项目结构

```text
packages/vue/
docs/
examples/vite/
```

- `packages/vue`：真实发布的组件库包。
- `docs`：VitePress 文档站。
- `examples/vite`：本地示例应用，用来验证组件库在真实 Vite 项目中的使用。

## 3. 组件库包

发布包位于：

```text
packages/vue/package.json
```

当前包名：

```json
@danran_chen/custom-ui-vue
```

构建入口使用 Vite：

```text
packages/vue/vite.config.ts
```

类型声明由 `vue-tsc` 生成。

## 4. 文档站

文档站位于：

```text
docs/
```

启动命令：

```bash
pnpm docs:dev
```

构建命令：

```bash
pnpm docs:build
```

导航、侧栏、GitHub Pages 子路径在这里维护：

```text
docs/.vitepress/config.ts
```

## 5. 自动化脚本

脚本集中在：

```text
scripts/
```

当前核心脚本：

- `create-component.ts`：生成组件骨架。
- `check-component.ts`：检查组件关键文件是否齐全。
- `generate-api.ts`：从 `props.ts` 中文 JSDoc 生成 API 表格。
- `release-check.ts`：执行发布前 dry-run 检查。

根目录命令：

```bash
pnpm create-component Button
pnpm check-component Button
pnpm generate-api Button
pnpm release:check
```

## 6. Git Hook

项目使用 Husky + lint-staged。

```text
.husky/pre-commit
.husky/commit-msg
```

为了兼容 IDEA、Cursor 等 GUI Git 环境，hook 会通过登录 shell 查找 pnpm，避免出现 `pnpm: command not found`。

## 7. Git 提交规范

项目使用 Conventional Commit 格式，并要求提交说明使用中文。这样后续 `pnpm changeset:auto` 读取 git 记录生成版本日志时，日志内容天然就是中文。

格式：

```text
<type>: <中文说明>
```

常用类型：

- `feat`：新增功能、组件或能力。
- `fix`：修复问题。
- `docs`：文档变更。
- `chore`：工程配置、依赖、脚本等维护工作。
- `refactor`：重构，不改变对外行为。
- `test`：测试相关变更。
- `build`：构建或发布相关变更。
- `ci`：CI/CD 流程变更。

推荐示例：

```bash
git commit -m "feat: 新增 Modal 弹窗组件"
git commit -m "fix: 修复暗黑模式侧栏背景"
git commit -m "docs: 补充 npm 发布操作手册"
git commit -m "chore: 调整版本日志自动生成脚本"
```

不推荐：

```bash
git commit -m "feat: add modal component"
git commit -m "update docs"
```

如果有破坏性变更，使用 `!` 标记，并在正文说明影响范围：

```bash
git commit -m "feat!: 调整 Button 类型命名"
```

## 8. 第一次拉取后的验证

后续维护者第一次拉取项目后，建议按顺序执行：

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm docs:build
pnpm release:check
```

全部通过后，说明本地环境和项目基础链路可用。
