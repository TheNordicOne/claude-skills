# Spacing

Space is the primary grouping tool. Things close together read as one group; space between groups tells the user where one ends and the next begins. Sources are named in brackets and listed in [sources.md](sources.md).

## Contents

- The scale
- The skip rule for nested levels
- Between groups vs inside groups
- Headings
- Containers
- Borders do not replace space
- Review checks

## The scale

- A common scale is fine: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px, written in rem (0.25 to 4rem). [Carbon spacing; Atlassian spacing; Material layout]
- Use rem so space grows with the user's font size. [WCAG 1.4.4, 1.4.12]
- The scale alone does not make good spacing. The rule of use matters more than the numbers.

## The skip rule for nested levels

- Nested grouping levels never use neighbouring steps. An outer level skips at least one step. [Gestalt proximity, NN/g]
  - Item gap 0.5rem (8) → group gap at least 1rem (16), not 0.75rem (12).
  - Item gap 0.75rem (12) → group gap at least 1.5rem (24), not 1rem (16).
- Why: neighbouring steps differ by only a third to a half (8→12, 16→24). At a glance the eye does not separate them, so the levels merge. `[reasoned]`

## Between groups vs inside groups

- Space between groups is clearly bigger than space inside a group. [Gestalt proximity; Laws of UX: Law of Proximity]
- Never squeeze the between-group space and compensate with borders, rules or backgrounds. [NN/g proximity; Material dividers]

## Headings

- A heading belongs to the content below it. Give it clearly more space above than below; about twice is a good default. [Gestalt proximity; Butterick, headings and space above and below; ratio `[reasoned]`]
- Equal space above and below makes the heading float between two sections.

## Containers

- A container's inner padding and the gap between containers follow the skip rule too. Padding 1rem → gap between cards at least 1.5rem, or 0 when the cards form one surface.
- Content sits closer to its own container's edges than to the next container. [Gestalt common region]

## Borders do not replace space

- Common region (a shared background or border) groups strongly, but it adds visual noise. Use it when space alone cannot carry the grouping. [Gestalt common region, NN/g]
- Faint, unobtrusive container edges can be a deliberate choice. Do not demand stronger borders when spacing already carries the grouping. See [elevation.md](elevation.md).

## Review checks

- List each grouping level and its gap. Do any two nested levels use neighbouring steps?
- Is every between-group gap clearly bigger than the inside gap?
- Heading space above ≈ 2 × space below?
- Are borders compensating for squeezed gaps?
- Are spacing values in rem and from the scale?
