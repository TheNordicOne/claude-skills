# States and focus

Every interactive element must show what it is, what it is doing, and where focus is. Sources in brackets, listed in [sources.md](sources.md).

## Contents

- The state set
- A second cue for every state
- Focus
- Target size
- Disabled
- Review checks

## The state set

- Define per interactive foundation: default, hover, focus-visible, pressed/active, selected/current, disabled, and where relevant error and loading. [Material states]
- States combine (selected + hover + focus). Define how they stack so none hides another.

## A second cue for every state

- A faint background fill alone is too weak to carry a state. Add a second cue: a checkbox or check mark, a bar, an icon, a weight change. [WCAG 1.4.1, 1.4.11; NN/g visibility of system status]
- Or make the fill strong enough to do the job alone: at least 3:1 against the unselected state. [WCAG 1.4.11]
- Selected/current states use the action colour (see [colour.md](colour.md)).

## Focus

- Every focusable element shows a visible focus indicator. [WCAG 2.4.7]
- Focused elements are not hidden behind sticky headers, footers or overlays. [WCAG 2.4.11]
- Aim for a strong indicator: at least a 2px outline-equivalent area with 3:1 change of contrast. [WCAG 2.4.13]
- Use `:focus-visible`, so mouse users are not distracted and keyboard users always see focus.
- One focus style across the system.

## Target size

- Pointer targets at least 24 × 24 CSS px, or with enough spacing around them. [WCAG 2.5.8]
- Aim higher (about 44px) for primary touch targets. [WCAG 2.5.5; Material]

## Disabled

- Disabled controls are exempt from contrast rules but must still read as controls. Use them only when truly needed and explain why a control is unavailable.

## Review checks

- Is every state in the set defined, and do combinations stay readable?
- Does each state have a second cue, or a fill with 3:1?
- Is focus visible, unobscured and consistent?
- Targets at least 24px?
