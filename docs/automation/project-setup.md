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

## 7. 第一次拉取后的验证

后续维护者第一次拉取项目后，建议按顺序执行：

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm docs:build
pnpm release:check
```

全部通过后，说明本地环境和项目基础链路可用。
