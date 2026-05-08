/// <reference types="node" />

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

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
}

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
  ...api.map(
    item =>
      `| ${escapeTableCell(item.name)} | \`${escapeTableCell(item.type)}\` | ${
        item.default ? escapeTableCell(item.default) : '-'
      } | ${escapeTableCell(item.description)} |`
  )
].join('\n');

mkdirSync(dirname(apiOutput), { recursive: true });
writeFileSync(apiOutput, `${table}\n`);
console.log(`Generated API docs: ${apiOutput}`);
