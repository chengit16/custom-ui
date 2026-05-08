---
name: release-checker
description: 在不发布的前提下运行并解读 Custom UI 的发布 dry-run 检查。
---

# 发布检查

在任何发布决策前使用此技能。

## 必须流程

1. 运行 `pnpm release:check`。
2. 确认过程中没有执行任何 `npm publish` 或等价发布命令。
3. 检查 `npm pack --dry-run` 输出，确认没有多余文件。
4. 确认包名仍然是 `@custom-ui/vue`，除非用户已经批准最终发布名。
5. 在真正发布前汇总阻断项。

## 当前 Phase 1 注意事项

如果 `SmokeTest` 这个脚手架仍然被公开导出，或者仍然存在于 `packages/vue/dist`，那么 `pnpm release:check` 预期会失败。这不是工具故障，而是发布阻断。

## 失败分支处理

- 如果先触发的是 `SmokeTest` 阻断，说明当前还不能进入 `npm pack --dry-run`。
- 这时先移除公开的 `SmokeTest` 导出，再清理或重建 `dist`，然后重新运行 `pnpm release:check`。
- 只有在 `SmokeTest` 阻断解除后，才需要关注 `npm pack --dry-run` 的输出。
