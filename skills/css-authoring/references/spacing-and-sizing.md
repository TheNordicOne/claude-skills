# Spacing & sizing

## Two spacing lanes: between vs inside

Space *between* elements and space *inside* an element are different jobs — don't conflate them.

### Between elements → the container owns it with `gap`

Default to `gap` on the flex/grid parent so the container owns the spacing between its children, and the children carry no assumption about their surroundings (they stay reusable, and there's no trailing-edge margin to strip).

```scss
/* vertical stack → grid (per css-layout: Flexbox is for single-axis inline flows) */
.list { display: grid; gap: var(--space-3); }

/* single-axis inline flow that may wrap → flex is right */
.chips { display: flex; flex-wrap: wrap; gap: var(--space-2); }
```

**Escape hatch:** a single-direction margin for flow content whose parent's display you don't control (e.g. rendered rich text) — only *between*, one direction, so it can't double up or collapse-surprise:

```scss
.prose > * + * { margin-block-start: var(--space-3); }
```

**Smells** — the structure asking to be fixed:

```scss
.action { margin-inline-start: auto; }              /* auto-push — also banned by css-layout */
.grid   { margin: calc(var(--space-4) * -1); }      /* negative-margin clawback (and a needless calc) */
```

### Inside an element → `padding` on the element

Internal breathing room is `padding`, owned by the element itself. It's the right tool, not a smell: it doesn't collapse (margins do), and it enlarges an interactive element's hit area (a margin would only shove neighbours). The two lanes coexist cleanly:

```scss
.list {
  padding: var(--space-4);              /* the list's own inset (internal) */
  display: grid; gap: var(--space-3);   /* space between its children (external) */
}
```

The smell is crossing lanes: faking internal space with margins, or faking between-space by padding the parent instead of using `gap`.

## Sizing — content-driven by default

Let content determine size; don't hard-fix dimensions reflexively. Constrain only when there's a real reason — whether to constrain at all is situational.

```scss
/* content-driven: no fixed height, content dictates */
.card { /* no block-size */ }
```

A fixed dimension is **not** inherently a smell — a fixed-height card can be exactly the intent, and the code alone doesn't tell you; only intent does. Don't flag fixed sizing on sight.

When you do limit to a **range**, prefer `clamp()` (fluid between bounds in one shot) over static `min`+`max` pairs or breakpoint jumps — but don't force it; a lone bound is fine when that's all you need:

```scss
.prose  { inline-size: clamp(45ch, 60%, 75ch); }   /* wants both a floor and a ceiling → clamp */
.figure { max-inline-size: 40rem; }                /* wants only a ceiling → a plain cap; clamp here would be noise */
```

`clamp` is a tool for when you want a fluid range — most values, including most `font-size`, don't need it.
