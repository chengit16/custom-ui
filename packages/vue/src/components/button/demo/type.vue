<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton> 默认按钮 </CustomButton>
    <CustomButton type="primary">
      主要按钮
    </CustomButton>
    <CustomButton type="success">
      成功按钮
    </CustomButton>
    <CustomButton type="info">
      信息按钮
    </CustomButton>
    <CustomButton type="warning">
      警告按钮
    </CustomButton>
    <CustomButton type="error">
      错误按钮
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
