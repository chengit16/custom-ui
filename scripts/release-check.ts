import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
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

function findSmokeTestDistFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  const matches: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = resolve(dir, entry.name);

    if (entry.name.toLowerCase().includes('smoke-test')) {
      matches.push(path);
    }

    if (entry.isDirectory()) {
      matches.push(...findSmokeTestDistFiles(path));
    }
  }

  return matches;
}

function assertNoSmokeTestReleaseArtifacts() {
  const publicComponentIndex = resolve(root, 'packages/vue/src/components/index.ts');
  const distDir = resolve(root, 'packages/vue/dist');
  const blockers: string[] = [];

  if (existsSync(publicComponentIndex)) {
    const source = readFileSync(publicComponentIndex, 'utf8');

    if (/export\s+\*\s+from\s+['"]\.\/smoke-test['"]\s*;?/.test(source)) {
      blockers.push(`${publicComponentIndex} still exports ./smoke-test`);
    }
  }

  const distSmokeTestFiles = findSmokeTestDistFiles(distDir).filter(path => {
    return statSync(path).isFile() || statSync(path).isDirectory();
  });

  if (distSmokeTestFiles.length > 0) {
    blockers.push(
      `packages/vue/dist contains smoke-test release artifacts:\n${distSmokeTestFiles
        .map(path => `- ${path}`)
        .join('\n')}`
    );
  }

  if (blockers.length > 0) {
    console.error(
      `\nRelease dry-run blocked: SmokeTest proof scaffold is still publicly releasable.\n\n${blockers.join(
        '\n\n'
      )}\n\nRemove the public SmokeTest export and rebuild without smoke-test dist artifacts before packaging. No publish command was run.`
    );
    process.exit(1);
  }
}

run('pnpm', ['lint']);
run('pnpm', ['typecheck']);
run('pnpm', ['test']);
run('pnpm', ['build']);
run('pnpm', ['docs:build']);
run('pnpm', ['--filter', '@custom-ui/example-vite', 'build']);
assertNoSmokeTestReleaseArtifacts();
run('pnpm', ['--filter', '@custom-ui/vue', 'exec', 'npm', 'pack', '--dry-run']);

console.log('\nRelease dry-run completed without publishing.');
