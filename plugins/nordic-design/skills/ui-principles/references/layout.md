# Layout and widths

Let content and available space decide the layout. Sources in brackets, listed in [sources.md](sources.md).

## Contents

- Intrinsic first
- Breakpoints and container queries
- Widths
- Reflow
- Review checks

## Intrinsic first

In order of preference: [Jen Simmons, intrinsic web design; Every Layout]

1. **Wrapping:** flex-wrap or grid that wraps on its own (Every Layout's Cluster, Switcher, Sidebar).
2. **auto-fit with minmax:** `repeat(auto-fit, minmax(min(100%, <min>), 1fr))`, where `<min>` comes from the content (the narrowest a card can be and still work), not from a device width. [MDN repeat(); web.dev learn grid]
3. **clamp()** for sizes that should grow smoothly (gutters, padding, type).
4. **Container queries** only for structural switches (a list becomes a table, a sidebar moves below). [MDN container queries; web.dev]

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

## Review checks

- Could wrapping or auto-fit replace a breakpoint?
- Are minimums derived from content?
- Is every breakpoint from the small named set, and does each switch structure?
- Does anything need horizontal scrolling at 320px?
