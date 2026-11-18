# Findings doc template

One markdown file for the whole review. Git-ignored, never committed. Written so a reader with no context of the session can follow every finding and every decision.

## Rules

- Keep it in the location agreed in the briefing; add it to `.git/info/exclude`.
- One section per finding, in walkthrough order (severity first, then area).
- The verifier fills verdicts; the coordinator fills decisions during the walkthrough, right away.
- Cross-cutting decisions (a new rule) go into **Decisions that apply everywhere** and are referenced from each later finding they touch.

## Template

```markdown
# Design system foundations review

## Setup
- Sources (precedence): <source 1> > <source 2> > ...
- Scope: <areas>; components out of scope
- Themes/modes: <list>
- Fix places kept in sync: <list>
- Branch/worktree: <name, path>
- External artifacts: <name>, publish once at the end

## Decisions that apply everywhere
- D1: <rule as decided>. Applies to: <finding IDs>

## Summary
| ID | Title | Severity | Verdict | Decision |
|---|---|---|---|---|

## Findings

### SP-01 <short title>
- **Area:** spacing
- **Rule:** "<quoted rule>" (<source>)
- **Principle:** <principle> (<source>)
- **Scenario:** <user moment>
- **Evidence:** <numbers>
- **Severity / confidence:** Medium / Confirmed
- **Fix direction:** <direction>
- **Verdict:** Open | Fixed (<commit>) | Rejected
- **Verifier notes:** <reason, history found, options A/B/C, recommendation>
- **Decision:** <owner decision, date> | pending
- **Implemented:** <branch/commit> | pending
```
