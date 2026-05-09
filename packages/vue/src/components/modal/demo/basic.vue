<script setup lang="ts">
import { ref } from 'vue';
import { CustomButton } from '../../button';
import { CustomModal } from '../index';

const show = ref(false);
</script>

<template>
  <CustomButton
    type="primary"
    @click="show = true"
  >
    打开弹窗
  </CustomButton>

  <CustomModal
    v-model:show="show"
    title="确认操作"
  >
    这是一个基于 Naive UI NModal 封装的基础弹窗。
  </CustomModal>
</template>
