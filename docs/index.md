---
layout: home
---

<script setup>
import { withBase } from 'vitepress';

const features = [
  { title: '文档站', text: 'VitePress 驱动，结构清楚，方便逐步扩展。' },
  { title: '组件库', text: '基于 Naive UI 二次封装，保留稳定、常用的交互。' },
  { title: '自动化', text: '生成 API、写入示例、检查发布，尽量少手工重复。' }
];
</script>

<div class="home-shell">
  <p class="home-kicker">Vue 3 + TypeScript + Vite + Naive UI</p>
  <h1 class="home-title">Custom UI</h1>
  <p class="home-lead">
    一个面向 Web 端的组件库工程，先把文档、示例和自动化流程跑顺，再逐步扩展组件。
  </p>

  <div class="home-actions">
    <a :href="withBase('/guide/getting-started')">快速开始</a>
    <a :href="withBase('/components/')">基础组件</a>
    <a :href="withBase('/automation/component-workflow')">自动化流程</a>
  </div>

  <div class="home-grid">
    <section
      v-for="feature in features"
      :key="feature.title"
      class="home-card"
    >
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.text }}</p>
    </section>
  </div>
</div>
