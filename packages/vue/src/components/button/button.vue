<script setup lang="ts">
import { NButton } from 'naive-ui';

import { ButtonProps } from './props';

defineOptions({
  name: 'CustomButton',
});

defineProps(ButtonProps);
</script>

<template>
  <NButton
    :type="type"
    :secondary="secondary"
    :tertiary="tertiary"
    :quaternary="quaternary"
    :strong="strong"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :block="block"
    :text="text"
    :round="round"
    :circle="circle"
    :ghost="ghost"
    :dashed="dashed"
    :color="color"
    :icon-placement="iconPlacement"
  >
    <template
      v-if="$slots.icon"
      #icon
    >
      <slot name="icon" />
    </template>
    <slot />
  </NButton>
</template>
