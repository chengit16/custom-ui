<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo button-demo--vertical">
    <div class="button-demo__row">
      <CustomButton type="primary">
        主要按钮
      </CustomButton>
      <CustomButton
        type="primary"
        disabled
      >
        主要禁用
      </CustomButton>
    </div>
    <div class="button-demo__row">
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
    <div class="button-demo__row">
      <CustomButton
        type="primary"
        ghost
      >
        幽灵按钮
      </CustomButton>
      <CustomButton
        type="primary"
        ghost
        disabled
      >
        幽灵禁用
      </CustomButton>
    </div>
    <div class="button-demo__row">
      <CustomButton
        type="primary"
        text
      >
        文本按钮
      </CustomButton>
      <CustomButton
        type="primary"
        text
        disabled
      >
        文本禁用
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
