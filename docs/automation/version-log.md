# 版本日志

这份日志由 Changesets 驱动。新增组件、修复问题或修改文档时，先写 changeset；在准备发布时执行版本更新，日志会自动合并到这里引用的 `packages/vue/CHANGELOG.md`。

## 使用方式

1. 变更完成后运行：

```bash
pnpm changeset
```

2. 按提示选择这次变更影响的包和版本类型。
3. 准备发布时运行：

```bash
pnpm version:packages
```

4. 再继续执行：

```bash
pnpm release:check
pnpm publish:vue
```

## 当前日志

<!--@include: ../../packages/vue/CHANGELOG.md-->
