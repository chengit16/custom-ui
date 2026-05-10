# 主题配置

`CustomProvider` 基于 Naive UI 的 `NConfigProvider` 封装，后续所有全局主题和组件默认配置都从这里进入。

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
