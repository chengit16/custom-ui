# 发布检查

第一阶段不发布 npm，只执行发布前 dry-run。

```bash
pnpm release:check
```

该命令必须执行类型检查、测试、构建、文档构建和 `npm pack --dry-run`，不能包含真实发布步骤。

## 文档部署

如果仓库托管在 Gitee，可以先执行：

```bash
pnpm docs:build
pnpm docs:deploy:gitee
```

该流程会把 `docs/.vitepress/dist` 推送到仓库的 `pages` 分支，供 Gitee Pages 发布使用。首次使用时，需要在 Gitee 仓库页面里手动开启 Pages，并选择 `pages` 分支作为发布源。
