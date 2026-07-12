# Authoring hygiene

## Don't restate values already in effect

Declaring a property whose value is already the effective value is noise that reads as intent. "Already in effect" covers three sources: the property's initial value, the UA default, **and inherited values**.

```scss
/* noise: overriding nothing */
.thing {
  display: block;      /* a div is already block */
  position: static;    /* already static */
}
.article  { color: var(--text); font-family: var(--font-body); }
.article p {
  color: var(--text);          /* already inherited from .article */
  font-family: var(--font-body);
}
```

The nuance: a declaration that *looks* like a default while actually **overriding** an inherited, UA, or framework value is legitimate (`.menu { list-style: none; }`, or re-declaring an inherited value to deliberately decouple from a themeable ancestor). The test is always: does this change the computed value, or is it a no-op?

## Shorthand vs longhand — match the form to intent

A shorthand resets the sub-properties you omit. Use it when you mean the whole group (and want that reset); use longhand when you're changing one sub-property and must leave the siblings alone.

```scss
.box { background: var(--color-surface); }        /* whole group — also clears background-image/position/size/repeat */
.box { background-color: var(--color-surface); }  /* one sub-property — leaves an existing background-image intact */

.overlay  { inset-block: 0; inset-inline: 0; }   /* all edges via logical shorthands */
.dropdown { inset-block-start: 100%; }           /* mean one edge → longhand */
```

Never `transition: all` — name the properties you animate (it avoids animating unintended changes and the perf cost). `font` likewise forces size+family and resets the rest; for a single change use the longhand.

## Motion — cheap properties, tokenised, and sparing

- **Animate compositor-friendly properties** (`transform`, `opacity`) rather than layout-triggering ones (`inline-size`/`block-size`/`inset`/`margin`), which force reflow every frame.
- **Durations and easing come from tokens**, not scattered magic milliseconds.
- **Use motion sparingly and keep it subtle** — short, small, easing that doesn't call attention to itself. Restraint is the default; don't reach for animation lightly.

```scss
.panel {
  transition: transform var(--duration-2) var(--ease-out),
              opacity   var(--duration-2) var(--ease-out);
}
.panel[hidden] { opacity: 0; transform: translateY(-0.5rem); }
```

(`prefers-reduced-motion` is an accessibility concern — handle it there; this is a cross-reference, not a restatement.)

## Inline styles — avoid, with one exception

Inline styles can't be reused, carry near-top specificity, sit **unlayered** (so they override the whole cascade-layer system), and can't express pseudo-states or queries. The one legitimate use is passing a **dynamic runtime value** in as a custom property that the stylesheet then consumes — the value is dynamic, the styling stays in CSS:

```html
<div class="progress-bar" style="--progress: 0.6;">…</div>
```
```css
.progress-bar::after { inline-size: calc(var(--progress) * 100%); }
```
