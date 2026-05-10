# 主题配置

`CustomProvider` 基于 Naive UI 的 `NConfigProvider` 封装，后续所有全局主题和组件默认配置都从这里进入。

## 基础用法

```vue
<script setup lang="ts">
import { CustomProvider, createCustomTheme } from '@danran_chen/custom-ui-vue';

const themeOverrides = createCustomTheme({
  primaryColor: '#2080f0',
});
</script>

<template>
  <CustomProvider :theme-overrides="themeOverrides">
    <App />
  </CustomProvider>
</template>
```

## 当前能力

`createCustomTheme` 当前主要负责统一主色，并把主色同步到 Naive UI 的常用 primary token：

- `primaryColor`
- `primaryColorHover`
- `primaryColorPressed`

这样业务侧只需要传入一个主色，就能得到基础一致的按钮、交互态和主题色表现。

## 使用建议

- 应用根节点只保留一个 `CustomProvider`。
- 组件库内部需要全局主题能力时，优先从 `CustomProvider` 扩展。
- 如果后续要支持暗黑模式、语言包或更多 token，优先在这里收口，不建议每个组件单独处理。
