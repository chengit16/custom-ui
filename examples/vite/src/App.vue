<script setup lang="ts">
import { CustomProvider, createCustomTheme } from '@custom-ui/vue';
import { NButton } from 'naive-ui';

const themeOverrides = createCustomTheme({
  primaryColor: '#2080f0'
});
</script>

<template>
  <CustomProvider :theme-overrides="themeOverrides">
    <main class="example-page">
      <h1>Custom UI Example</h1>
      <NButton type="primary">
        Naive UI through CustomProvider
      </NButton>
    </main>
  </CustomProvider>
</template>

<style scoped>
.example-page {
  padding: 32px;
}
</style>
