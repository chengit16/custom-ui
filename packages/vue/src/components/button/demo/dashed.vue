<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      type="primary"
      dashed
    >
      虚线按钮
    </CustomButton>
    <CustomButton
      type="primary"
      dashed
      disabled
    >
      虚线禁用
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
