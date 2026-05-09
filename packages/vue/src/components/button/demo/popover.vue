<script setup lang="ts">
import { NPopover } from 'naive-ui';

import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <NPopover trigger="hover">
      <template #trigger>
        <CustomButton type="primary">
          悬浮查看
        </CustomButton>
      </template>
      这是一个 Popover 提示
    </NPopover>
  </div>
</template>

<style scoped>
.button-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
