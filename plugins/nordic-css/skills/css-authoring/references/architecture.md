# Architecture — placement, files, layers, order

## General placement: foundations global, specifics scoped

This is about *where a style conceptually belongs*, not an exact file tree or any framework's mechanism. The global/root scope holds the **foundations**: design tokens, reset/normalize, base element and typography defaults, and genuinely app-wide utilities — base element styling is foundational and lives here. A **component owns its own styles** — its layout, structure, and variants live with that component; components consume the global foundations, but their specifics never leak into global scope.

## File organization: one responsibility per file, no god-file

"Put it at the root" without discipline becomes a single enormous stylesheet. Separate the foundations into focused, single-responsibility files (tokens, reset, base/typography, utilities, theming); a file spanning concerns or growing large is the signal to split. Component styles sit with their component. The exact names and tree are the project's call — what matters is that every file can be named by its single job.

## Cascade layers: make what-wins deliberate

Organize styles into ordered layers so what wins is decided by **layer order**, not source order or specificity escalation — which is precisely what lets specificity stay flat and `!important` stay unnecessary. (The layer syntax itself lives in `css-features`; this is the philosophy.) Note that layer order governs only *layered* styles: **unlayered styles sit above every layer** regardless of order, so a stray unlayered rule silently trumps the whole system.

## Declaration order within a rule: grouped by concern

Order properties by concern — positioning, then box model / layout, then typography, then visual, then miscellaneous (transitions, cursor) — with a **blank line between groups** and **no group-label comments**, since the order carries it and labels are noise.
