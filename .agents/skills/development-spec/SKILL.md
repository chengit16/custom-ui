---
name: development-spec
description: Custom UI Vue component library standards for components, docs, demos, tests, and release checks.
---

# Development Spec

Use this skill whenever creating, reviewing, or documenting `@custom-ui/vue` components.

## Component Rules

- Components live in `packages/vue/src/components/{kebab-name}/`.
- Main component file is `{kebab-name}.vue`.
- Props live in `props.ts`.
- Public exports live in `index.ts`.
- API metadata lives in `api.ts`.
- Demos live in `demo/*.vue`.
- Tests live in `__tests__/{kebab-name}.test.ts`.
- Component names use `Custom{PascalName}`.
- Wrap Naive UI components instead of recreating behavior when Naive UI already provides it.

## Documentation Rules

- Component docs live in `docs/components/{kebab-name}.md`.
- Use real demo files as the source of truth.
- Use `DemoBlock` for demo preview and source display.
- Generate API tables with `pnpm generate-api {ComponentName}`.

## Verification Rules

- Run `pnpm check-component {ComponentName}` before calling a component complete.
- Run tests and type checks after implementation.
- Run `pnpm release:check` before any release decision.
