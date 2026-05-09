# Button 按钮

<script setup>
import BasicDemo from '../../packages/vue/src/components/button/demo/basic.vue';
import ColorDemo from '../../packages/vue/src/components/button/demo/color.vue';
import DashedDemo from '../../packages/vue/src/components/button/demo/dashed.vue';
import EventsDemo from '../../packages/vue/src/components/button/demo/events.vue';
import GroupDemo from '../../packages/vue/src/components/button/demo/group.vue';
import IconButtonDemo from '../../packages/vue/src/components/button/demo/icon-button.vue';
import LabelDemo from '../../packages/vue/src/components/button/demo/label.vue';
import LoadingDemo from '../../packages/vue/src/components/button/demo/loading.vue';
import PopoverDemo from '../../packages/vue/src/components/button/demo/popover.vue';
import QuaternaryDemo from '../../packages/vue/src/components/button/demo/quaternary.vue';
import SecondaryDemo from '../../packages/vue/src/components/button/demo/secondary.vue';
import ShapeDemo from '../../packages/vue/src/components/button/demo/shape.vue';
import IconsDemo from '../../packages/vue/src/components/button/demo/icons.vue';
import SizesDemo from '../../packages/vue/src/components/button/demo/sizes.vue';
import TertiaryDemo from '../../packages/vue/src/components/button/demo/tertiary.vue';
import StatesDemo from '../../packages/vue/src/components/button/demo/states.vue';
import TextDemo from '../../packages/vue/src/components/button/demo/text.vue';
import TransparentDemo from '../../packages/vue/src/components/button/demo/transparent.vue';
import basicSource from '../../packages/vue/src/components/button/demo/basic.vue?raw';
import colorSource from '../../packages/vue/src/components/button/demo/color.vue?raw';
import dashedSource from '../../packages/vue/src/components/button/demo/dashed.vue?raw';
import eventsSource from '../../packages/vue/src/components/button/demo/events.vue?raw';
import groupSource from '../../packages/vue/src/components/button/demo/group.vue?raw';
import iconButtonSource from '../../packages/vue/src/components/button/demo/icon-button.vue?raw';
import iconsSource from '../../packages/vue/src/components/button/demo/icons.vue?raw';
import labelSource from '../../packages/vue/src/components/button/demo/label.vue?raw';
import loadingSource from '../../packages/vue/src/components/button/demo/loading.vue?raw';
import popoverSource from '../../packages/vue/src/components/button/demo/popover.vue?raw';
import quaternarySource from '../../packages/vue/src/components/button/demo/quaternary.vue?raw';
import secondarySource from '../../packages/vue/src/components/button/demo/secondary.vue?raw';
import shapeSource from '../../packages/vue/src/components/button/demo/shape.vue?raw';
import sizesSource from '../../packages/vue/src/components/button/demo/sizes.vue?raw';
import tertiarySource from '../../packages/vue/src/components/button/demo/tertiary.vue?raw';
import statesSource from '../../packages/vue/src/components/button/demo/states.vue?raw';
import textSource from '../../packages/vue/src/components/button/demo/text.vue?raw';
import transparentSource from '../../packages/vue/src/components/button/demo/transparent.vue?raw';
</script>

Button 基于 Naive UI 的 `NButton` 二次封装，保留常用按钮状态，并使用 `CustomButton` 作为对外组件名。

```ts
import { CustomButton } from '@custom-ui/vue';
```

## 代码演示

### 基础

<DemoBlock :source="basicSource">
  <BasicDemo />
</DemoBlock>

### 次要按钮

<DemoBlock :source="secondarySource">
  <SecondaryDemo />
</DemoBlock>

### 次次要按钮

<DemoBlock :source="tertiarySource">
  <TertiaryDemo />
</DemoBlock>

### 次次次要按钮

<DemoBlock :source="quaternarySource">
  <QuaternaryDemo />
</DemoBlock>

### 虚线按钮

<DemoBlock :source="dashedSource">
  <DashedDemo />
</DemoBlock>

### 尺寸

<DemoBlock :source="sizesSource">
  <SizesDemo />
</DemoBlock>

### 文本按钮

<DemoBlock :source="textSource">
  <TextDemo />
</DemoBlock>

### 标签

<DemoBlock :source="labelSource">
  <LabelDemo />
</DemoBlock>

### 禁用

<DemoBlock :source="statesSource">
  <StatesDemo />
</DemoBlock>

### 图标

<DemoBlock :source="iconsSource">
  <IconsDemo />
</DemoBlock>

### 事件

<DemoBlock :source="eventsSource">
  <EventsDemo />
</DemoBlock>

### 形状

<DemoBlock :source="shapeSource">
  <ShapeDemo />
</DemoBlock>

### 透明背景

<DemoBlock :source="transparentSource">
  <TransparentDemo />
</DemoBlock>

### 加载中

<DemoBlock :source="loadingSource">
  <LoadingDemo />
</DemoBlock>

### 自定义颜色

<DemoBlock :source="colorSource">
  <ColorDemo />
</DemoBlock>

### 按钮组

<DemoBlock :source="groupSource">
  <GroupDemo />
</DemoBlock>

### 使用图标作为按钮

<DemoBlock :source="iconButtonSource">
  <IconButtonDemo />
</DemoBlock>

### 配合 Popover 的特殊情况

<ClientOnly>
  <DemoBlock :source="popoverSource">
    <PopoverDemo />
  </DemoBlock>
</ClientOnly>

## API

<!--@include: ./generated/button-api.md-->

### Button Slots

| 名称 | 说明           |
| ---- | -------------- |
| icon | 按钮图标插槽。 |

### ButtonGroup Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 按钮组内容。 |
