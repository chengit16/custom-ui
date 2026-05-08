<script setup lang="ts">
import { SmokeTestProps } from './props';

defineOptions({
  name: 'CustomSmokeTest'
});

defineProps(SmokeTestProps);
</script>

<template>
  <div class="custom-smoke-test">
    <slot />
  </div>
</template>
