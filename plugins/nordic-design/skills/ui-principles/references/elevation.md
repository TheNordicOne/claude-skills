# Elevation and edges

Elevation tells the user what sits above what. Edges define surfaces. Sources in brackets, listed in [sources.md](sources.md).

## Contents

- Elevation levels
- Edges and borders
- Dark themes
- Review checks

## Elevation levels

- Use a small set of levels with a job each: base surface, raised (cards), overlay (menus, popovers), modal (dialogs). [Material elevation; Atlassian elevation; Carbon layering]
- Higher means closer to the user and more important for the moment. Do not raise things for decoration.
- Define levels as tokens (shadow and surface colour together).

## Edges and borders

- Faint, unobtrusive container edges can be a deliberate choice. When spacing carries the grouping, a faint edge is fine; do not demand stronger borders. [Gestalt proximity, NN/g; NN/g flat design signifiers]
- Edges that identify a control (input fields, toggles) are different: they need 3:1 contrast. [WCAG 1.4.11]
- Prefer one cue per boundary: a shadow, a border or a surface change, not all three.

## Dark themes

- Shadows are weak on dark surfaces. Show elevation with lighter surface tones as well. [Material elevation]

## Review checks

- Is every elevation level used for its job only?
- Are faint edges on containers (fine) confused with faint edges on controls (not fine)?
- Does elevation still read in dark themes?
