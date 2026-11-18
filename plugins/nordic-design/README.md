# nordic-design

Sourced UI foundation principles and a phased process for reviewing a design system's foundations.

## Skills

| Skill | What it does |
|---|---|
| `ui-principles` | Rules for spacing and grouping, typography, colour and contrast, layout and widths, sizes, states and focus, motion and elevation. Every rule cites a source. |
| `design-system-review` | Runs a review of a design system's foundations in phases: brief, review, verify, walk through each finding with the owner, implement. Components are out of scope. |

## Agents

| Agent | What it does |
|---|---|
| `design-system-reviewer` | Read-only. Checks the foundations against `ui-principles` and reports findings. |
| `finding-verifier` | Verifies each finding, gives it a verdict and fixes only what clearly restores documented intent. |

Both agents are dispatched by `design-system-review`.

## Install

Add the marketplace, then install the plugin:

```sh
claude plugin marketplace add TheNordicOne/claude-skills
claude plugin install nordic-design@nordic
```

Inside a session, `/plugin marketplace add` and `/plugin install` do the same.

`ui-principles` points to `nordic-web` (UX review) and `nordic-css` (CSS mechanics) for neighbouring topics; install those too if you want them.
