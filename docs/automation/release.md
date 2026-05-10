# 发布检查

> 这页是早期发布检查说明，完整发布流程请以 [发布操作手册](/automation/publish-manual) 为准；文档站部署请看 [文档部署](/automation/docs-deploy)。

第一阶段不发布 npm，只执行发布前 dry-run。

```bash
pnpm release:check
```

该命令必须执行类型检查、测试、构建、文档构建和 `npm pack --dry-run`，不能包含真实发布步骤。

真实发布时不要在仓库根目录执行 `npm publish`，应该使用：

```bash
pnpm publish:vue
```

## 文档部署

文档站使用 GitHub Pages 自动部署。代码推送到 `main` 分支后，GitHub Actions 会自动执行：

```bash
pnpm docs:build
```

构建产物来自 `docs/.vitepress/dist`，由 `.github/workflows/deploy-docs.yml` 上传到 GitHub Pages。首次使用时，需要在 GitHub 仓库的 `Settings` -> `Pages` 中选择 `GitHub Actions` 作为发布源。
