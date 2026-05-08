/// <reference types="node" />

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
