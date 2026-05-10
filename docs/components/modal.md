# Modal

<script setup>
import BasicDemo from '../../packages/vue/src/components/modal/demo/basic.vue';
import basicSource from '../../packages/vue/src/components/modal/demo/basic.vue?raw';
</script>

Modal 基于 Naive UI 的 `NModal` 二次封装，提供常用弹窗展示、标题和关闭行为。

```ts
import { Modal } from '@danran_chen/custom-ui-vue';
```

## 基本形状

<DemoBlock :source="basicSource">
  <BasicDemo />
</DemoBlock>

## API

<!--@include: ./generated/modal-api.md-->
