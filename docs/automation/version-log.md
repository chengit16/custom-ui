# 版本日志

这份日志由 Changesets 驱动。新增组件、修复问题或修改文档时，优先运行自动生成命令，它会根据当前分支相对 `origin/main` 的 git 提交自动写入 changeset 草稿；未提交的改动不会被收录。正式发布时直接运行 `pnpm publish:vue`，脚本会自动完成版本更新并把日志合并到这里引用的 `packages/vue/CHANGELOG.md`。

## 使用方式

1. 变更完成后运行：

```bash
pnpm changeset:auto
```

2. 检查自动生成的 `.changeset/auto-generated-release.md` 内容。
3. 如需正式发版前自检，先运行：

```bash
pnpm release:check
```

4. 准备发布时直接运行：

```bash
pnpm publish:vue
```

## 当前日志

<!--@include: ../../packages/vue/CHANGELOG.md-->
