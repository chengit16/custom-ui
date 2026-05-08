<script setup lang="ts">
import { NButton } from 'naive-ui';

import { ButtonProps } from './props';

defineOptions({
  name: 'CustomButton'
});

defineProps(ButtonProps);
</script>

<template>
  <NButton
    :type="type"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :block="block"
    :secondary="secondary"
    :text="text"
    :round="round"
    :circle="circle"
    :ghost="ghost"
    :dashed="dashed"
  >
    <slot />
  </NButton>
</template>
