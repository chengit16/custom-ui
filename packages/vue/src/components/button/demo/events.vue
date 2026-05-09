<script setup lang="ts">
import { ref } from 'vue';

import { CustomButton } from '../index';

const count = ref(0);
</script>

<template>
  <div class="button-demo button-demo--events">
    <CustomButton
      type="primary"
      @click="count += 1"
    >
      点击次数：{{ count }}
    </CustomButton>
    <CustomButton
      secondary
      @click="count += 1"
    >
      再点一次
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
