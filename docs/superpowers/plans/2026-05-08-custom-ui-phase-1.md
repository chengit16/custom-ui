# Custom UI Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first usable foundation for `@custom-ui/vue`: monorepo, Vue package, VitePress docs, examples app, automation scripts, release dry-run, and AI skills.

**Architecture:** Use a pnpm workspace with one library package in `packages/vue`, one VitePress docs app in `docs`, and one Vite example app in `examples/vite`. Keep automation in `scripts` and make AI skills call those scripts instead of relying on ad hoc file creation.

**Tech Stack:** Vue 3, TypeScript, Vite, VitePress, Naive UI, pnpm, Vitest, ESLint, Changesets, tsx.

---

## File Structure Map

- `package.json`: root workspace scripts and shared dev dependencies.
- `pnpm-workspace.yaml`: workspace package discovery.
- `tsconfig.base.json`: shared TypeScript defaults.
- `eslint.config.mjs`: root ESLint flat config.
- `.changeset/config.json`: dry-run release configuration.
- `packages/vue/package.json`: package metadata for `@custom-ui/vue`.
- `packages/vue/vite.config.ts`: library build configuration.
- `packages/vue/tsconfig.json`: library TypeScript configuration.
- `packages/vue/src/index.ts`: public package exports.
- `packages/vue/src/provider/custom-provider.vue`: Custom UI provider wrapping Naive UI config provider.
- `packages/vue/src/provider/index.ts`: provider exports.
- `packages/vue/src/theme/index.ts`: theme token helpers.
- `packages/vue/src/components/index.ts`: component barrel export.
- `packages/vue/src/vite-env.d.ts`: Vue SFC typing.
- `packages/vue/src/__tests__/exports.test.ts`: smoke test for public exports.
- `docs/package.json`: VitePress app metadata and scripts.
- `docs/.vitepress/config.ts`: site navigation and sidebar.
- `docs/.vitepress/theme/index.ts`: site theme entry and global component registration.
- `docs/.vitepress/theme/styles.css`: docs styling, including demo card styling.
- `docs/.vitepress/theme/components/DemoBlock.vue`: demo preview and source display.
- `docs/index.md`: docs home page.
- `docs/guide/getting-started.md`: installation and basic setup.
- `docs/guide/theme.md`: provider and theme guide.
- `docs/automation/component-workflow.md`: component workflow guide.
- `docs/automation/release.md`: release dry-run guide.
- `docs/components/index.md`: component section landing page.
- `examples/vite/package.json`: example app metadata and scripts.
- `examples/vite/index.html`: example app host HTML.
- `examples/vite/src/main.ts`: example app bootstrap.
- `examples/vite/src/App.vue`: example app UI.
- `examples/vite/tsconfig.json`: example app TypeScript config.
- `examples/vite/vite.config.ts`: example Vite config.
- `scripts/shared/names.ts`: component name parsing helpers.
- `scripts/create-component.ts`: component scaffold generator.
- `scripts/check-component.ts`: component workflow artifact checker.
- `scripts/generate-api.ts`: API table generator from constrained metadata.
- `scripts/release-check.ts`: non-publishing release validation runner.
- `.agents/skills/development-spec/SKILL.md`: Vue component library standards.
- `.agents/skills/create-component/SKILL.md`: AI component creation workflow.
- `.agents/skills/docs-writer/SKILL.md`: AI documentation workflow.
- `.agents/skills/code-reviewer/SKILL.md`: AI component review workflow.
- `.agents/skills/release-checker/SKILL.md`: AI dry-run release workflow.

