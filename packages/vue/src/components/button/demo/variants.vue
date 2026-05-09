<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo button-demo--vertical">
    <div class="button-demo__row">
      <CustomButton type="primary">
        主要
      </CustomButton>
      <CustomButton secondary>
        次要
      </CustomButton>
      <CustomButton> 默认 </CustomButton>
    </div>
    <div class="button-demo__row">
      <CustomButton
        type="primary"
        ghost
      >
        主要
      </CustomButton>
      <CustomButton ghost>
        默认
      </CustomButton>
      <CustomButton
        type="error"
        ghost
      >
        危险
      </CustomButton>
    </div>
    <div class="button-demo__row">
      <CustomButton
        type="primary"
        dashed
      >
        幽灵
      </CustomButton>
      <CustomButton
        type="primary"
        text
      >
        文本
      </CustomButton>
    </div>
  </div>
</template>

<style scoped>
.button-demo--vertical {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button-demo__row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
