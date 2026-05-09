/// <reference types="node" />

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { runCli } from './shared/cli';
import { readApiPropertyGroups, type ApiProperty } from './shared/api-docs';
import { getComponentNames } from './shared/names';

const root = resolve(import.meta.dirname, '..');

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
}

function createApiTable(api: ApiProperty[]): string {
  return [
    '| 属性 | 类型 | 默认值 | 说明 |',
    '| --- | --- | --- | --- |',
    ...api.map(
      item =>
        `| ${escapeTableCell(item.name)} | \`${escapeTableCell(item.type)}\` | ${
          item.default === undefined ? '-' : escapeTableCell(item.default)
        } | ${item.description ? escapeTableCell(item.description) : '-'} |`,
    ),
  ].join('\n');
}

await runCli(async () => {
  const names = getComponentNames(process.argv[2]);
  const componentDir = resolve(root, 'packages/vue/src/components', names.kebab);
  const apiOutput = resolve(
    root,
    'docs/components/generated',
    `${names.kebab}-api.md`,
  );

  const propsSource = resolve(componentDir, 'props.ts');
  if (!existsSync(propsSource)) {
    throw new Error(`Props metadata file does not exist: ${propsSource}`);
  }

  const groups = await readApiPropertyGroups(componentDir);
  const api = groups.flatMap(group => group.properties);

  if (api.length === 0) {
    throw new Error(
      `No API metadata found for ${componentDir}. Add JSDoc annotations in props.ts.`,
    );
  }

  const missingDescriptions = api.filter(
    item => !item.description || !item.description.trim(),
  );

  if (missingDescriptions.length > 0) {
    throw new Error(
      `Missing JSDoc annotations in ${propsSource} for: ${missingDescriptions
        .map(item => item.name)
        .join(', ')}`,
    );
  }

  const table =
    groups.length === 1
      ? `### ${names.pascal} Props\n\n${createApiTable(groups[0].properties)}`
      : groups
          .map(group => {
            const displayName =
              group.name === `${names.pascal}Group`
                ? `${names.pascal}Group`
                : group.name;

            return `### ${displayName} Props\n\n${createApiTable(group.properties)}`;
          })
          .join('\n\n');

  mkdirSync(dirname(apiOutput), { recursive: true });
  writeFileSync(apiOutput, `${table}\n`);
  console.log(`Generated API docs: ${apiOutput}`);
});
