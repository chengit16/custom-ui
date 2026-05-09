<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo button-demo--canvas">
    <CustomButton
      type="primary"
      ghost
    >
      透明背景
    </CustomButton>
    <CustomButton
      secondary
      ghost
    >
      次要透明
    </CustomButton>
    <CustomButton
      type="error"
      ghost
    >
      危险透明
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

.button-demo--canvas {
  background: linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%);
  padding: 8px 0;
}
</style>