## Task 1: Root Workspace Scaffold

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `eslint.config.mjs`
- Create: `.changeset/config.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create root `package.json`**

Create `package.json` with:

```json
{
  "name": "custom-ui-workspace",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=20.19.0",
    "pnpm": ">=10.0.0"
  },
  "scripts": {
    "build": "pnpm --filter @custom-ui/vue build",
    "docs:dev": "pnpm --filter @custom-ui/docs dev",
    "docs:build": "pnpm --filter @custom-ui/docs build",
    "example:dev": "pnpm --filter @custom-ui/example-vite dev",
    "lint": "eslint .",
    "typecheck": "pnpm --filter @custom-ui/vue typecheck && pnpm --filter @custom-ui/docs typecheck && pnpm --filter @custom-ui/example-vite typecheck",
    "test": "vitest run",
    "create-component": "tsx scripts/create-component.ts",
    "check-component": "tsx scripts/check-component.ts",
    "generate-api": "tsx scripts/generate-api.ts",
    "release:check": "tsx scripts/release-check.ts"
  },
  "devDependencies": {
    "@changesets/cli": "^2.29.7",
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/eslint-config-typescript": "^14.6.0",
    "eslint": "^9.39.1",
    "tsx": "^4.20.6",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4",
    "vitest": "^4.0.13",
    "vue": "^3.5.25",
    "vue-tsc": "^3.1.5"
  }
}
```

- [ ] **Step 2: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - packages/*
  - docs
  - examples/*
```

- [ ] **Step 3: Create `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "types": ["node"]
  }
}
```

- [ ] **Step 4: Create `eslint.config.mjs`**

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
      '**/coverage/**',
      '**/node_modules/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
```

- [ ] **Step 5: Create `.changeset/config.json`**

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.1.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@custom-ui/docs", "@custom-ui/example-vite"]
}
```

- [ ] **Step 6: Update `.gitignore`**

Ensure `.gitignore` contains:

```gitignore
.superpowers/
node_modules/
dist/
coverage/
.DS_Store
.vitepress/cache/
.vitepress/dist/
*.tsbuildinfo
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
pnpm install
```

Expected: lockfile is created and all workspace dependencies install successfully.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-workspace.yaml tsconfig.base.json eslint.config.mjs .changeset/config.json .gitignore pnpm-lock.yaml
git commit -m "chore: scaffold workspace tooling"
```

## Task 2: Vue Library Package

**Files:**
- Create: `packages/vue/package.json`
- Create: `packages/vue/tsconfig.json`
- Create: `packages/vue/vite.config.ts`
- Create: `packages/vue/src/index.ts`
- Create: `packages/vue/src/components/index.ts`
- Create: `packages/vue/src/provider/custom-provider.vue`
- Create: `packages/vue/src/provider/index.ts`
- Create: `packages/vue/src/theme/index.ts`
- Create: `packages/vue/src/vite-env.d.ts`
- Create: `packages/vue/src/__tests__/exports.test.ts`

- [ ] **Step 1: Create `packages/vue/package.json`**

```json
{
  "name": "@custom-ui/vue",
  "version": "0.0.0",
  "description": "Custom UI Vue component library built on Naive UI.",
  "type": "module",
  "sideEffects": ["**/*.css", "**/*.vue"],
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/custom-ui-vue.js"
    },
    "./package.json": "./package.json"
  },
  "main": "./dist/custom-ui-vue.js",
  "module": "./dist/custom-ui-vue.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "vite build && vue-tsc -p tsconfig.json --declaration --emitDeclarationOnly",
    "typecheck": "vue-tsc -p tsconfig.json --noEmit"
  },
  "peerDependencies": {
    "naive-ui": "^2.43.0",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "naive-ui": "^2.43.2"
  }
}
```

- [ ] **Step 2: Create `packages/vue/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
    "declaration": true,
    "emitDeclarationOnly": false,
    "paths": {
      "@custom-ui/vue": ["src/index.ts"],
      "@custom-ui/vue/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "exclude": ["dist", "node_modules"]
}
```

- [ ] **Step 3: Create `packages/vue/vite.config.ts`**

```ts
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CustomUiVue',
      fileName: 'custom-ui-vue',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'naive-ui'],
      output: {
        globals: {
          vue: 'Vue',
          'naive-ui': 'naive'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: false
  }
});
```

- [ ] **Step 4: Create library source files**

Create `packages/vue/src/index.ts`:

```ts
export * from './components';
export * from './provider';
export * from './theme';
```

Create `packages/vue/src/components/index.ts`:

```ts
export {};
```

Create `packages/vue/src/provider/index.ts`:

```ts
export { default as CustomProvider } from './custom-provider.vue';
```

Create `packages/vue/src/theme/index.ts`:

```ts
import type { GlobalThemeOverrides } from 'naive-ui';

export interface CustomThemeOptions {
  primaryColor?: string;
}

