# 发布检查

第一阶段不发布 npm，只执行发布前 dry-run。

```bash
pnpm release:check
```

该命令必须执行类型检查、测试、构建、文档构建和 `npm pack --dry-run`，不能包含真实发布步骤。
