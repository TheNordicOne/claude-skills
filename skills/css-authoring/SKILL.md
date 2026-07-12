---
name: css-authoring
description: >
  General CSS authoring conventions — units & values, tokens & custom properties, selectors &
  specificity, class naming, style architecture, and authoring hygiene. Activate when writing or
  reviewing `.css`/`.scss` beyond layout and modern-feature choices (those live in css-layout and
  css-features). Emphasizes intent and judgment over rote rules.
license: MIT
---

# CSS Authoring

How to make good CSS authoring decisions — units, values, selectors, naming, and where rules live. Companion to `css-layout` (Grid/Flex, logical properties) and `css-features` (colour, container queries, `:has()`, nesting, cascade-layer syntax); this skill covers the general authoring judgment those two don't.

## How to use this skill — read this first

These guidelines exist to make you **think about what you're doing**, not to hand you a lookup table. Hold them in that spirit:

- **Intent decides.** The same declaration can be right or wrong depending on what you're trying to achieve. There is rarely a 1:1 "this property → that value" mapping; where several options are legitimate, the guidance names the deciding factor, not a single forced answer.
- **Best practices, not reinvention.** These are established conventions applied with judgment — use them, don't re-derive them.
- **Strong defaults, not absolutes.** A "default" is where you start and deviate with a reason — not a `NEVER`/`ALWAYS`. Almost nothing here is a hard ban; the few genuinely firm rules say so and explain why.
- **A priming lens, not a closed checklist.** Examples are illustrative. Keep reasoning about how *this* code should behave — a problem not named here is still a problem, and a pattern flagged here can be exactly right in context.
- **Framework-agnostic.** No framework names, file conventions, or tooling assumptions — the principles hold anywhere CSS is written.

Detail and examples for each area live in `references/` — pull the file you need rather than loading everything.

## The areas

### Values, units & tokens → `references/values-units-tokens.md`
Choose the unit by the behaviour you want (`rem` for text so it respects user zoom; others by intent — no fixed table). Numbers come from a scale; a value shared *by meaning* becomes a custom property (one source of truth), a value that's really a *derivation* is computed with `calc`, and a genuine standalone constant is fine as-is — don't over-tokenize. `calc` is a yellow flag: great for a real relationship, a smell when it papers over structure. Scope a custom property where it's used and give sensible fallbacks.

### Spacing & sizing → `references/spacing-and-sizing.md`
Space *between* elements is owned by the container (`gap`); *internal* space is `padding` on the element — different lanes. Size is content-driven by default; constrain only when warranted, and reach for `clamp()` when you want a fluid range. Fixed sizing is not a smell — intent decides.

### Selectors & specificity → `references/selectors-and-specificity.md`
Keep specificity low and flat. Classes are the primary hook, but element, state (`:disabled`, `[aria-*]`), pseudo-element, and substring/attribute selectors are all legitimate where they fit. Don't style via `#id`, don't couple selectors to tag or DOM structure, and match the combinator to the real relationship. `!important` is a last resort with a required justifying comment.

### Naming → `references/naming.md`
Principles over any methodology (no BEM-style taxonomy). Base styles come from the element or a starts-with family selector; a variant is one explicit class that overrides only the tokens it needs; sharing happens through tokens, never a generic hook or an invented `data-*`. Names are explicit, effectively unique/searchable, semantic (role, not appearance), and kebab-case — no cryptic abbreviations or empty catch-alls.

### Architecture — placement, files, layers, order → `references/architecture.md`
Foundations (tokens, reset, base/typography) live at the global scope; component-specific styles live with their component. One responsibility per file — no god-file. Cascade layers make what-wins deliberate, which is what lets specificity stay flat. Within a rule, group declarations by concern (positioning → box/layout → typography → visual → misc) with a blank line between groups.

### Authoring hygiene → `references/authoring-hygiene.md`
Match shorthand/longhand to intent (shorthands reset omitted sub-properties; never `transition: all`). Don't restate values already in effect, including inherited ones. Animate cheap properties (`transform`/`opacity`) with tokenised durations, and use motion sparingly and subtly. Avoid inline styles except to pass a dynamic value in as a custom property.
