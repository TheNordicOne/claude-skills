---
name: ui-principles
description: >
  Sourced rules for UI foundations: spacing and grouping, typography and type scales, colour and
  contrast, layout and widths, states and focus, motion, and elevation. Use when building or
  reviewing layouts, spacing scales, type scales, colour tokens, focus or selected states,
  animations or shadows, in CSS, design tokens, a design system or a design file, and whenever a
  foundation choice has to be justified with a principle.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
  sources: See references/sources.md (Gestalt via NN/g, Laws of UX, W3C WCAG 2.2, Material Design 3, IBM Carbon, Atlassian Design System, Every Layout, Utopia, Jen Simmons, Butterick's Practical Typography, MDN, web.dev).
---

# ui-principles

Rules for the foundations every screen is built on. Each rule has a source in [references/sources.md](references/sources.md). For component- and flow-level usability, use `nordic-web:ux-review`; for CSS mechanics, the `nordic-css` skills.

**How to use:** read only the area you are working on. When reviewing, cite the rule and its source in each finding; a rule here that says something is fine is as binding as one that flags a problem. Rules tagged `[reasoned]` are derived from the cited principles, not stated by a source; say so when citing them.

## Areas

| Area | Read when | Reference |
|---|---|---|
| Spacing | Setting gaps, padding, margins, spacing tokens, grouping | [references/spacing.md](references/spacing.md) |
| Typography | Type scales, headings, line length, fluid type | [references/typography.md](references/typography.md) |
| Colour | Contrast, colour roles, state colours | [references/colour.md](references/colour.md) |
| Layout | Widths, grids, breakpoints, container queries, order of dynamic parts, fixed parts | [references/layout.md](references/layout.md) |
| Sizes | Control heights, icon sizes, radii, border widths | [references/sizes.md](references/sizes.md) |
| States and focus | Hover, focus, selected, disabled, target size | [references/states-and-focus.md](references/states-and-focus.md) |
| Motion | Transitions, durations, reduced motion, delays | [references/motion.md](references/motion.md) |
| Elevation | Shadows, layers, borders, container edges | [references/elevation.md](references/elevation.md) |

## Consistency

- Each kind of use case has one way to be handled. The same kind of list is never shown two ways; the same kind of interaction is never done two ways. [NN/g consistency and standards; Laws of UX: Jakob's Law]
- Judge "the same kind" by intention, not by looks. Things that look or sound alike can serve different intentions and may need different designs. There is no blanket rule forcing everything down one path.

## The core rules at a glance

- **Spacing:** nested grouping levels never use neighbouring scale steps; space between groups is clearly bigger than inside.
- **Headings:** clearly more space above than below (about twice, `[reasoned]`); one h1 per page.
- **Line length** limits are for paragraphs, not for one or two sentences of UI text.
- **Fluid type** may bring levels closer on small screens; only levels that stack must stay distinct.
- **Layout:** intrinsic first; breakpoints only for structural switches, from a small content-driven set. Dynamic parts are ordered by stability from the aligned edge; fixed parts stay visible and usable.
- **Colour:** selected and current states use the action colour (`[reasoned]`). Contrast is computed, never estimated.
- **States** need a second cue beyond a faint fill.
- **Disabled** only while an action is running or with a visible reason how to enable it; controls the person may never use are hidden.
- **Motion:** reduced motion removes movement, not delays.
- **Edges:** faint edges on non-interactive containers are a valid choice when spacing carries the grouping.

## Common mistakes

| Mistake | Instead |
|---|---|
| Item gap 0.75rem (12px), group gap 1rem (16px) | Group gap skips a step: 1.5rem (24px) or more |
| Thin borders to separate cramped groups | Give the groups more space |
| Flagging a two-line label for line length | Line length applies to paragraphs |
| Decorative banner larger than the h1 | Banner smaller; the h1 leads |
| Selected state in a brand red near the error colour | Use the action colour |
| Disabling hover delays under reduced motion | Keep delays; remove movement |
