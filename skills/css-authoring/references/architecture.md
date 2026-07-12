# Architecture — placement, files, layers, order

## General placement: foundations global, specifics scoped

This is about *where a style conceptually belongs*, not an exact file tree or a specific framework's mechanism.

- **Global / root scope holds the foundations:** design tokens (custom properties), reset/normalize, base element + typography defaults, and genuinely app-wide utilities. Base element styling (e.g. the app-wide `button` look) is foundational and lives here.
- **A component owns its own styles:** its layout, structure, and variants live *with that component*. Components *consume* the global foundations but their specifics never leak into global scope.

## File organization: one responsibility per file, no god-file

"Put it at the root" without discipline becomes a 2,000-line stylesheet. Separate the foundations into focused, single-responsibility files (tokens, reset, base/typography, utilities, theming…) — a file spanning concerns or growing large is the signal to split. Component styles sit with their component. The exact names and tree are the project's call; what matters is that every file can be named by its single job.

## Cascade layers: make what-wins deliberate

Organize styles into ordered layers so what wins is decided by **layer order**, not source order or specificity escalation — which is precisely what lets specificity stay flat and `!important` stay unnecessary. (The `@layer` syntax itself lives in `css-features`; this is the philosophy.)

```css
@layer reset, base, components, utilities;

@layer base       { button { … } }               /* base element styling */
@layer components { .invoice-summary { … } }      /* more specific selector… */
@layer utilities  { .stack { … } }                /* …still overridden by this, purely by layer order */
```

The gotcha to watch: **unlayered styles beat every layer**, whatever the order — a stray unlayered rule silently trumps the whole system.

```css
.thing { … }   /* UNLAYERED → wins over anything in @layer utilities */
```

## Declaration order within a rule: grouped by concern

Order properties by concern, with a **blank line between groups** and **no group-label comments** (the order carries it; labels are noise):

```css
.card {
  position: relative;
  inset-block-start: 0;
  z-index: var(--z-raised);

  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  inline-size: min(100%, 40rem);

  color: var(--color-text);
  font: …;

  background: var(--color-surface);
  border-radius: var(--radius-2);
}
```

Group sequence: **positioning → box model / layout → typography → visual → misc** (transitions, cursor, etc.).
