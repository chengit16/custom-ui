<script setup lang="ts">
import { CustomButton, CustomButtonGroup } from '../index';
</script>

<template>
  <CustomButtonGroup
    block
    :gap="12"
    class="button-group-demo"
  >
    <CustomButton
      type="primary"
      block
    >
      主要操作
    </CustomButton>
    <CustomButton
      secondary
      block
    >
      次要操作
    </CustomButton>
  </CustomButtonGroup>
</template>

<style scoped>
.button-group-demo {
  max-width: 375px;
}
</style>
