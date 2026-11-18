# Sizes

Control heights, icon sizes, radii and border widths. Like spacing, they come from a small token set so the same kind of thing always has the same size. Sources in brackets, listed in [sources.md](sources.md). Target sizes live in [states-and-focus.md](states-and-focus.md).

No fixed width or height: content and context decide the size, within minimums, maximums or a `clamp()` range. Only an icon or a square control's own box gets a fixed size. `[reasoned]`

## Contents

- Control heights
- Icons
- Radii
- Border widths
- Review checks

## Control heights

- A few named heights (for example small, medium, large), in rem so they grow with the user's font size. Set them as minimum heights, so a control still grows when its text wraps. [WCAG 1.4.4; `[reasoned]`]
- Controls that sit in one row share one height, so their text and edges line up. `[reasoned]`
- Heights still meet the minimum target size. See [states-and-focus.md](states-and-focus.md).

## Icons

- A few icon sizes, each paired with a text size; use one size per context throughout the product. [Carbon icon sizes]
- Icons next to text scale with it (size in em or rem), so they stay in proportion at any zoom. `[reasoned]`

## Radii

- A short radius scale as tokens, plus "full" for pills and circles. [Material corner radius scale; Atlassian radius tokens]
- A radius inside a padded container is smaller than the container's radius (outer radius minus padding), so the curves look parallel. `[reasoned]`
- Same kind of element, same radius. See Consistency in the skill overview.

## Border widths

- One or two border-width tokens. [Atlassian border tokens]
- A thin border that identifies a control still needs 3:1 contrast. [WCAG 1.4.11]
- Border widths do not need to grow with zoom; they may stay in px. `[reasoned]`

## Review checks

- Are heights, icon sizes, radii and border widths all from tokens?
- Do controls in one row share a height?
- Is any width or height fixed that is not an icon or a square control's box?
- Do icons and text sizes pair consistently?
- Are nested radii smaller than their container's?
