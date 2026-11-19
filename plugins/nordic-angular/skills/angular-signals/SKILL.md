---
name: angular-signals
description: Angular signals, computed properties, and effects. Activate when code uses `signal()`, `computed()`, or `effect()` — critical rules to prevent infinite loops and misuse in components or services.
license: MIT
compatibility: Requires Angular 20+
---

# Angular Signals

Critical rules for Angular's reactive primitives. Misuse of effects is the #1 source of bugs.

## Signal Usage

- **`signal()`** for local mutable state
- **`computed()`** for any value derived from other signals — always the first choice for transformations
- **`computed()` is pure.** It only derives and returns a value: no side effects of any kind (no writes to signals, fields, caches, maps, storage, DOM, no requests, no logging). A computed that fills a cache "harmlessly" is a violation; derive the cached objects as their own value instead.
- **`set()` or `update()`** to modify signal values
- Keep state transformations pure and predictable

## Effects — Critical Rules

**NEVER set a signal inside an effect.** This creates circular dependencies and infinite loops.

This includes **indirect** writes: an effect that calls a method, service or callback which then sets a signal is the same violation. Hiding the write behind a function call, `untracked()`, `queueMicrotask`/`setTimeout`, or `allowSignalWrites` is a hack, not a fix. Use what Angular provides instead: `computed()` for derived values, `linkedSignal()` for state that resets or follows a source, `resource()`/`rxResource()`/`httpResource()` for async loading, an `output()` or a direct call from the event handler (the user gesture) for things a person does, and `afterRenderEffect()` only for DOM work that writes no signal.

```typescript
// FORBIDDEN — infinite loop
effect(() => {
  this.mySignal.set(this.someInput());
});

// CORRECT — use computed
mySignal = computed(() => this.someInput());
```

**Effects are for side effects ONLY:**
- Logging and analytics
- DOM manipulation (rare, escape hatch)
- External event emissions
- **NEVER for state updates** — use `computed()` instead

## When to Use What

| Need | Use |
|:-----|:----|
| Local mutable state | `signal()` |
| Derived/transformed value | `computed()` |
| React to changes with side effects | `effect()` |
| Combine multiple signals | `computed()` |
