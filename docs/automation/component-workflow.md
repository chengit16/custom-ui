# 组件流程

当前项目采用“轻量版 Skill + 少量 Scripts”：

- Skill 负责组件设计、Naive UI 封装判断、demo 和文档表达。
- Scripts 只负责重复且确定的动作：创建骨架、检查关键文件、从 `props.ts` 生成 API 文档、发布前 dry-run。

新增组件时先使用自动化脚本生成基础文件。

```bash
pnpm create-component Button
pnpm check-component Button
pnpm generate-api Button
```

标准流程：

1. 使用脚本创建组件。
2. 把脚手架里的占位 props、demo 和文档改成当前组件的真实内容。
3. 实现 Naive UI 二次封装。
4. 编写真实 demo 文件，并在 `props.ts` 里写清每个属性的中文 JSDoc。
5. 运行 `pnpm generate-api Button` 之类的命令，直接从 `props.ts` 生成 API 文档。
6. 使用 `DemoBlock` 在 VitePress 展示 demo。
7. 运行组件检查、测试和发布 dry-run。
