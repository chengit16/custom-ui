# 组件流程

这份手册描述新增组件时的标准动作。目标是把“创建组件、写 demo、生成 API、补文档、做检查”变成固定流程。

## 1. 创建组件骨架

先用脚本生成基础文件：

```bash
pnpm create-component Button
```

脚本会创建组件目录、`props.ts`、demo、测试和文档入口。

## 2. 实现组件封装

把脚手架里的占位内容改成当前组件的真实实现：

- 基于 Naive UI 做二次封装
- 保留当前项目的命名风格
- 补齐事件、状态和受控属性
- 不要把组件做成只展示一个最小例子

## 3. 编写 demo

每个 demo 都要是真实可运行的 Vue 文件，放在：

```text
packages/vue/src/components/{component-name}/demo/
```

要求：

- demo 文件同时作为组件导入和源码导入
- 文档页里的预览和源码必须来自同一个 demo 文件
- 真实展示核心能力，不要只写一个空壳

示例：

```bash
packages/vue/src/components/button/demo/basic.vue
```

## 4. 写 props 注释

`props.ts` 是 API 文档的来源。  
所有 Props 都要写中文 JSDoc。

示例：

```ts
export interface ButtonProps {
  /** 文案 */
  text?: string;
  /** 圆角 */
  radius?: number;
  /** 尺寸 */
  size?: 'medium' | 'large';
}
```

## 5. 生成 API 文档

写完 `props.ts` 后，运行：

```bash
pnpm generate-api Button
```

生成结果会输出到：

```text
docs/components/generated/button-api.md
```

这一步不要手写 API 表，优先用脚本从 `props.ts` 生成。

## 6. 编写组件文档

组件文档放在：

```text
docs/components/button.md
```

建议结构：

1. 组件标题
2. 简短说明
3. 代码导入示例
4. 代码演示
5. API 表

文档里直接用 `DemoBlock` 绑定 demo 文件和源码。

## 7. 运行检查

组件开发完后，先做组件级检查：

```bash
pnpm check-component Button
```

再跑完整验证：

```bash
pnpm release:check
```

`pnpm release:check` 会依次检查：

- lint
- typecheck
- test
- build
- docs build
- example build
- `npm pack --dry-run`

## 8. 提交前确认

提交前建议确认：

```bash
git status --short
pnpm docs:build
```

如果组件文档、demo、API 和测试都通过，说明这个组件流程已经跑顺了。

## 9. 典型顺序

实际操作时，最常用的顺序是：

```bash
pnpm create-component Button
# 编辑组件、demo、props.ts、文档
pnpm generate-api Button
pnpm check-component Button
pnpm release:check
```
