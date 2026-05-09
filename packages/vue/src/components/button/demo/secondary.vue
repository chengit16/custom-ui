<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton secondary>
      次要按钮
    </CustomButton>
    <CustomButton
      secondary
      disabled
    >
      次要禁用
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