export function createCustomTheme(options: CustomThemeOptions = {}): GlobalThemeOverrides {
  const primaryColor = options.primaryColor ?? '#18a058';

  return {
    common: {
      primaryColor,
      primaryColorHover: primaryColor,
      primaryColorPressed: primaryColor
    }
  };
}
```

Create `packages/vue/src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
```

- [ ] **Step 5: Create `packages/vue/src/provider/custom-provider.vue`**

```vue
<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui';

defineOptions({
  name: 'CustomProvider'
});

defineProps<{
  themeOverrides?: GlobalThemeOverrides;
}>();
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <slot />
  </NConfigProvider>
</template>
```

- [ ] **Step 6: Create export smoke test**

Create `packages/vue/src/__tests__/exports.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import { createCustomTheme, CustomProvider } from '../index';

describe('@custom-ui/vue exports', () => {
  it('exports the provider and theme helper', () => {
    expect(CustomProvider).toBeTruthy();
    expect(createCustomTheme({ primaryColor: '#2080f0' }).common?.primaryColor).toBe('#2080f0');
  });
});
```

- [ ] **Step 7: Verify package**

Run:

```bash
pnpm --filter @custom-ui/vue typecheck
pnpm test packages/vue/src/__tests__/exports.test.ts
pnpm --filter @custom-ui/vue build
```

Expected: typecheck passes, test passes, `packages/vue/dist` is created.

- [ ] **Step 8: Commit**

```bash
git add packages/vue package.json pnpm-lock.yaml
git commit -m "feat: add vue library package"
```

## Task 3: VitePress Documentation Site

**Files:**
- Create: `docs/package.json`
- Create: `docs/tsconfig.json`
- Create: `docs/.vitepress/config.ts`
- Create: `docs/.vitepress/theme/index.ts`
- Create: `docs/.vitepress/theme/styles.css`
- Create: `docs/index.md`
- Create: `docs/guide/getting-started.md`
- Create: `docs/guide/theme.md`
- Create: `docs/automation/component-workflow.md`
- Create: `docs/automation/release.md`
- Create: `docs/components/index.md`

- [ ] **Step 1: Create `docs/package.json`**

```json
{
  "name": "@custom-ui/docs",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vitepress dev . --host 0.0.0.0",
    "build": "vitepress build .",
    "preview": "vitepress preview .",
    "typecheck": "vue-tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@custom-ui/vue": "workspace:*",
    "naive-ui": "^2.43.2",
    "vitepress": "^1.6.4",
    "vue": "^3.5.25"
  }
}
```

- [ ] **Step 2: Create `docs/tsconfig.json`**

```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@custom-ui/vue": ["../packages/vue/src/index.ts"]
    }
  },
  "include": [".vitepress/**/*.ts", ".vitepress/**/*.vue", "**/*.md"]
}
```

- [ ] **Step 3: Create VitePress config**

Create `docs/.vitepress/config.ts`:

```ts
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Custom UI',
  description: 'Vue 3 component library built on Naive UI.',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/' },
      { text: '自动化', link: '/automation/component-workflow' }
    ],
    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '主题配置', link: '/guide/theme' }
      ],
      '/components/': [
        { text: '组件总览', link: '/components/' }
      ],
      '/automation/': [
        { text: '组件流程', link: '/automation/component-workflow' },
        { text: '发布检查', link: '/automation/release' }
      ]
    },
    search: {
      provider: 'local'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@custom-ui/vue': new URL('../../packages/vue/src/index.ts', import.meta.url).pathname
      }
    }
  }
});
```

- [ ] **Step 4: Create theme entry and styles**

Create `docs/.vitepress/theme/index.ts`:

```ts
import DefaultTheme from 'vitepress/theme';
import 'naive-ui/dist/index.css';
import './styles.css';

export default {
  extends: DefaultTheme
};
```

Create `docs/.vitepress/theme/styles.css`:

```css
:root {
  --custom-demo-border: var(--vp-c-divider);
  --custom-demo-bg: var(--vp-c-bg-soft);
}

