<script setup lang="ts">
import { computed } from 'vue';
import { NModal } from 'naive-ui';

import { ModalProps } from './props';

defineOptions({
  name: 'CustomModal'
});

const props = defineProps(ModalProps);
const emit = defineEmits<{
  'update:show': [value: boolean];
  close: [];
}>();

const style = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width
}));

function handleUpdateShow(value: boolean) {
  emit('update:show', value);

  if (!value) {
    emit('close');
  }
}
</script>

<template>
  <NModal
    :show="show"
    :title="title"
    :style="style"
    :preset="preset"
    :mask-closable="maskClosable"
    :closable="closable"
    :bordered="bordered"
    :auto-focus="autoFocus"
    @update:show="handleUpdateShow"
  >
    <slot />
  </NModal>
</template>
