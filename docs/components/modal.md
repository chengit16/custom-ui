# Modal 弹窗

<script setup>
import BasicDemo from '../../packages/vue/src/components/modal/demo/basic.vue';
import basicSource from '../../packages/vue/src/components/modal/demo/basic.vue?raw';
</script>

Modal 基于 Naive UI 的 `NModal` 二次封装，提供受控显示、标题、宽度、遮罩关闭和基础弹窗展示能力。

```ts
import { CustomModal } from '@danran_chen/custom-ui-vue';
```

## 代码演示

### 基础

<DemoBlock :source="basicSource">
  <BasicDemo />
</DemoBlock>

## API

<!--@include: ./generated/modal-api.md-->

### Modal Events

| 名称        | 说明                     |
| ----------- | ------------------------ |
| update:show | 弹窗显示状态变化时触发。 |
| close       | 弹窗关闭时触发。         |

### Modal Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 弹窗主体内容。 |
