/// <reference types="node" />

import { existsSync, mkdtempSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const distDir = resolve(root, 'docs/.vitepress/dist');
const tempRoot = mkdtempSync(resolve(tmpdir(), 'custom-ui-gitee-pages-'));
const tempRepo = resolve(tempRoot, 'repo');

function run(command: string, args: string[], cwd = root) {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  });
}

function ensureDistExists() {
  if (!existsSync(distDir)) {
    throw new Error(
      `Docs dist not found: ${distDir}. Run "pnpm docs:build" first.`,
    );
  }
}

function stageDocs() {
  run('git', ['init', tempRepo]);
  run('git', ['checkout', '-b', 'pages'], tempRepo);
  cpSync(distDir, tempRepo, { recursive: true });
  run(
    'git',
    ['remote', 'add', 'origin', 'https://gitee.com/sixblog/custom-ui.git'],
    tempRepo,
  );
}

function commitAndPush() {
  run('git', ['add', '.'], tempRepo);
  run('git', ['commit', '-m', 'docs: deploy site'], tempRepo);
  run('git', ['push', '-u', 'origin', 'pages', '--force'], tempRepo);
}

try {
  ensureDistExists();
  stageDocs();
  commitAndPush();
  console.log('Gitee Pages deploy finished.');
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
