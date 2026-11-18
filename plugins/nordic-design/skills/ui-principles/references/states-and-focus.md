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

- A faint background fill alone is too weak to carry a state. Add a second cue: a checkbox or check mark, a bar, an icon, a weight change. [WCAG 1.4.1, 1.4.11; NN/g visibility of system status; NN/g toggle switch guidelines]
- Or make the fill strong enough to do the job alone: at least 3:1 against the unselected state. [WCAG 1.4.11]
- For the colour of selected/current states, see [colour.md](colour.md).

## Focus

- Every focusable element shows a visible focus indicator. [WCAG 2.4.7]
- Focused elements are not hidden behind sticky headers, footers or overlays. [WCAG 2.4.11]
- Aim for a strong indicator: at least a 2px outline-equivalent area with 3:1 change of contrast. [WCAG 2.4.13 (AAA)]
- Use `:focus-visible`, so mouse users are not distracted and keyboard users always see focus.
- One focus style across the system.

## Target size

- Pointer targets at least 24 × 24 CSS px, or with enough spacing around them. [WCAG 2.5.8]
- Aim higher (about 44px) for primary touch targets. [WCAG 2.5.5 (AAA)]

## Disabled

- Avoid disabled controls. A disabled control gives no feedback and leaves people guessing. [Smashing, disabled buttons; Vivid, disabled buttons]
- Disable only when:
  1. the action is temporarily unavailable, for example it is already running or loading, or
  2. the person can make it available, and a visible reason next to it says how. [Cloudscape disabled states]
- Use `aria-disabled`, so the control stays focusable and explains itself when used. [Smashing, disabled buttons; Vivid, disabled buttons]
- A control the person may never use, for example for lack of permission, is hidden instead. [Smashing, hidden vs disabled; Cloudscape disabled states]
- Forms validate on submit instead of disabling the submit button. [Smashing, disabled buttons]
- Disabled controls are exempt from contrast rules but must still read as controls. [WCAG 1.4.3]

## Review checks

- Is every state in the set defined, and do combinations stay readable?
- Does each state have a second cue, or a fill with 3:1?
- Is focus visible, unobscured and consistent?
- Targets at least 24px?
- Is every disabled control temporary or explained next to it?
