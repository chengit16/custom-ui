import { mkdirSync, unlinkSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const changesetDir = resolve(root, '.changeset');
const changesetFile = resolve(changesetDir, 'auto-generated-release.md');
const packageName = '@danran_chen/custom-ui-vue';

function runGit(args) {
  const result = spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    shell: false,
  });

  if (result.status !== 0) {
    throw new Error(
      `Git command failed: git ${args.join(' ')}\n${result.stderr || result.stdout || ''}`.trim(),
    );
  }

  return result.stdout.trim();
}

function getBaseRef() {
  const tagResult = spawnSync(
    'git',
    ['describe', '--tags', '--match', 'custom-ui-vue-v*', '--abbrev=0'],
    {
      cwd: root,
      encoding: 'utf8',
      shell: false,
    },
  );

  if (tagResult.status === 0) {
    const tag = tagResult.stdout.trim();

    if (tag) {
      return tag;
    }
  }

  const releaseMarkers = [
    'packages/vue/package.json',
    'packages/vue/CHANGELOG.md',
  ];

  const result = spawnSync(
    'git',
    ['log', '-n', '1', '--format=%H', '--', ...releaseMarkers],
    {
      cwd: root,
      encoding: 'utf8',
      shell: false,
    },
  );

  if (result.status === 0) {
    const base = result.stdout.trim();

    if (base) {
      return base;
    }
  }

  return runGit(['rev-list', '--max-parents=0', 'HEAD']);
}

function parseCommitType(rawType) {
  const normalized = rawType?.toLowerCase();

  switch (normalized) {
    case 'feat':
    case 'fix':
    case 'docs':
    case 'refactor':
    case 'chore':
    case 'test':
    case 'build':
    case 'ci':
    case 'perf':
    case 'style':
    case 'revert':
      return normalized;
    default:
      return 'other';
  }
}

function parseCommits(raw) {
  if (!raw) {
    return [];
  }

  return raw
    .split('\x1e')
    .map(entry => entry.trim())
    .filter(Boolean)
    .map(entry => {
      const [hash = '', subject = '', body = ''] = entry.split('\x1f');
      const match = subject.match(
        /^(?<type>[a-z]+)(?:\((?<scope>[^)]+)\))?(?<breaking>!)?: (?<message>.+)$/i,
      );

      return {
        hash,
        type: parseCommitType(match?.groups?.type),
        scope: match?.groups?.scope ?? null,
        breaking:
          Boolean(match?.groups?.breaking) ||
          /BREAKING[ -]CHANGE:/i.test(body),
        subject: match?.groups?.message?.trim() || subject.trim() || hash,
      };
    });
}

function describeCommit(commit) {
  const labelMap = {
    feat: '新增',
    fix: '修复',
    docs: '文档',
    refactor: '重构',
    chore: '维护',
    test: '测试',
    build: '构建',
    ci: '流程',
    perf: '性能',
    style: '样式',
    revert: '回退',
    other: '更新',
  };
  const scope = commit.scope ? `（${commit.scope}）` : '';
  const label = labelMap[commit.type] ?? labelMap.other;
  return `${label}${scope}：${commit.subject}`;
}

function toSectionTitle(commit) {
  if (commit.breaking) {
    return '破坏性变更';
  }

  switch (commit.type) {
    case 'feat':
      return '新增';
    case 'fix':
    case 'perf':
      return '修复';
    case 'docs':
      return '文档';
    case 'refactor':
      return '重构';
    default:
      return '维护';
  }
}

function getBumpLevel(commits) {
  if (commits.some(commit => commit.breaking)) {
    return 'major';
  }

  if (commits.some(commit => commit.type === 'feat')) {
    return 'minor';
  }

  return 'patch';
}

function buildSections(commits) {
  const sections = new Map();
  const order = ['破坏性变更', '新增', '修复', '文档', '重构', '维护'];

  for (const commit of commits) {
    const title = toSectionTitle(commit);
    const items = sections.get(title) ?? [];
    items.push(`- ${describeCommit(commit)}`);
    sections.set(title, items);
  }

  return order
    .filter(title => sections.has(title))
    .map(title => ({
      title,
      items: sections.get(title) ?? [],
    }));
}

function buildContent(commits, baseRef) {
  const sections = buildSections(commits);
  const bump = getBumpLevel(commits);
  const shortHead = runGit(['rev-parse', '--short', 'HEAD']);

  const lines = [
    '---',
    `'${packageName}': ${bump}`,
    '---',
    '',
    `自动生成的版本日志草稿，来源于 \`git log ${baseRef}..${shortHead}\`，基线取最近一次 release tag。`,
    '',
  ];

  for (const section of sections) {
    lines.push(`### ${section.title}`);
    lines.push('');
    lines.push(...section.items);
    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
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
  const baseRef = getBaseRef();
  const raw = runGit([
    'log',
    '--no-merges',
    '--reverse',
    '--format=%H%x1f%s%x1f%b%x1e',
    `${baseRef}..HEAD`,
  ]);
  const commits = parseCommits(raw);

  if (commits.length === 0) {
    if (existsSync(changesetFile)) {
      unlinkSync(changesetFile);
    }
    console.log('No unreleased commits found. Changeset draft was not generated.');
    return;
  }

  mkdirSync(changesetDir, { recursive: true });
  writeFileSync(changesetFile, buildContent(commits, baseRef));

  console.log(
    `Generated changeset draft from ${commits.length} commit(s): ${changesetFile}`,
  );
});
