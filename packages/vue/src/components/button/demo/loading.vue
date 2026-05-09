<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      type="primary"
      loading
    >
      加载中
    </CustomButton>
    <CustomButton
      secondary
      loading
    >
      提交中
    </CustomButton>
    <CustomButton
      type="primary"
      loading
      disabled
    >
      禁用加载中
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