.custom-demo {
  border: 1px solid var(--custom-demo-border);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.custom-demo__preview {
  padding: 24px;
  background: var(--vp-c-bg);
}

.custom-demo__toolbar {
  align-items: center;
  border-top: 1px solid var(--custom-demo-border);
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 8px 12px;
}

.custom-demo__source {
  background: var(--custom-demo-bg);
  border-top: 1px solid var(--custom-demo-border);
  margin: 0;
  overflow: auto;
  padding: 16px;
}
```

- [ ] **Step 5: Create docs pages**

Create `docs/index.md`:

```md
# Custom UI

Custom UI 是一个基于 Vue 3、TypeScript、Vite 和 Naive UI 的 Web 组件库工程。

第一阶段目标是搭建完整流程：组件包、文档站、示例应用、自动化脚本、AI skills 和发布 dry-run。

## 下一步

- [快速开始](/guide/getting-started)
- [组件流程](/automation/component-workflow)
- [发布检查](/automation/release)
```

Create `docs/guide/getting-started.md`:

````md
# 快速开始

安装依赖后，可以启动文档站和示例应用。

```bash
pnpm install
pnpm docs:dev
pnpm example:dev
```

组件库包名暂定为 `@custom-ui/vue`。真实发布前可以替换为正式 scope。
````

Create `docs/guide/theme.md`:

````md
# 主题配置

`CustomProvider` 基于 Naive UI 的 `NConfigProvider` 封装，后续所有全局主题和组件默认配置都从这里进入。

```vue
<script setup lang="ts">
import { CustomProvider, createCustomTheme } from '@custom-ui/vue';

const themeOverrides = createCustomTheme({
  primaryColor: '#2080f0'
});
</script>

<template>
  <CustomProvider :theme-overrides="themeOverrides">
    <App />
  </CustomProvider>
</template>
```
````

Create `docs/automation/component-workflow.md`:

````md
# 组件流程

新增组件时使用自动化脚本生成基础文件。

```bash
pnpm create-component Button
pnpm check-component Button
pnpm generate-api Button
```

标准流程：

1. 使用脚本创建组件。
2. 实现 Naive UI 二次封装。
3. 编写真实 demo 文件。
4. 生成 API 文档。
5. 使用 `DemoBlock` 在 VitePress 展示 demo。
6. 运行组件检查、测试和发布 dry-run。
````

Create `docs/automation/release.md`:

````md
# 发布检查

第一阶段不发布 npm，只执行发布前 dry-run。

```bash
pnpm release:check
```

该命令必须执行类型检查、测试、构建、文档构建和 `npm pack --dry-run`，不能包含真实发布步骤。
````

Create `docs/components/index.md`:

```md
# 组件

组件页会由 `scripts/create-component.ts` 创建。每个组件页应包含真实 demo、源码展示和 API 表格。
```

- [ ] **Step 6: Verify docs**

Run:

```bash
pnpm --filter @custom-ui/docs typecheck
pnpm docs:build
```

Expected: typecheck passes and VitePress build completes.

- [ ] **Step 7: Commit**

```bash
git add docs package.json pnpm-lock.yaml
git commit -m "feat: add vitepress documentation site"
```

## Task 4: DemoBlock And Demo Source Contract

**Files:**
- Create: `docs/.vitepress/theme/components/DemoBlock.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Create: `docs/.vitepress/theme/demo-source.ts`

- [ ] **Step 1: Create source helper**

Create `docs/.vitepress/theme/demo-source.ts`:

```ts
export interface DemoSource {
  code: string;
}

export function normalizeDemoSource(source: string): DemoSource {
  return {
    code: source.trim()
  };
}
```

- [ ] **Step 2: Create `DemoBlock.vue`**

```vue
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
```

- [ ] **Step 3: Register `DemoBlock` globally**

Modify `docs/.vitepress/theme/index.ts` to:

```ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import 'naive-ui/dist/index.css';
import DemoBlock from './components/DemoBlock.vue';
import './styles.css';

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoBlock', DemoBlock);
  }
};

export default theme;
```

- [ ] **Step 4: Verify DemoBlock typecheck**

Run:

```bash
pnpm --filter @custom-ui/docs typecheck
pnpm docs:build
```

Expected: docs build succeeds with `DemoBlock` registered.

- [ ] **Step 5: Commit**

```bash
git add docs/.vitepress/theme
git commit -m "feat: add vitepress demo block"
```

## Task 5: Example Vite App

**Files:**
- Create: `examples/vite/package.json`
- Create: `examples/vite/index.html`
- Create: `examples/vite/tsconfig.json`
- Create: `examples/vite/vite.config.ts`
- Create: `examples/vite/src/main.ts`
- Create: `examples/vite/src/App.vue`

- [ ] **Step 1: Create example package**

Create `examples/vite/package.json`:

```json
{
  "name": "@custom-ui/example-vite",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "typecheck": "vue-tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@custom-ui/vue": "workspace:*",
    "naive-ui": "^2.43.2",
    "vue": "^3.5.25"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1",
    "vite": "^7.2.4",
    "vue-tsc": "^3.1.5"
  }
}
```

- [ ] **Step 2: Create app files**

Create `examples/vite/index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Custom UI Example</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Create `examples/vite/src/main.ts`:

```ts
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

Create `examples/vite/src/App.vue`:

```vue
<script setup lang="ts">
import { CustomProvider, createCustomTheme } from '@custom-ui/vue';
import { NButton } from 'naive-ui';

const themeOverrides = createCustomTheme({
  primaryColor: '#2080f0'
});
</script>

<template>
  <CustomProvider :theme-overrides="themeOverrides">
    <main class="example-page">
      <h1>Custom UI Example</h1>
      <NButton type="primary">Naive UI through CustomProvider</NButton>
    </main>
  </CustomProvider>
</template>

<style scoped>
.example-page {
  padding: 32px;
}
</style>
```

- [ ] **Step 3: Create config files**

Create `examples/vite/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@custom-ui/vue": ["../../packages/vue/src/index.ts"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

Create `examples/vite/vite.config.ts`:

```ts
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@custom-ui/vue': new URL('../../packages/vue/src/index.ts', import.meta.url).pathname
    }
  }
});
```

- [ ] **Step 4: Verify example app**

Run:

```bash
pnpm --filter @custom-ui/example-vite typecheck
pnpm --filter @custom-ui/example-vite build
```

Expected: example typecheck and build both pass.

- [ ] **Step 5: Commit**

```bash
git add examples/vite package.json pnpm-lock.yaml
git commit -m "feat: add vite example app"
```

## Task 6: Component Automation Scripts

**Files:**
- Create: `scripts/shared/names.ts`
- Create: `scripts/create-component.ts`
- Create: `scripts/check-component.ts`
- Create: `scripts/generate-api.ts`

- [ ] **Step 1: Create name helper**

Create `scripts/shared/names.ts`:

```ts
export interface ComponentNames {
  raw: string;
  pascal: string;
  kebab: string;
}

