# Type modelling

- **`interface` by default** for object shapes; reach for `type` only when you need what `interface` can't express — unions, intersections, tuples, mapped/conditional/template-literal types, or aliasing a primitive. (A function type works either way; `type` just reads cleaner.)
- **Model states as discriminated unions.** When a thing has distinct states, use a tagged union (a shared `status`/`kind` discriminant) rather than one object full of optional/boolean fields that permit impossible combinations — e.g. `{ status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: Error }`. The union makes the illegal states unrepresentable and narrows cleanly.
- **Mandate exhaustiveness.** A `switch` over a discriminated union ends in a `default` that assigns the value to `never` (an `assertNever` helper), so adding a new variant becomes a compile error rather than a silent gap.
- **Derive with utility types.** Build related shapes from a source type with `Pick`/`Omit`/`Partial`/`Required`/`Record` and friends, instead of hand-writing duplicate shapes that drift out of sync.
- **Brand domain primitives.** Where a bare `string`/`number` invites mixing up values (ids, amounts, tokens), give it a nominal brand (e.g. `string & { readonly __brand: 'AccountId' }`) so the wrong primitive can't be passed.
- **No `enum`** — use an `as const` object with a derived type instead (`type Status = (typeof Status)[keyof typeof Status]`).
