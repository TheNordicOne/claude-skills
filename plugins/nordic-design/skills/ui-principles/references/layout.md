# Layout and widths

Let content and available space decide the layout. Sources in brackets, listed in [sources.md](sources.md).

## Contents

- Intrinsic first
- Breakpoints and container queries
- Widths
- Reflow
- Placement order of dynamic parts
- Fixed parts never hide
- Review checks

## Intrinsic first

In order of preference: [Jen Simmons, intrinsic web design; Every Layout axioms; Every Layout Switcher, Sidebar, Cluster]

1. **Wrapping:** flex-wrap or grid that wraps on its own (Every Layout's Cluster, Switcher, Sidebar).
2. **auto-fit with minmax:** `repeat(auto-fit, minmax(min(100%, <min>), 1fr))`, where `<min>` comes from the content (the narrowest a card can be and still work), not from a device width. [MDN repeat() / auto-fit; web.dev learn grid]
3. **clamp()** for sizes that should grow smoothly (gutters, padding, type).
4. **Container queries** only for structural switches (a list becomes a table, a sidebar moves below). [MDN container queries; web.dev new responsive]

## Breakpoints and container queries

- Breakpoints come from the content: where the layout breaks, not where a device ends. [web.dev responsive basics]
- Keep a small named set (for example compact, medium, wide) shared by all components.
- Prefer container queries over viewport media queries for components, so they adapt to the space they get.

## Widths

- Reading columns: limit paragraph width (see [typography.md](typography.md)), not the whole page.
- Size limits in rem or ch, so they scale with the user's font size.
- Avoid fixed pixel widths for content containers.

## Reflow

- Content works at 320 CSS px wide (400 % zoom) without two-dimensional scrolling, except for content that needs two dimensions (tables, maps). [WCAG 1.4.10]

## Placement order of dynamic parts

Parts that not every item or view has (badges, extra actions, optional meta) are ordered by how stable they are, counted from the edge the group is aligned to. `[reasoned]` from [Gestalt similarity; Laws of UX: Law of Similarity; NN/g consistency and standards]

- Start-aligned: always there → most → some → rarest.
- End-aligned: rarest → … → always there, so the always-there part sits at the very end.
- The same spot then always holds the same kind of thing, rows stay steady, and differences are easy to scan.
- Applies to list rows, bars and toolbars, also across the views of one page.

## Fixed parts never hide

- Primary UI elements stay visible when their content is missing: tabs, main controls, a list's toolbar (search, sort, filter), its head and columns. They stay usable and show an empty state; disable a control only when using it is impossible, and say why. [NN/g empty states; `[reasoned]`]
- Secondary information may stay hidden when empty.
- Why: the layout stays stable; nothing moves between the empty and the filled view. [web.dev Cumulative Layout Shift]

## Review checks

- Could wrapping or auto-fit replace a breakpoint?
- Are minimums derived from content?
- Is every breakpoint from the small named set, and does each switch structure?
- Does anything need horizontal scrolling at 320px?
- Are optional parts ordered by stability from the aligned edge?
- Does any primary part disappear when its content is empty?
