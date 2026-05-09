/// <reference types="node" />

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { runCli } from './shared/cli';
import { readApiProperties } from './shared/api-docs';
import { getComponentNames } from './shared/names';

const root = resolve(import.meta.dirname, '..');

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
}

await runCli(async () => {
  const names = getComponentNames(process.argv[2]);
  const componentDir = resolve(root, 'packages/vue/src/components', names.kebab);
  const apiOutput = resolve(root, 'docs/components/generated', `${names.kebab}-api.md`);

  const propsSource = resolve(componentDir, 'props.ts');
  if (!existsSync(propsSource)) {
    throw new Error(`Props metadata file does not exist: ${propsSource}`);
  }

  const api = await readApiProperties(componentDir);

  if (api.length === 0) {
    throw new Error(`No API metadata found for ${componentDir}. Add JSDoc annotations in props.ts.`);
  }

  const missingDescriptions = api.filter(item => !item.description || !item.description.trim());

  if (missingDescriptions.length > 0) {
    throw new Error(
      `Missing JSDoc annotations in ${propsSource} for: ${missingDescriptions
        .map(item => item.name)
        .join(', ')}`
    );
  }

  const table = [
    '| 属性 | 类型 | 默认值 | 说明 |',
    '| --- | --- | --- | --- |',
    ...api.map(
      item =>
        `| ${escapeTableCell(item.name)} | \`${escapeTableCell(item.type)}\` | ${
          item.default === undefined ? '-' : escapeTableCell(item.default)
        } | ${item.description ? escapeTableCell(item.description) : '-'} |`
    )
  ].join('\n');

  mkdirSync(dirname(apiOutput), { recursive: true });
  writeFileSync(apiOutput, `${table}\n`);
  console.log(`Generated API docs: ${apiOutput}`);
});
