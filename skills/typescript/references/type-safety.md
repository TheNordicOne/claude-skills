# Type safety

- **No `any`** — forbidden. Use `unknown` for uncertain values and narrow, or generics to preserve/relate types.
- **No non-null assertions (`!`)** — forbidden. Use optional chaining (`?.`) or a guard clause.
- **`as` is a last resort.** Before casting, fix the type at its source, or anywhere up or down the chain you control — the definition, the caller, the callee. Cast only when you genuinely cannot change the types anywhere.
- **`satisfies` over `as` for literals** — `satisfies` validates a value against a type while keeping its narrow, literal type; `as` widens it and silences excess-property checks.
- **No weak types** — `{}`, `object`, and `Function` accept almost anything; use a specific shape or call signature instead.
- **Let inference do return types** — annotate only when needed: public API surface, recursion, or when inference produces the wrong type.
