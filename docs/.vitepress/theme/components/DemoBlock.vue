<script setup lang="ts">
import { computed, ref } from 'vue';
import { normalizeDemoSource } from '../demo-source';

const props = defineProps<{
  source: string;
}>();

const expanded = ref(false);
const copied = ref(false);

const demoSource = computed(() => normalizeDemoSource(props.source));

async function copySource() {
  await navigator.clipboard.writeText(demoSource.value.code);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1200);
}
</script>

<template>
  <section class="custom-demo">
    <div class="custom-demo__preview">
      <slot />
    </div>
    <div class="custom-demo__toolbar">
      <button type="button" @click="copySource">
        {{ copied ? '已复制' : '复制代码' }}
      </button>
      <button type="button" @click="expanded = !expanded">
        {{ expanded ? '收起代码' : '展开代码' }}
      </button>
    </div>
    <pre v-if="expanded" class="custom-demo__source"><code>{{ demoSource.code }}</code></pre>
  </section>
</template>
