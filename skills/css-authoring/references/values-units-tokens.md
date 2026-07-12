# Values, units & tokens

## Units — choose by the behaviour you want

There is no 1:1 property→unit mapping. Pick the unit for what you're trying to achieve, and where several are valid, decide by the behaviour you want rather than a fixed answer.

- **Text sizing defaults to `rem`** — root-relative, so it respects the user's browser font-size/zoom, where `px` would ignore it (an accessibility problem). This is right for virtually all real text; a genuine edge case can override it, but you should be able to name the reason.
- **`em`** is relative to the *parent's* font-size and compounds through nesting — reach for it only when you actually want something to size relative to its local context.
- **Otherwise, by intent** — proportional layout, line length, viewport-relative (prefer the dynamic/small viewport units where mobile UI chrome matters). Leave unitless what is unitless (`line-height`, `z-index`); `0` needs no unit.

## Numbers come from a scale

A value should be intentional and explainable. Pull spacing, sizes, radii and the like from a consistent scale rather than plucking arbitrary numbers; an off-scale, arbitrary-precision value is a smell that a number was reached by accident, not by intent.

## When a raw number becomes a custom property

Promote a value to a custom property when it is **shared by meaning** — the same value used in several places *because it represents one concept* — so there is a single source of truth and the places can't drift. Share by meaning, **not by coincidence**: two values equal by accident that mean different things must stay separate, or they'll be wrongly coupled when one later changes. A **genuine standalone constant** that simply *is* that value stays a raw number; not everything needs a name, and over-tokenizing self-evident one-offs is noise.

## Derivations use `calc` — and `calc` is a yellow flag

If a value is genuinely a **derivation of other values**, express the relationship with `calc` from named parts rather than hardcoding a pre-computed result that hides the relationship and drifts. A `calc` that encodes real intent — a deliberate relationship you want to hold, or mixing units that can't otherwise combine — is good CSS; intent decides whether you mean "this relationship" or "an independent value that happens to equal it today."

But reaching for `calc`, **especially in positioning or sizing, is often a symptom that the structure is doing something awkward** — stop and ask whether a better layout removes the need. Gratuitous arithmetic that merely lands on a value, or a `calc` patching a bad structure, is the smell. `calc` is the exception you justify, not the default you grab — not discouraged, but earned.

## Custom-property mechanics

Scope a property where it's used: global design tokens at the root, but a property only one component cares about defined on that component, not dumped on `:root`. Provide a fallback (`var(--x, fallback)`) wherever a property may be unset, so a missing value degrades sensibly instead of blanking out.
