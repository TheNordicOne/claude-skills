# Async & errors

## Async

- **No floating promises** — every promise is `await`ed or explicitly `void`ed. A dangling call risks an unhandled rejection and loses ordering.
- **`await` over `.then` chains** — read top-to-bottom with `async`/`await` rather than threading `.then` callbacks.
- **`Promise.all` for independent work** — run async operations that don't depend on each other in parallel, not as sequential `await`s.

## Errors

- **Throw `Error`, never a string or literal** — throw an `Error` or a subclass, so there's a stack and a consistent shape. Subclass for typed/domain errors.
- **Caught errors are `unknown`** — narrow (e.g. `instanceof`) before use; never assume the type or cast the caught value to `any`.
