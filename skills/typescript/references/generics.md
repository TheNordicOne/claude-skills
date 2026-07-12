# Generics

- **Generics exist to relate types** — an input to an output, one parameter to another. A type parameter used in a single position relates nothing and is noise; take a concrete type or `unknown` instead.
- **Prefer generics over broad-then-cast** — a generic parameter that preserves the caller's type beats accepting a broad type and casting the result back.
- **Constrain with `extends`** — bound a parameter to what the code actually requires (e.g. `K extends keyof T`) rather than leaving it bare and then assuming or indexing into it.
- **Default type parameters** where a sensible default keeps the common call simple.