export function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toPascalCase(value: string): string {
  return toKebabCase(value)
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function getComponentNames(input: string | undefined): ComponentNames {
  if (!input) {
    throw new Error('Component name is required. Example: pnpm create-component Button');
  }

  const pascal = toPascalCase(input);
  const kebab = toKebabCase(input);

  if (!pascal || !kebab) {
    throw new Error(`Invalid component name: ${input}`);
  }

  return {
    raw: input,
    pascal,
    kebab
  };
}
```

- [ ] **Step 2: Create `scripts/create-component.ts`**

```ts
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { getComponentNames } from './shared/names';

const root = resolve(import.meta.dirname, '..');
const names = getComponentNames(process.argv[2]);
const componentDir = resolve(root, 'packages/vue/src/components', names.kebab);
const docsFile = resolve(root, 'docs/components', `${names.kebab}.md`);
const apiFile = resolve(componentDir, 'api.ts');

function writeNewFile(path: string, content: string) {
  if (existsSync(path)) {
    throw new Error(`Refusing to overwrite existing file: ${path}`);
  }

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

writeNewFile(
  resolve(componentDir, `${names.kebab}.vue`),
  `<script setup lang="ts">
import { ${names.pascal}Props } from './props';

defineOptions({
  name: 'Custom${names.pascal}'
});

defineProps(${names.pascal}Props);
</script>

<template>
  <div class="custom-${names.kebab}">
    <slot />
  </div>
</template>
`
);

writeNewFile(
  resolve(componentDir, 'props.ts'),
  `import type { PropType } from 'vue';

export const ${names.pascal}Props = {
  variant: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default'
  }
} as const;
`
);

writeNewFile(
  apiFile,
  `import type { ApiProperty } from '../../scripts-api';

export const api: ApiProperty[] = [
  {
    name: 'variant',
    type: "'default' | 'primary'",
    default: "'default'",
    description: 'Controls the visual variant.'
  }
];
`
);

writeNewFile(
  resolve(componentDir, 'index.ts'),
  `export { default as Custom${names.pascal} } from './${names.kebab}.vue';
export * from './props';
`
);

writeNewFile(
  resolve(componentDir, 'demo/basic.vue'),
  `<script setup lang="ts">
import { Custom${names.pascal} } from '../index';
</script>

<template>
  <Custom${names.pascal}>Basic ${names.pascal}</Custom${names.pascal}>
</template>
`
);

writeNewFile(
  resolve(componentDir, `__tests__/${names.kebab}.test.ts`),
  `import { describe, expect, it } from 'vitest';

import { Custom${names.pascal} } from '../index';

describe('Custom${names.pascal}', () => {
  it('exports the component', () => {
    expect(Custom${names.pascal}).toBeTruthy();
  });
});
`
);

writeNewFile(
  docsFile,
  `# ${names.pascal}

## 基础用法

<!-- DemoBlock wiring is completed by docs-writer after the component implementation is finalized. -->

## API

<!-- API table is generated by pnpm generate-api ${names.pascal}. -->
`
);

const componentIndex = resolve(root, 'packages/vue/src/components/index.ts');
const currentIndex = readFileSync(componentIndex, 'utf8');
const exportLine = `export * from './${names.kebab}';`;

if (!currentIndex.includes(exportLine)) {
  writeFileSync(componentIndex, `${currentIndex.trim()}\n${exportLine}\n`);
}

console.log(`Created component scaffold for ${names.pascal}.`);
```

- [ ] **Step 3: Add API type used by generated files**

Create `packages/vue/src/scripts-api.ts`:

```ts
export interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}
```

The scaffold generator from Step 2 already imports this type from `../../scripts-api`, which is the correct relative path from a component directory such as `packages/vue/src/components/button/api.ts`.

- [ ] **Step 4: Create `scripts/check-component.ts`**

```ts
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getComponentNames } from './shared/names';

