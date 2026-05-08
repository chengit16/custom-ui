# Custom UI Phase 1 Design

## Context

The project will start as a Web component library built with Vue 3, TypeScript, and Vite. It will wrap and extend Naive UI for product-specific conventions while keeping Naive UI as the underlying component foundation.

The reference project is `/Users/chendong/Desktop/project/native-ui`. That project uses a monorepo, a documentation site, examples, and `.agents/skills` to guide AI-assisted component development. Custom UI should follow the same workflow idea, but adapt it for a Vue Web component library.

The first phase is not about shipping many components. It is about building the road: a project structure, documentation site, examples, automation scripts, and AI skills that can later create, document, review, and release components in a repeatable way.

## Decisions

- Package name for now: `@custom-ui/vue`.
- Documentation site name for now: `Custom UI`.
- Main documentation tool: VitePress.
- Component stack: Vue 3, TypeScript, Vite, Naive UI.
- Package manager: pnpm workspace.
- Publishing: not published in phase 1. The release flow must support dry-run validation only.
- Automation: included in phase 1 as a minimum usable workflow, not deferred as a vague future enhancement.

The package name and documentation title are temporary. Before a real npm release, they can be replaced with the final brand and npm scope.

## Goals

Phase 1 must produce a working foundation that teaches and enforces the full component-library workflow:

1. Scaffold the monorepo.
2. Build the Vue component package.
3. Build the VitePress documentation site.
4. Build an examples app for real usage verification.
5. Add minimum automation for component creation, documentation, checks, and release dry-runs.
6. Add AI skills that tell an assistant how to follow the workflow.

After phase 1, adding the first real component should be done through the automation and AI flow rather than by manually inventing every file.

## Non-Goals

Phase 1 will not:

- Publish to npm.
- Build a large component set.
- Recreate Naive UI's custom documentation system from scratch.
- Add Storybook or Histoire.
- Implement visual regression testing.
- Fully automate all API extraction edge cases.

Those can be added after the first component workflow is proven.

## Repository Structure

```text
custom-ui/
├── packages/
│   └── vue/
│       ├── src/
│       │   ├── components/
│       │   ├── provider/
│       │   ├── theme/
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts
│   │   └── theme/
│   ├── components/
│   ├── guide/
│   ├── automation/
│   └── index.md
├── examples/
│   └── vite/
├── scripts/
│   ├── create-component.ts
│   ├── check-component.ts
│   ├── generate-api.ts
│   └── release-check.ts
├── .agents/
│   └── skills/
│       ├── development-spec/
│       ├── create-component/
│       ├── docs-writer/
│       ├── code-reviewer/
│       └── release-checker/
├── .changeset/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── eslint.config.mjs
```

## Component Package Design

`packages/vue` will expose the public package `@custom-ui/vue`.

The component package should:

- Export all public components from `src/index.ts`.
- Re-export useful provider and theme helpers.
- Depend on `naive-ui` as a peer dependency.
- Depend on `vue` as a peer dependency.
- Build ESM output and TypeScript declarations.
- Keep source files organized by component.

Each component should eventually follow this shape:

```text
src/components/button/
├── button.vue
├── index.ts
├── props.ts
├── style.css
├── demo/
│   └── basic.vue
└── __tests__/
    └── button.test.ts
```

The exact first component can be chosen in phase 2. The phase 1 scaffold should still generate this shape.

## Documentation Design

The documentation site will use VitePress because the library is Vue-based and component demos should be easy to embed in Markdown.

The documentation site should include:

- Home page.
- Getting started guide.
- Installation guide.
- Theme and provider guide.
- Component development workflow.
- Automation guide.
- AI workflow guide.
- Release dry-run guide.
- Component section with generated or scaffolded pages.

The component page experience should aim for a Naive UI-like pattern:

- Title and short description.
- Demo cards.
- Live Vue preview.
- Expandable source code.
- Copy source button.
- API table.
- Notes for slots, events, and theme variables when available.

## DemoBlock Automation

Phase 1 must include a minimum usable `DemoBlock` for VitePress.

The first version should:

- Render a Vue demo component.
- Show the source code for the same demo.
- Support expand/collapse for the source code.
- Support copy-to-clipboard.
- Keep the demo source in one real file so the preview and source display do not drift.

The implementation must start with a constrained but working contract: one demo component file and one source string for each demo. Richer metadata, multiple files, external dependencies, and automatic demo discovery are explicitly out of phase 1.

## API Documentation Automation

Phase 1 must include a basic API generation path.

The first version should:

- Read a component `props.ts` file or a simple structured metadata export.
- Generate a Markdown or JSON API table fragment.
- Be good enough for the first component workflow.

