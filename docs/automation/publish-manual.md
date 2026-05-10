# 发布操作手册

这份手册用于 `@danran_chen/custom-ui-vue` 的正式发布流程。发布命令会自动生成版本日志并更新版本号，发布前仍建议先做检查。

## 1. 自动生成版本日志条目

每次准备发新版本前，可以先运行自动生成命令预览版本日志草稿：

```bash
pnpm changeset:auto
```

它会自动读取当前分支相对 `origin/main` 的 git 提交，生成 `.changeset/auto-generated-release.md` 草稿。未提交的改动不会被收录，所以这一步通常放在相关 commit 完成之后。

如果自动摘要不够准确，可以直接编辑这个文件补充说明。

正式发布时不需要手动运行 `pnpm version:packages`，发布命令会自动完成这一步：

```bash
pnpm publish:vue
```

发布命令会再次自动生成版本日志，再根据 changeset 自动更新：

- `packages/vue/package.json` 的版本号
- `packages/vue/CHANGELOG.md` 的版本日志

## 2. 发布前检查

先确认工作区没有明显异常。

```bash
git status --short
pnpm release:check
```

`pnpm release:check` 必须通过，里面会依次检查：

- lint
- typecheck
- test
- package build
- docs build
- example build
- `npm pack --dry-run`

如果这一步失败，先修复失败项，再继续。

## 3. 确认发布包

当前发布包是：

```json
@danran_chen/custom-ui-vue
```

发布前请确认 `packages/vue/package.json` 里的包名正确。

```bash
sed -n '1,40p' packages/vue/package.json
```

如果需要发新版本，不要手改版本号，直接运行 `pnpm publish:vue`。脚本会自动生成 changeset 草稿，并在发布前更新版本号和 `CHANGELOG`。

## 4. 准备 npm 认证

先确认已登录：

```bash
npm whoami
```

如果没有登录，先执行：

```bash
npm login
```

如果 npm 要求 2FA，但你想走非交互发布，就需要在 npm 后台创建带 `Bypass 2FA` 的 granular token，然后配置到本机。

## 5. 真实发布

不要在仓库根目录直接 `npm publish`。  
请使用仓库脚本：

```bash
pnpm publish:vue
```

这条命令会自动生成版本日志、更新版本号，并只发布 `packages/vue`，不会发 workspace 根目录。

## 6. 发布后检查

发布成功后，建议确认两件事：

```bash
npm view @danran_chen/custom-ui-vue version
git status --short
```

- `npm view` 应该能看到新版本
- `git status` 应该只保留你还没提交的工作区改动

## 7. 文档站

发布 npm 后，推送到 GitHub 会自动触发文档部署。

```bash
git push
```

GitHub Pages 会根据 `.github/workflows/deploy-docs.yml` 自动构建 `docs/.vitepress/dist` 并发布。

## 8. 常见问题

### `EPRIVATE`

说明你在仓库根目录执行了 `npm publish`。  
正确做法是运行：

```bash
pnpm publish:vue
```

### `403 Forbidden`

通常是 npm token 认证或 2FA 问题。  
检查：

- 是否登录了正确的 npm 账号
- token 是否有 publish 权限
- token 是否允许 bypass 2FA

### `404 Not Found`

通常是包名 scope 没有归属或包名已被占用。  
当前使用的是个人 scope：

```json
@danran_chen/custom-ui-vue
```

### GitHub Pages 没更新

确认：

- 仓库是公开的
- `Settings -> Pages` 的 Source 选的是 `GitHub Actions`
- 最新 push 是否触发了 `Deploy Docs`
