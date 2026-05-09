<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      color="#18a058"
      type="primary"
    >
      自定义绿色
    </CustomButton>
    <CustomButton
      color="#d03050"
      type="primary"
    >
      自定义红色
    </CustomButton>
    <CustomButton
      color="#2080f0"
      type="primary"
    >
      自定义蓝色
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