The first version does not need to handle every TypeScript pattern. The accepted constraint is that components should write props in a format the generator can understand.

## Scripts

### `scripts/create-component.ts`

Creates a new component scaffold.

It should generate:

- Component directory.
- Main `.vue` file.
- `props.ts`.
- `index.ts`.
- Demo file.
- Test scaffold.
- Documentation page.
- API metadata file or generated output.

It should also update the component package export index when safe.

### `scripts/check-component.ts`

Checks that a component has the required workflow artifacts:

- Source file.
- Props file.
- Export file.
- Demo file.
- Documentation page.
- Test scaffold.
- API documentation output or metadata source.

This script should be used by AI skills and by humans before considering a component complete.

### `scripts/generate-api.ts`

Generates API table data or Markdown from component props metadata.

This must start with one constrained input format. Components that want generated API docs in phase 1 must follow that format.

### `scripts/release-check.ts`

Runs the release-readiness checks without publishing:

- Install consistency check when applicable.
- Type check.
- Lint.
- Tests.
- Build package.
- Build docs.
- `npm pack --dry-run` for `packages/vue`.

The script must not publish anything.

## AI Skills

The project should include `.agents/skills` from phase 1, modeled after the `native-ui` workflow but rewritten for Vue.

### `development-spec`

Defines standards for:

- Component directory structure.
- Props design.
- Naive UI wrapping rules.
- Theme and provider rules.
- Documentation rules.
- Demo rules.
- Test expectations.

### `create-component`

Guides AI through the complete component creation workflow:

1. Read `development-spec`.
2. Run or follow `scripts/create-component`.
3. Implement the component.
4. Add or update demos.
5. Generate or update API docs.
6. Run `scripts/check-component`.
7. Invoke code review.
8. Invoke docs review.

### `docs-writer`

Guides AI to write VitePress component docs:

- Use real demo files.
- Use `DemoBlock`.
- Keep API docs in sync with props metadata.
- Avoid duplicating code snippets manually when a source file can be referenced.

### `code-reviewer`

Reviews Vue component code against `development-spec`.

It should focus on:

- Public API stability.
- Correct Naive UI wrapping.
- TypeScript quality.
- Vue conventions.
- Accessibility implications.
- Documentation and demo completeness.

### `release-checker`

Guides AI through release dry-run checks:

- Run `scripts/release-check`.
- Inspect package contents.
- Confirm no accidental publish step exists.
- Summarize blockers before a real release.

## Development Flow

The intended component workflow after phase 1 is:

1. Decide component name and purpose.
2. Run `scripts/create-component`.
3. Implement wrapper around Naive UI.
4. Add demo files.
5. Generate API docs.
6. Write VitePress page using `DemoBlock`.
7. Run `scripts/check-component`.
8. Run tests and type checks.
9. Run AI code review.
10. Run release dry-run when preparing a package.

This is the core process phase 1 must make possible.

## Testing And Verification

Phase 1 should include basic verification commands:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm docs:dev`
- `pnpm docs:build`
- `pnpm release:check`

The exact underlying tools can be:

- ESLint for linting.
- TypeScript for type checking.
- Vitest for tests.
- Vite library mode for package build.
- VitePress for docs build.

## Release Strategy

The release system should be present but non-publishing in phase 1.

It should include:

- Changesets setup.
- Package build.
- Declaration generation.
- Package file validation.
- `npm pack --dry-run`.

It should not include an npm token, registry publish step, or CI publish job yet.

## Risks And Mitigations

### Automation gets too complex too early

Mitigation: keep generation rules constrained. The first version can require predictable file names and simple props metadata.

### Documentation code drifts from actual demos

Mitigation: `DemoBlock` should read source from the same demo files used for preview.

### VitePress cannot exactly match Naive UI's custom docs

Mitigation: match the useful interaction pattern first: demo cards, source display, API tables, and navigation. Do not clone Naive UI's whole custom site system.

### Temporary package name leaks into real release

Mitigation: document the rename step before publishing and include package-name checks in `release-checker`.

## Approval Criteria

Phase 1 is complete when:

- The monorepo installs successfully.
- `@custom-ui/vue` builds and emits types.
- VitePress starts and builds.
- The examples app can import `@custom-ui/vue`.
- `scripts/create-component` can scaffold a component workflow.
- `DemoBlock` can display a demo and its source.
- `scripts/check-component` can validate scaffold completeness.
- `scripts/generate-api` can produce a basic API table from the accepted props metadata format.
- `scripts/release-check` performs a dry-run release validation without publishing.
- `.agents/skills` documents the AI workflow for component creation, docs, review, and release checking.
