---
name: release-checker
description: 在不发布的前提下运行或解读 Custom UI 发布 dry-run 检查时使用。
---

# 发布检查

用于发布前 dry-run。此 skill 只做检查和解释，不执行真实发布。

## 必须流程

1. 运行：

```bash
pnpm release:check
```

2. 确认没有执行 `npm publish`、`pnpm publish` 或等价发布命令。
3. 如果检查失败，先解释第一个阻断项，不要跳到后续发布步骤。
4. 如果检查通过，再查看 `npm pack --dry-run` 输出，确认包内容干净。

## 发布门禁

发布前必须确认：

- `pnpm lint` 通过。
- `pnpm typecheck` 通过。
- `pnpm test` 通过。
- `pnpm build` 通过。
- `pnpm docs:build` 通过。
- example build 通过。
- `SmokeTest` 没有公开导出。
- `packages/vue/dist` 不包含 `smoke-test` 产物。
- 包名和版本符合用户确认的发布计划。

## SmokeTest 阻断

如果 `pnpm release:check` 报告：

- `packages/vue/src/components/index.ts` 仍导出 `SmokeTest`
- `packages/vue/dist` 存在 `components/smoke-test`

这不是工具故障，而是发布保护。处理顺序：

1. 移除公开 `SmokeTest` 导出。
2. 清理或重建 `packages/vue/dist`。
3. 重新运行 `pnpm release:check`。

## 输出要求

- 说明 dry-run 是否通过。
- 说明没有执行真实发布。
- 如果失败，列出阻断项和下一步。
- 如果通过，列出 pack 内容中的风险项或确认无明显多余文件。
