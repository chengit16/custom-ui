---
name: create-component
description: Create or update a Custom UI Vue component using the project automation workflow.
---

# Create Component

Use this skill when the user asks to add or update a component in `@custom-ui/vue`.

## Required Flow

1. Read `.agents/skills/development-spec/SKILL.md`.
2. Run `pnpm create-component {ComponentName}` for new components.
3. Implement the component in `packages/vue/src/components/{kebab-name}/`.
4. Add or update real demo files in `demo/`.
5. Update `api.ts`.
6. Run `pnpm generate-api {ComponentName}`.
7. Update `docs/components/{kebab-name}.md` to use `DemoBlock`.
8. Run `pnpm check-component {ComponentName}`.
9. Run the component test.
10. Request code review using `code-reviewer`.

Do not skip docs, demo, API metadata, or component checks.
