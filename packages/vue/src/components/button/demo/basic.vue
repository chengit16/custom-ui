<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton type="primary">
      主要按钮
    </CustomButton>
    <CustomButton>
      默认按钮
    </CustomButton>
    <CustomButton secondary>
      次要按钮
    </CustomButton>
    <CustomButton dashed>
      虚线按钮
    </CustomButton>
    <CustomButton loading>
      加载中
    </CustomButton>
    <CustomButton disabled>
      禁用按钮
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
