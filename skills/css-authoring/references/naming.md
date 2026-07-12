# Naming

## Principles over methodology

Don't adopt a named methodology (BEM and its relatives). Those were invented to compensate for what CSS couldn't do at the time — no scoping, no real state selectors, specificity chaos — and they push you toward *more classes* instead of *better selectors*. Modern CSS plus component scoping removes most of what they solved. Use the principles below and lean on the platform.

## The component model: base from element-or-family, variant as an explicit override

The **base** styling of a component comes from the semantic element, or — when no element fits — from a **starts-with family selector**. You should not need a `.btn` class that merely mirrors the `<button>` element.

A **variant** is one explicit, self-describing class that overrides **only** what it needs — ideally just custom properties. The shared value lives in a **token**, never in a generic hook or an invented attribute.

```html
<button class="button-primary">Save</button>
<aside  class="note-primary">Heads up…</aside>
```
```scss
/* BASE — element selector for real elements… */
button           { background: var(--accent, var(--color-neutral)); }
/* …starts-with family selector where there's no element */
[class^="note-"] { border-inline-start: 0.25rem solid var(--accent, var(--color-neutral)); }

/* VARIANT — explicit class overrides only the token it needs */
.button-primary { --accent: var(--color-primary); }
.note-primary   { --accent: var(--color-primary); }
```

**Caveat on the family selector:** `[class^="note-"]` matches only when `note-…` is the *first* class in the attribute string, so `class="elevated note-primary"` won't match. If these elements can also carry other classes, use the robust form `[class^="note-"], [class*=" note-"]` (note the leading space in the second).

Why this shape:
- The **shared thing is the component base** (grouped by the element or a `[class^="note-"]` family), **not the variant**. Grouping by variant (`[class$="-primary"] { --accent: … }`) recreates a utility class — though the substring technique itself is fine, it's just the wrong split here.
- **Sharing happens through the token** (`--color-primary`), which is the "shared by meaning → custom property" rule. Each explicit class just consumes it.
- **Do not invent a `data-*` to style** (`data-variant="primary"` is a class in disguise). Style only from attributes that exist for a real reason — real state (`[data-state="open"]` the behaviour sets), native, or ARIA.

## Name quality: explicit, unique, searchable

A class name should read as what the thing is.

- **No cryptic abbreviations** — say the whole word, or drop the class when the element already is it: `.btn` → the `<button>` element, `.hdr` → `.invoice-header`, `.img-wrap` → `.avatar-frame`.
- **No empty catch-alls** — `.wrapper`, `.box`, `.item`, `.content`, `.container` are meaningless *and they duplicate*: every component ends up with a `.container`, so the name tells you nothing and you can't grep it or tell them apart. Scoping stops the technical collision but doesn't redeem a meaningless, repeated name. Pick something specific enough to be **effectively unique and searchable**: `.product-gallery`, `.invoice-summary`, `.comment-thread`.

## Semantic, not presentational

Name by role/meaning, not appearance — appearance changes and a presentational name becomes a lie:

```scss
.red-text, .big-bold, .left-column      /* becomes wrong when red→orange, in RTL, on restyle */
.error-message, .page-title, .sidebar   /* stays true through any restyle */
```

A genuine utility is the one deliberate exception — it's about its effect and named for that function.

## Casing: kebab-case

Lowercase, hyphen-separated, for classes and custom properties — consistent with CSS's own property casing and HTML's lowercase attributes.

```scss
.product-gallery { … }
:root { --color-primary: …; --space-3: …; }
```
