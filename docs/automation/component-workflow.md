# 组件流程

新增组件时使用自动化脚本生成基础文件。

```bash
pnpm create-component Button
pnpm check-component Button
pnpm generate-api Button
```

标准流程：

1. 使用脚本创建组件。
2. 实现 Naive UI 二次封装。
3. 编写真实 demo 文件。
4. 生成 API 文档。
5. 使用 `DemoBlock` 在 VitePress 展示 demo。
6. 运行组件检查、测试和发布 dry-run。
