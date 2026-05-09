<script setup lang="ts">
import { codeToHtml } from 'shiki';
import { computed, onServerPrefetch, ref, useId, watch } from 'vue';
import { normalizeDemoSource } from '../demo-source';

const props = defineProps<{
  source: string;
}>();

const expanded = ref(false);
const copied = ref(false);
const copyFailed = ref(false);
const highlightedSource = ref('');
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

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function highlightSource() {
  try {
    highlightedSource.value = await codeToHtml(demoSource.value.code, {
      lang: 'vue',
      theme: 'github-light',
    });
  } catch {
    highlightedSource.value = `<pre><code>${escapeHtml(demoSource.value.code)}</code></pre>`;
  }
}

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

watch(
  () => demoSource.value.code,
  () => {
    void highlightSource();
  },
  { immediate: true },
);

onServerPrefetch(highlightSource);
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
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          class="custom-demo__icon"
        >
          <path
            d="M5.5 5.5H4a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1V11"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="6.5"
            y="2.5"
            width="6.5"
            height="6.5"
            rx="1"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ copyLabel }}
      </button>
      <button
        type="button"
        :aria-controls="sourceId"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        <span
          aria-hidden="true"
          class="custom-demo__icon custom-demo__icon--text"
        >
          &lt;&gt;
        </span>
        {{ expanded ? '收起代码' : '展开代码' }}
      </button>
    </div>
    <p
      class="custom-demo__status"
      aria-live="polite"
    >
      {{ copyLabel }}
    </p>
    <div
      v-if="expanded"
      :id="sourceId"
      class="custom-demo__source"
      aria-label="示例源码"
      :innerHTML="highlightedSource"
    />
  </section>
</template>
