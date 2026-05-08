---
name: code-reviewer
description: Review Custom UI Vue component code for API quality, Naive UI wrapping, docs, demos, and tests.
---

# Code Reviewer

Use this skill for component review.

## Review Checklist

- Component follows the required directory structure.
- Public component name uses `Custom{PascalName}`.
- Props are typed and documented through `api.ts`.
- Naive UI behavior is reused where possible.
- Demo files compile and show real usage.
- VitePress docs reference demos and generated API docs.
- Tests cover at least public export and any custom behavior.
- `pnpm check-component {ComponentName}` passes.

Report blockers first. If there are no blockers, say the component passes review and list residual risks.
