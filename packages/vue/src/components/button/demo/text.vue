<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      type="primary"
      text
    >
      文本按钮
    </CustomButton>
    <CustomButton
      type="primary"
      text
      disabled
    >
      文本禁用
    </CustomButton>
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
