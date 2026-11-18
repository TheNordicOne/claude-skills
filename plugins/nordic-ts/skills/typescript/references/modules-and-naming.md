# Modules & naming

## Modules

- **Named exports over default** — consistent import names across the codebase, better rename/refactor, better autocomplete, and no accidental divergent names.
- **`import type` for type-only imports** — keep type imports separate from value imports; it documents intent and drops cleanly at compile time.

## Naming

- **Be descriptive** — specificity over brevity: `activeUsers` not `data`, `sortByDate` not `process`.
- **No `I`/`T` prefixes** — `User` not `IUser`, `Config` not `TConfig`.
