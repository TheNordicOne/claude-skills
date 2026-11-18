# Colour

Colour carries meaning through roles, and it must be perceivable. Sources in brackets, listed in [sources.md](sources.md).

## Contents

- Contrast
- Colour roles
- Selected and current states
- Colour is never the only cue
- Review checks

## Contrast

- Text: at least 4.5:1, large text (24px, or 18.66px bold) 3:1. [WCAG 1.4.3]
- Non-text parts needed to identify a control or its state (input edges, icons, focus indicators, selected marks): at least 3:1 against adjacent colours. [WCAG 1.4.11]
- Compute every pair yourself, in every theme. Documented ratios are often stale.
- Placeholder and disabled text: placeholder must meet 4.5:1; disabled controls are exempt, but stay recognisable. [WCAG 1.4.3]
- APCA (the candidate WCAG 3 method) can inform choices for large and thin text; WCAG 2.2 ratios remain the conformance bar. [APCA]

## Colour roles

- Define colours by role, not by hue: action/primary, surface, text, border, success, warning, error, info. [Material colour roles; Atlassian colour tokens]
- Each role keeps one meaning everywhere. A role used for two meanings confuses both.
- Brand accents are for identity, not for states.

## Selected and current states

- A selected or current state (current nav item, selected row, active tab) is an action state. Use the action colour.
- Do not use a brand accent that sits close to the error colour. Users read a red-ish selected item as an error.

## Colour is never the only cue

- Information conveyed by colour also needs a second cue: text, icon, shape, weight, position. [WCAG 1.4.1]
- See [states-and-focus.md](states-and-focus.md) for state cues.

## Review checks

- Recompute contrast for text, placeholder, borders of inputs, icons, focus rings, selected marks; each theme.
- Is each colour role used for exactly one meaning?
- Do selected/current states use the action colour?
- Is any state or status shown by hue alone?
