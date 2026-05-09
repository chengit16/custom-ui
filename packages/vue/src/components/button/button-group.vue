<script setup lang="ts">
import { computed } from 'vue';

import { ButtonGroupProps } from './props';

defineOptions({
  name: 'CustomButtonGroup',
});

const props = defineProps(ButtonGroupProps);

const gapValue = computed(() =>
  typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
);
</script>

<template>
  <div
    class="custom-button-group"
    :class="{
      'custom-button-group--vertical': direction === 'vertical',
      'custom-button-group--block': block,
    }"
    :style="{ gap: gapValue }"
  >
    <slot />
  </div>
</template>

<style scoped>
.custom-button-group {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
}

.custom-button-group--vertical {
  align-items: flex-start;
  flex-direction: column;
}

.custom-button-group--block {
  display: flex;
  width: 100%;
}

.custom-button-group--block :deep(.n-button) {
  flex: 1;
}
</style>
