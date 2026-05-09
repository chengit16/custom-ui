<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton type="primary">
      <template #icon>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          class="button-demo__icon"
        >
          <path
            d="M8 3.5v9M3.5 8h9"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
      左侧图标
    </CustomButton>
    <CustomButton type="primary">
      右侧图标
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        class="button-demo__icon button-demo__icon--right"
      >
        <path
          d="M5.5 3.5 10 8l-4.5 4.5"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CustomButton>
    <CustomButton type="primary">
      <template #icon>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          class="button-demo__icon"
        >
          <path
            d="M8 3.5v9M3.5 8h9"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
      两侧图标
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        class="button-demo__icon button-demo__icon--right"
      >
        <path
          d="M5.5 3.5 10 8l-4.5 4.5"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CustomButton>
  </div>
</template>

<style scoped>
.button-demo {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button-demo__icon {
  height: 14px;
  width: 14px;
}

.button-demo__icon--right {
  margin-left: 2px;
}
</style>
