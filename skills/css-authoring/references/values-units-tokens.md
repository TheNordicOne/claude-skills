# Values, units & tokens

## Units — choose by the behaviour you want

There is no 1:1 property→unit mapping. Pick the unit for what you're trying to achieve; where several are valid, the deciding factor is the behaviour you want, not a fixed answer.

- **Text sizing → `rem`.** Root-relative, so it respects the user's browser font-size/zoom preference; `px` ignores that and is an accessibility problem. This is the right call for virtually all real text. A genuine edge case can override it — but you should be able to name the reason.
- **`em`** is relative to the *parent's* font-size, so it compounds through nesting (`0.9em` inside `0.9em` → `0.81em`). Use it only when you actually want something to size relative to its local context.
- **Otherwise, by intent:** proportional layout (`%`, `fr`), line length (`ch`), viewport-relative (prefer `dvh`/`svh` where mobile UI chrome matters). Unitless where the property is unitless (`line-height`, `z-index`); `0` needs no unit.

## Numbers come from a scale

A value should be intentional and explainable. Pull spacing, sizes, radii, and the like from a consistent scale rather than plucking arbitrary numbers. An off-scale, arbitrary-precision value like `0.8231rem` is a smell — it usually means a number was reached by accident instead of by intent.

## When a raw number becomes a custom property

Promote a value to a custom property when it is **shared by meaning** — the same value used in several places *because it represents one concept* — so there is one source of truth and the places can't drift:

```scss
/* smell: 4rem repeated because it's all "the header height" — drifts the moment one changes */
.header { block-size: 4rem; }
.page   { padding-block-start: 4rem; }

/* intentional: one concept, one source */
:root   { --header-height: 4rem; }
.header { block-size: var(--header-height); }
.page   { padding-block-start: var(--header-height); }
```

**Meaning, not coincidence:** two values that are equal *by accident* and mean different things must stay separate — a gap and a radius that both happen to equal one step today are different concepts and will diverge.

And a **genuine standalone constant** that just *is* that value is fine as a raw number — not everything needs a name. Over-tokenizing self-evident one-offs (`border: 1px solid`, `max-inline-size: 65ch`) is noise.

## Derivations use `calc` — and `calc` is a yellow flag

A value that is genuinely a **derivation of other values** should express the relationship, not hardcode a pre-computed result that hides it and drifts:

```scss
/* hidden derivation baked into a literal — will drift when the header changes */
.dropdown { inset-block-start: 5.5rem; }

/* the relationship, expressed */
.dropdown { inset-block-start: calc(var(--header-height) + var(--space-2)); }
```

A `calc` that encodes real intent — a deliberate relationship you want to hold, or mixing units that can't otherwise combine — is good CSS. Intent decides which you mean:

```scss
/* correct IF the intent is "always twice --space-2"; writing var(--space-4) would be a different statement */
.thing { padding-inline: calc(var(--space-2) * 2); }
```

But reaching for `calc`, **especially in positioning or sizing, is often a symptom that the structure is doing something awkward** — stop and ask whether a better layout removes the need:

```scss
/* reflex */
.panel { block-size: calc(100dvh - var(--header-height)); }

/* better: let the layout distribute the space — no arithmetic, can't drift */
.app   { display: grid; grid-template-rows: auto 1fr; min-block-size: 100dvh; }
.panel { /* simply occupies the 1fr row */ }
```

`calc` is the exception you justify, not the default you grab. It is not discouraged — a `calc` with real intent is fine; a `calc` with no intent, or one patching a bad structure, is the smell.

## Custom-property mechanics

- **Scope where used.** Global design tokens live at the root; a property only one component cares about is defined on that component, not dumped on `:root`.
- **Fallbacks.** Use `var(--x, fallback)` where a property may be unset, so a missing value degrades sensibly instead of blanking out.

```scss
:root    { --color-primary: oklch(0.62 0.19 255); --space-3: 0.75rem; }

.carousel {
  --slide-gap: var(--space-3);   /* local to this component; :root stays uncluttered */
  gap: var(--slide-gap);
}

button { background: var(--accent, var(--color-neutral)); }   /* no --accent set → neutral, not blank */
```
