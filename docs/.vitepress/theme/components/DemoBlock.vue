<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { normalizeDemoSource } from '../demo-source';

const props = defineProps<{
  source: string;
}>();

const expanded = ref(false);
const copied = ref(false);
const copyFailed = ref(false);
const sourceId = useId();

const demoSource = computed(() => normalizeDemoSource(props.source));
const copyLabel = computed(() => {
  if (copied.value) {
    return '已复制';
  }

  if (copyFailed.value) {
    return '复制失败';
  }

  return '复制代码';
});

async function copySource() {
  copyFailed.value = false;

  try {
    const writeText = globalThis.navigator?.clipboard?.writeText;

    if (!writeText) {
      throw new Error('Clipboard API is unavailable.');
    }

    await writeText.call(globalThis.navigator.clipboard, demoSource.value.code);
    copied.value = true;
  } catch {
    copyFailed.value = true;
  }

  globalThis.setTimeout(() => {
    copied.value = false;
    copyFailed.value = false;
  }, 1200);
}
</script>

<template>
  <section class="custom-demo">
    <div class="custom-demo__preview">
      <slot />
    </div>
    <div class="custom-demo__toolbar">
      <button
        type="button"
        @click="copySource"
      >
        {{ copyLabel }}
      </button>
      <button
        type="button"
        :aria-controls="sourceId"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        {{ expanded ? '收起代码' : '展开代码' }}
      </button>
    </div>
    <p
      class="custom-demo__status"
      aria-live="polite"
    >
      {{ copyLabel }}
    </p>
    <pre
      v-if="expanded"
      :id="sourceId"
      class="custom-demo__source"
      aria-label="示例源码"
    ><code>{{ demoSource.code }}</code></pre>
  </section>
</template>
