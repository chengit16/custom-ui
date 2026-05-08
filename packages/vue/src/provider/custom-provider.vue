<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui';

defineOptions({
  name: 'CustomProvider'
});

defineProps<{
  themeOverrides?: GlobalThemeOverrides;
}>();
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <slot />
  </NConfigProvider>
</template>
