---
name: typescript
description: >
  Opinionated TypeScript style and type-safety conventions — control flow, functions & classes,
  type safety, type modelling, generics, async & errors, and modules & naming. Activate when
  editing any `.ts`/`.tsx` file.
license: MIT
compatibility: Requires TypeScript 5+
---

# TypeScript

Opinionated rules for writing correct, well-typed TypeScript on the first draft. Detail for each area lives in `references/` — pull the file you need.

## How to use this skill

- **Assume `strict`.** These rules presuppose `strict` mode, and lean on the high-value extras: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`.
- **Strong defaults, not blind absolutes.** Most rules are firm because they earn it; where a rule is genuinely a default, deviate with a reason — not on a whim.
- **Defer to the framework where it has a real convention.** Where a library or framework mandates a pattern (class-based components/services, a specific function form), follow it rather than fighting it. These rules are for code whose shape you control.
- A priming lens, not a closed checklist — keep reasoning about the specific code.

## The areas

### Control flow → `references/control-flow.md`
Early-return guard clauses, block bodies (including `switch` cases), positive conditions, no `else` after `return`, `switch` over chained `if`.

### Functions & classes → `references/functions-and-classes.md`
Named standalone functions are `function` declarations, not arrow-consts. Default to functions and modules; a class is the rare exception for a genuine instantiable object — not for state or grouping.

### Type safety → `references/type-safety.md`
No `any`, no non-null `!`, `as` only as a last resort (and `satisfies` over `as`), no catch-all types (`{}`/`object`/`Function`), `unknown` for uncertain values, let inference do return types.

### Type modelling → `references/types-and-modelling.md`
`interface` by default (`type` when you need what it can't do), discriminated unions for state with mandated exhaustiveness, derive with utility types instead of hand-rolling, brand domain primitives, `as const` objects instead of `enum`.

### Generics → `references/generics.md`
Generics to relate types (never a single-use type param), constrained with `extends`, with default type params where useful.

### Async & errors → `references/async-and-errors.md`
No floating promises, `await` over `.then`, `Promise.all` for independent work; throw `Error` (or a subclass), and treat caught errors as `unknown`.

### Time → `references/time.md`
No code reads the current time itself: one injected clock for every "now", "today" and timed wait; `Date.now()`, `new Date()` without a value and `performance.now()` are banned in app code.

### Modules & naming → `references/modules-and-naming.md`
Named exports over default, `import type` for type-only imports; descriptive names, no `I`/`T` prefixes.
