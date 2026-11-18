---
name: css-layout
description: CSS layout rules — Grid vs Flexbox and logical properties. Activate when editing `.scss` or `.css` files involving layout, positioning, spacing, margins, padding, or sizing. Enforces logical properties for RTL/i18n.
license: MIT
---

# CSS Layout

## Grid vs Flexbox

**Prefer CSS Grid for layout.** Use Flexbox only for single-axis inline flows.

- **Grid:** Page layouts, card grids, form layouts, dashboard panels — anything aligning across both axes
- **Flexbox:** Tag lists, chip groups, button rows, breadcrumbs — single-axis flows that may wrap
- **Centering a single item:** Flexbox is fine
- Use `subgrid` when children need to align with a parent grid

## Intrinsic Layout First

Let content and available space decide the layout. Reach for a breakpoint only when the structure itself must change. In order of preference:

1. **Wrapping, no query.** A row that only needs to stack when it runs out of room (button rows, "from / to" pairs, label beside value, toolbars) wraps on its own:
   - single-axis rows: Flexbox with `flex-wrap: wrap`
   - equal items: `grid-template-columns: repeat(auto-fit, minmax(min(100%, <item min>), 1fr))`
   - `<item min>` is the smallest size one item needs, taken from its content (e.g. a date field) — never a page or device width
2. **Fluid values, no query.** Sizes that should grow smoothly (headings, page padding) use `clamp()` with container units (`cqi`) instead of jumping at a breakpoint.
3. **Container queries for structural switches only.** A side column appearing, a table turning into cards, a two-column record layout. Never media queries for component layout.

### Breakpoints

- **Content-driven:** a breakpoint sits where the content actually breaks, never at a device width.
- **One small named set per project**, documented in the design system with the job of each value. Use only those values; never invent a new one or a near-duplicate (24rem next to 26rem).
- Custom properties do not work inside `@container` conditions, so the set cannot be a token: document it and enforce it with lint.
- A container query that only stacks a row is a smell — make the row wrap instead.

## Logical Properties

**ALWAYS use CSS logical properties.** Physical directional properties are forbidden.

- `margin-inline-start` not `margin-left` — `margin-block-start` not `margin-top`
- `padding-inline` / `padding-block` not `padding-left` / `padding-top`
- `inline-size` not `width` — `block-size` not `height`
- `max-inline-size` not `max-width` — `min-block-size` not `min-height`
- `inset-inline-start` not `left` — `inset-block-start` not `top`
- `border-inline-start` not `border-left`
- `border-start-start-radius` not `border-top-left-radius`
- Use axis shorthands when setting both sides: `margin-block: 1rem 2rem`
- **`inset` is physical** — use `inset-block-*` / `inset-inline-*` for logical positioning
- **Never mix** logical and physical properties in the same ruleset

### Logical Axes

- **Block axis:** vertical in horizontal writing modes (top/bottom)
- **Inline axis:** horizontal in horizontal writing modes (left/right)
- In RTL, inline direction reverses. In vertical writing modes, axes rotate.

## No `margin: auto` for Pushing

**Never use `margin-inline-start: auto`** or similar `margin: auto` tricks to push elements. Use proper Grid or Flexbox placement on the parent instead.

```scss
// WRONG
.action { margin-inline-start: auto; }

// CORRECT
.toolbar {
  display: grid;
  grid-template-columns: 1fr auto;
}
```