const root = resolve(import.meta.dirname, '..');
const names = getComponentNames(process.argv[2]);
const componentDir = resolve(root, 'packages/vue/src/components', names.kebab);

const requiredFiles = [
  resolve(componentDir, `${names.kebab}.vue`),
  resolve(componentDir, 'props.ts'),
  resolve(componentDir, 'api.ts'),
  resolve(componentDir, 'index.ts'),
  resolve(componentDir, 'demo/basic.vue'),
  resolve(componentDir, `__tests__/${names.kebab}.test.ts`),
  resolve(root, 'docs/components', `${names.kebab}.md`)
];

const missing = requiredFiles.filter(file => !existsSync(file));

if (missing.length > 0) {
  console.error('Component workflow is incomplete. Missing files:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log(`Component ${names.pascal} has all required workflow files.`);
```

- [ ] **Step 5: Create `scripts/generate-api.ts`**

```ts
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getComponentNames } from './shared/names';

interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

const root = resolve(import.meta.dirname, '..');
const names = getComponentNames(process.argv[2]);
const apiSource = resolve(root, 'packages/vue/src/components', names.kebab, 'api.ts');
const apiOutput = resolve(root, 'docs/components/generated', `${names.kebab}-api.md`);

if (!existsSync(apiSource)) {
  throw new Error(`API metadata file does not exist: ${apiSource}`);
}

const module = await import(pathToFileURL(apiSource).href);
const api = module.api as ApiProperty[];

if (!Array.isArray(api)) {
  throw new Error(`API metadata must export an "api" array: ${apiSource}`);
}

const table = [
  '| 属性 | 类型 | 默认值 | 说明 |',
  '| --- | --- | --- | --- |',
  ...api.map(item => `| ${item.name} | \`${item.type}\` | ${item.default ?? '-'} | ${item.description} |`)
].join('\n');

mkdirSync(dirname(apiOutput), { recursive: true });
writeFileSync(apiOutput, `${table}\n`);
console.log(`Generated API docs: ${apiOutput}`);
```

- [ ] **Step 6: Verify scripts with a scaffold component**

Run:

```bash
pnpm create-component SmokeTest
pnpm check-component SmokeTest
pnpm generate-api SmokeTest
pnpm test packages/vue/src/components/smoke-test/__tests__/smoke-test.test.ts
```

Expected: scaffold is created, checker passes, API Markdown is generated, and smoke test passes.

- [ ] **Step 7: Commit**

```bash
git add scripts packages/vue/src/scripts-api.ts packages/vue/src/components docs/components package.json pnpm-lock.yaml
git commit -m "feat: add component automation scripts"
```

## Task 7: Release Dry-Run Script

**Files:**
- Create: `scripts/release-check.ts`
- Modify: `package.json`

- [ ] **Step 1: Create `scripts/release-check.ts`**

```ts
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

function run(command: string, args: string[]) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('pnpm', ['lint']);
run('pnpm', ['typecheck']);
run('pnpm', ['test']);
run('pnpm', ['build']);
run('pnpm', ['docs:build']);
run('pnpm', ['--filter', '@custom-ui/example-vite', 'build']);
run('pnpm', ['--filter', '@custom-ui/vue', 'exec', 'npm', 'pack', '--dry-run']);

console.log('\nRelease dry-run completed without publishing.');
```

- [ ] **Step 2: Verify release check**

Run:

```bash
pnpm release:check
```

Expected: lint, typecheck, tests, package build, docs build, and `npm pack --dry-run` all pass. No publish command runs.

- [ ] **Step 3: Commit**

```bash
git add scripts/release-check.ts package.json pnpm-lock.yaml
git commit -m "feat: add release dry-run check"
```

## Task 8: AI Skills

**Files:**
- Create: `.agents/skills/development-spec/SKILL.md`
- Create: `.agents/skills/create-component/SKILL.md`
- Create: `.agents/skills/docs-writer/SKILL.md`
- Create: `.agents/skills/code-reviewer/SKILL.md`
- Create: `.agents/skills/release-checker/SKILL.md`

- [ ] **Step 1: Create `development-spec`**

Create `.agents/skills/development-spec/SKILL.md`:

```md
---
name: development-spec
description: Custom UI Vue component library standards for components, docs, demos, tests, and release checks.
---

# Development Spec

Use this skill whenever creating, reviewing, or documenting `@custom-ui/vue` components.

## Component Rules

- Components live in `packages/vue/src/components/{kebab-name}/`.
- Main component file is `{kebab-name}.vue`.
- Props live in `props.ts`.
- Public exports live in `index.ts`.
- API metadata lives in `api.ts`.
- Demos live in `demo/*.vue`.
- Tests live in `__tests__/{kebab-name}.test.ts`.
- Component names use `Custom{PascalName}`.
- Wrap Naive UI components instead of recreating behavior when Naive UI already provides it.

## Documentation Rules

- Component docs live in `docs/components/{kebab-name}.md`.
- Use real demo files as the source of truth.
- Use `DemoBlock` for demo preview and source display.
- Generate API tables with `pnpm generate-api {ComponentName}`.

## Verification Rules

- Run `pnpm check-component {ComponentName}` before calling a component complete.
- Run tests and type checks after implementation.
- Run `pnpm release:check` before any release decision.
```

- [ ] **Step 2: Create `create-component`**

Create `.agents/skills/create-component/SKILL.md`:

```md
---
name: create-component
description: Create or update a Custom UI Vue component using the project automation workflow.
---

# Create Component

Use this skill when the user asks to add or update a component in `@custom-ui/vue`.

## Required Flow

1. Read `.agents/skills/development-spec/SKILL.md`.
2. Run `pnpm create-component {ComponentName}` for new components.
3. Implement the component in `packages/vue/src/components/{kebab-name}/`.
4. Add or update real demo files in `demo/`.
5. Update `api.ts`.
6. Run `pnpm generate-api {ComponentName}`.
7. Update `docs/components/{kebab-name}.md` to use `DemoBlock`.
8. Run `pnpm check-component {ComponentName}`.
9. Run the component test.
10. Request code review using `code-reviewer`.

Do not skip docs, demo, API metadata, or component checks.
```

- [ ] **Step 3: Create `docs-writer`**

Create `.agents/skills/docs-writer/SKILL.md`:

```md
---
name: docs-writer
description: Write VitePress docs for Custom UI Vue components using DemoBlock and generated API tables.
---

# Docs Writer

Use this skill when creating or updating component documentation.

## Rules

- Documentation lives in `docs/components/{kebab-name}.md`.
- Use real demo files from `packages/vue/src/components/{kebab-name}/demo/`.
- Use `DemoBlock` for demo preview and source display.
- Do not paste demo code by hand if it can be read from the demo file.
- Generate API output with `pnpm generate-api {ComponentName}`.
- Keep examples short and focused on real usage.
```

- [ ] **Step 4: Create `code-reviewer`**

Create `.agents/skills/code-reviewer/SKILL.md`:

```md
---
name: code-reviewer
description: Review Custom UI Vue component code for API quality, Naive UI wrapping, docs, demos, and tests.
---

# Code Reviewer

Use this skill for component review.

## Review Checklist

- Component follows the required directory structure.
- Public component name uses `Custom{PascalName}`.
- Props are typed and documented through `api.ts`.
- Naive UI behavior is reused where possible.
- Demo files compile and show real usage.
- VitePress docs reference demos and generated API docs.
- Tests cover at least public export and any custom behavior.
- `pnpm check-component {ComponentName}` passes.

Report blockers first. If there are no blockers, say the component passes review and list residual risks.
```

- [ ] **Step 5: Create `release-checker`**

Create `.agents/skills/release-checker/SKILL.md`:

```md
---
name: release-checker
description: Run and interpret Custom UI release dry-run checks without publishing.
---

# Release Checker

Use this skill before any release decision.

## Required Flow

1. Run `pnpm release:check`.
2. Confirm no npm publish command ran.
3. Inspect the `npm pack --dry-run` output for accidental files.
4. Confirm the package is still named `@custom-ui/vue` unless the user has approved a final package name.
5. Summarize blockers before any real release.
```

- [ ] **Step 6: Commit**

```bash
git add .agents/skills
git commit -m "docs: add custom ui ai skills"
```

## Task 9: Final Verification

**Files:**
- Modify only files needed to fix verification failures.

- [ ] **Step 1: Run full verification**

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm docs:build
pnpm --filter @custom-ui/example-vite build
pnpm release:check
```

Expected: all commands pass.

- [ ] **Step 2: Inspect git status**

Run:

```bash
git status --short
```

Expected: no uncommitted files except intentional generated artifacts that should be committed or ignored.

- [ ] **Step 3: Commit fixes if needed**

If Step 1 required fixes, commit them:

```bash
git add .
git commit -m "chore: complete phase 1 verification"
```

- [ ] **Step 4: Record completion summary**

Create or update `docs/automation/phase-1-summary.md` with:

```md
# Phase 1 Summary

Phase 1 established the Custom UI Vue workspace, documentation site, example app, automation scripts, AI skills, and release dry-run workflow.

## Verification

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm docs:build`
- `pnpm --filter @custom-ui/example-vite build`
- `pnpm release:check`

## Next Step

Use `pnpm create-component Button` to add the first real component through the automated workflow.
```

- [ ] **Step 5: Commit summary**

```bash
git add docs/automation/phase-1-summary.md
git commit -m "docs: summarize phase 1 setup"
```

## Self-Review

Spec coverage:

- Monorepo scaffold: Task 1.
- Vue package: Task 2.
- VitePress docs: Task 3.
- DemoBlock: Task 4.
- Examples app: Task 5.
- `create-component`, `check-component`, `generate-api`: Task 6.
- `release-check`: Task 7.
- `.agents/skills`: Task 8.
- Verification and dry-run: Task 9.

Placeholder scan:

- The plan avoids TBD/TODO language.
- The only constrained behavior is explicitly scoped, with concrete files and commands.

Type consistency:

- Component naming uses `Custom{PascalName}` consistently.
- Script commands match root `package.json`.
- API metadata uses `ApiProperty` consistently.
