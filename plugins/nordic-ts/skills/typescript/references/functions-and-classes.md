# Functions & classes

## Functions

A named, standalone function is a `function` declaration, not `const name = () => {}`. Declarations hoist (so you can order code top-down, callers above definitions), the `function` keyword announces what the thing is, and stack traces get a real name — the reflexive `const fn = () =>` habit buys none of that.

Arrow functions are for the cases the rule doesn't reach, not for dodging it: **anonymous callbacks** passed as arguments, and **functions you're handed back and must store** (a `useCallback` result, or an arrow you immediately `return`). **Currying is not a reason** to make the *named* function an arrow — the outer named function stays a declaration, and only the returned inner lambda is an arrow.

Where a framework has an established idiom for how its functions are written, match it.

## Classes

Default to plain functions and modules. A class earns its place only when you genuinely need to **construct instances that bundle data with the operations on it and are used as instances** — a builder, a stateful parser, and the like. Reaching for a class merely to hold some state, or to group functions behind injected dependencies (a "service"), is not that — write functions. Where a framework's convention is class-based (components, services), follow it — that carve-out is the main place a class is the right call.
