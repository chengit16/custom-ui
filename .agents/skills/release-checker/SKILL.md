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

## Current Phase-1 Note

`pnpm release:check` is expected to fail while the SmokeTest proof scaffold is still publicly exported or present in `packages/vue/dist`. That failure is a release blocker, not a tool failure.
