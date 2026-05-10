# 版本日志

这份日志由 Changesets 驱动。新增组件、修复问题或修改文档时，优先运行自动生成命令，它会读取最近一次 release tag 之后的 git 提交，并自动写入 changeset 草稿；未提交的改动不会被收录。为了让生成日志保持中文，日常 git 提交说明也要使用中文。

> 说明：历史上已经存在的英文提交不会被自动翻译，新的提交按中文规范执行后，后续版本日志才会持续保持中文。

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

发布成功后，脚本会创建类似 `custom-ui-vue-v0.0.2` 这样的 release tag。后续自动日志就会从这个 tag 开始往后计算。

## 当前日志

<!--@include: ../../packages/vue/CHANGELOG.md-->
