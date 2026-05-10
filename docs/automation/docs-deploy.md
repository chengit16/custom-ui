# 文档部署

这份手册用于搭建、维护和部署 Custom UI 的 VitePress 文档站。

## 1. 本地启动

首次拉取项目后，先安装依赖：

```bash
pnpm install
```

启动文档站：

```bash
pnpm docs:dev
```

默认会启动 VitePress，本地用于预览文档、组件 demo 和 API 表格。

## 2. 文档目录

当前文档站主要目录：

```text
docs/
  index.md
  guide/
  components/
  automation/
  .vitepress/
```

- `docs/index.md`：文档首页
- `docs/guide/`：快速开始、主题配置等基础指南
- `docs/components/`：组件文档
- `docs/components/generated/`：由脚本生成的 API 表格
- `docs/automation/`：组件流程、发布手册和文档部署说明
- `docs/.vitepress/config.ts`：导航、侧栏、站点配置
- `docs/.vitepress/theme/`：自定义主题、DemoBlock 和样式

## 3. 新增页面

新增普通文档页时：

1. 在 `docs/guide` 或 `docs/automation` 下创建 Markdown 文件。
2. 在 `docs/.vitepress/config.ts` 的 `sidebar` 中增加入口。
3. 运行文档构建确认无误。

```bash
pnpm docs:build
```

## 4. 组件文档

组件文档放在：

```text
docs/components/{component-name}.md
```

组件 demo 放在：

```text
packages/vue/src/components/{component-name}/demo/
```

组件文档需要包含：

- 组件简介
- 真实 demo
- `DemoBlock` 源码展示
- API 表格

API 表格不要手写，优先从 `props.ts` 的中文 JSDoc 生成：

```bash
pnpm generate-api Button
```

生成后的文件位于：

```text
docs/components/generated/button-api.md
```

## 5. 首页链接

文档站部署在 GitHub Pages 子路径：

```text
/custom-ui/
```

因此首页里手写链接时，不要直接写：

```html
<a href="/guide/getting-started">快速开始</a>
```

应该使用 VitePress 的 `withBase`：

```vue
<script setup>
import { withBase } from 'vitepress';
</script>

<a :href="withBase('/guide/getting-started')">快速开始</a>
```

这样本地和 GitHub Pages 都能正常跳转。

## 6. 构建文档

发布前或提交前建议运行：

```bash
pnpm docs:build
```

构建产物位于：

```text
docs/.vitepress/dist
```

这个目录由 GitHub Actions 使用，不需要手动提交。

## 7. GitHub Pages 自动部署

当前文档部署使用 GitHub Pages。  
代码推送到 `main` 分支后，会自动触发：

```text
.github/workflows/deploy-docs.yml
```

部署流程：

1. Checkout 代码
2. 安装 pnpm 和 Node
3. 安装依赖
4. 执行 `pnpm docs:build`
5. 上传 `docs/.vitepress/dist`
6. 发布到 GitHub Pages

首次启用 GitHub Pages 时，需要在仓库设置中选择：

```text
Settings -> Pages -> Source -> GitHub Actions
```

## 8. 常见问题

### 首页按钮 404

原因通常是首页手写了 `/guide/...` 这类绝对路径。  
改成 `withBase('/guide/...')`。

### 右上角导航正常，首页按钮不正常

右上角导航由 VitePress 自动处理 `base`。  
首页自定义 `<a>` 需要自己使用 `withBase`。

### GitHub Pages 不更新

检查：

- 最新代码是否已推送到 `main`
- GitHub Actions 里的 `Deploy Docs` 是否成功
- 仓库 `Settings -> Pages` 是否选择 `GitHub Actions`

### 本地能打开，线上 404

优先检查：

- `docs/.vitepress/config.ts` 中的 `base`
- 首页或自定义组件里的手写链接
- Markdown 中是否用了硬编码绝对路径
