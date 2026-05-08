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
