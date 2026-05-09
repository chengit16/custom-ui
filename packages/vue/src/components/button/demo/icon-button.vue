<script setup lang="ts">
import { CustomButton } from '../index';
</script>

<template>
  <div class="button-demo">
    <CustomButton
      type="primary"
      circle
    >
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
    </CustomButton>
    <CustomButton
      secondary
      circle
    >
      <template #icon>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          class="button-demo__icon"
        >
          <path
            d="M5.5 3.5 10 8l-4.5 4.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
    </CustomButton>
    <CustomButton
      type="error"
      circle
    >
      <template #icon>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          class="button-demo__icon"
        >
          <path
            d="M4.5 4.5 11.5 11.5M11.5 4.5 4.5 11.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
          />
        </svg>
      </template>
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

.button-demo__icon {
  height: 14px;
  width: 14px;
}
</style>
