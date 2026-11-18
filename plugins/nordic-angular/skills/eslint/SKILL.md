---
name: eslint
description: Key ESLint rules for this project. Activate when writing any `.ts` or `.html` template file — contains lint rules to follow for first-draft compliance. Covers TypeScript strict checking, Angular lint, and import boundaries.
license: MIT
compatibility: Requires eslint, typescript-eslint, angular-eslint, @nx/eslint-plugin
---

# ESLint Compliance

Write code that passes lint on the first draft. Do not rely on lint-then-fix cycles.

## TypeScript Rules (strictTypeChecked + stylisticTypeChecked)

- **`curly: 'all'`** — always use braces, even for single-line `if`/`else`/`for`/`while`
- **`eqeqeq: 'always'`** — strict equality only (`===`, `!==`)
- **`no-else-return`** — no `else` after a block that returns
- **`no-console: 'warn'`** — avoid `console.*` in production code
- **`no-explicit-any`** — `any` is an error; auto-fixes to `unknown`
- **No enums** — `TSEnumDeclaration` is a lint error; use `as const` objects
- **No `I`/`T` prefixes** — interfaces and types use `PascalCase` without hungarian prefixes
- **`prefer-readonly`** — mark properties `readonly` when never reassigned
- **Unused vars are errors** — exception: `_`-prefixed args and rest siblings (`ignoreRestSiblings`)
- **`consistent-type-definitions: off`** — use `interface` or `type` as appropriate

## Angular Rules (tsAll + templateAll + templateAccessibility)

- **OnPush required** — `ChangeDetectionStrategy.OnPush` is enforced
- **Self-closing tags required** — always self-close empty elements in templates
- **Selector prefix** — each module or library uses its own prefix of at most 4 characters that identifies its origin; components: prefix + kebab-case; directives: prefix + camelCase
- **`no-call-expression: off`** — disabled to allow signal calls in templates
- **`component-class-suffix: off`** — no enforced class suffix
- **`use-injectable-provided-in: off`** — `providedIn` is not enforced (evaluate per service)
- **`i18n: off`** — template i18n not enforced

## Module Boundaries

- Imports are restricted by `@nx/enforce-module-boundaries` and two tags on every project: `scope:<area>` (which part of the app it belongs to) and `type:app|feature|ui|data-access|util|contracts|test` (what it holds)
- A scope uses itself and `scope:shared`; it reaches another scope only through that scope's contracts (`type:contracts`), never its code
- feature → feature/ui/data-access/util; ui → ui/util; data-access → data-access/util; util → util; contracts use nothing
- A library that is loaded lazily anywhere (`loadComponent: () => import(...)`) must not be imported statically outside tests — a single static import pulls it back into the eager bundle and silently defeats the lazy split

## Test Files (`*.spec.ts`, `*.e2e.ts`)

- `no-console: off`
- `consistent-type-assertions: off` — casting allowed in tests
- `no-extraneous-class: off`
- Only specs, e2e files, test setup files and `testing` folders may import a library's `testing` entry point (`no-restricted-imports`) — test helpers must never ship in production code
