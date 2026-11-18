# Control flow

- **Early returns for guard clauses** — return early on error/edge cases to keep the main path flat.
- **Block bodies, always.** An `if` that returns uses braces, never `if (!x) return;` on one line. The same holds for `switch` cases: the case body goes on its own line, with braces **only** when the case genuinely needs its own scope (e.g. a `const` declared inside it) — and never a one-line `case 'x': return …;`.
- **Prefer positive conditions** — check what should happen, not what shouldn't. Guard clauses are the exception; negatives are expected there.
- **No `else` after `return`** — if a branch returns, the following code needs no `else`.
- **`switch` over chained `if`** when testing one variable against several values.
