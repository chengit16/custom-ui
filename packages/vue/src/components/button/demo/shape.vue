<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      type="primary"
      round
    >
      圆角按钮
    </CustomButton>
    <CustomButton
      type="primary"
      circle
    >
      圆
    </CustomButton>
    <CustomButton
      secondary
      circle
    >
      形
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
