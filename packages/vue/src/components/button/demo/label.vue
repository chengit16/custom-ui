<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      type="primary"
      round
    >
      标签一
    </CustomButton>
    <CustomButton
      secondary
      round
    >
      标签二
    </CustomButton>
    <CustomButton round>
      标签三
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
