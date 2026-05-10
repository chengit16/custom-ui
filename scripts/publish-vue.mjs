import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const autoChangesetFile = resolve(
  root,
  '.changeset/auto-generated-release.md',
);

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.signal) {
    throw new Error(
      `Command was terminated by signal ${result.signal}: ${command} ${args.join(' ')}`,
    );
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

async function runCli(action) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
  }
}

await runCli(() => {
  run('pnpm', ['changeset:auto']);

  if (!existsSync(autoChangesetFile)) {
    throw new Error(
      'No unreleased commits were detected. Please commit changes before publishing.',
    );
  }

  run('pnpm', ['version:packages']);
  run('pnpm', [
    '--filter',
    '@danran_chen/custom-ui-vue',
    'exec',
    'npm',
    'publish',
    '--access',
    'public',
  ]);
});
