<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      type="primary"
      size="medium"
    >
      中尺寸
    </CustomButton>
    <CustomButton
      type="primary"
      size="large"
    >
      大尺寸
    </CustomButton>
  </div>
</template>

<style scoped>
.button-demo {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
