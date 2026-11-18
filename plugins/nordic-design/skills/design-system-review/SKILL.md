---
name: design-system-review
description: >
  Runs a phased review of a design system's foundations (spacing, typography, colour, layout,
  sizes, states and focus, motion, elevation) against UI/UX principles, verifies every finding,
  walks the owner through each one, and implements the decisions. Use when the user
  asks to review, audit or check a design system, design tokens, a style guide or global styles
  for UI/UX problems, wherever that design system lives (docs, token files, code, design tool).
  Components are out of scope.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
---

# design-system-review

A coordinated review of a design system's **foundations**, run in five phases. You are the coordinator: you brief, dispatch agents, keep the findings doc, walk the owner through the findings and plan the implementation. The rules themselves come from `nordic-design:ui-principles`.

**Scope:** spacing, typography, colour, layout, sizes, states and focus, motion, elevation (the areas of `ui-principles`). Components are out of scope unless the owner adds them.

**No artifact is assumed.** The design system may live in docs, token files (JSON, CSS), the code's global styles, a design tool, or several of these. Finding the sources is part of the briefing.

## Phases

Copy this checklist into your working notes and tick it off.

```
- [ ] 1. Briefing: questions only, task summary confirmed
- [ ] 2. Review: fresh design-system-reviewer agent writes findings
- [ ] 3. Verification: finding-verifier agent checks every finding
- [ ] 4. Walkthrough: one finding at a time with the owner
- [ ] 5. Implementation: rounds of implementers + reviewers, one review worktree left
```

### 1. Briefing

Ask, confirm, start nothing. Not even reading the design system.

- Ask every question first (use the AskUserQuestion tool when available).
- Then state a short task summary and get it confirmed.
- Topics: sources of truth and which wins on conflicts, scope, known recurring problems, fix places to keep in sync, findings-doc location, publish limits of external artifacts, the one worktree/branch for all review work.

Details: [references/briefing.md](references/briefing.md)

### 2. Review

- Dispatch a **fresh** `nordic-design:design-system-reviewer` agent.
- Give it scope and sources. Never give it your own opinions or suspected findings.
- It recomputes numbers (contrast, ratios, steps) instead of trusting the docs.
- Drift between design system and code is its own finding type and is never judged.

Brief template and finding fields: [references/review-and-verification.md](references/review-and-verification.md)

### 3. Verification

- Dispatch a separate, capable `nordic-design:finding-verifier` agent on the full findings list.
- Verdict per finding: **Fixed**, **Open** or **Rejected**.
- It fixes only what clearly restores documented intent, in every fix place. Anything that changes intent or the look stays Open with options and a recommendation.
- No owner questions during the run. Everything goes into the findings doc.
- A fresh reviewer checks the verifier's fix commits (diff + finding only) before the walkthrough.
- A Fixed finding with an external copy among its fix places is marked "external copy pending" until the final publish.

Brief template and verdict rules: [references/review-and-verification.md](references/review-and-verification.md). Doc layout: [references/findings-doc.md](references/findings-doc.md)

### 4. Walkthrough

- One finding at a time, as formatted markdown in the reply (not a question tool).
- Every owner answer starts a discussion. Show the next finding only when the owner says to move on.
- Fix the rule, not only the implementation that exposed it.
- Apply earlier decisions to every later finding.
- Record each decision in the doc right away.
- Present Rejected findings too, with your own view. Correct the verifier openly where it was wrong.

Format and conduct: [references/walkthrough.md](references/walkthrough.md)

### 5. Implementation

- Plan rounds of implementer agents with disjoint file sets, each on its own branch/worktree from the review branch.
- Each implementer is followed by an independent reviewer that gets the diff and the decision text only.
- Rebase finished branches in one by one (linear history), so later rounds start from current code.
- One agent owns any external design-system copy. Publish external artifacts once, at the end, including every "external copy pending" fix.
- The owner checks visible changes. At the end exactly one review worktree remains (plus the main checkout); unit worktrees and branches are removed.

Details: [references/implementation.md](references/implementation.md)

## Rules that hold in every phase

- **Never apply a finding blindly.** Every finding is verified before anything changes.
- **Never ask the owner per finding during a run.** Collect, then walk through.
- **Respect blocked actions.** Subagents may be blocked from writing report files. Then they return the doc as text and you save it, or you extract it from the agent's transcript. Never route around the block.
- **The findings doc is git-ignored** and never committed: add it to the file `git rev-parse --git-path info/exclude` prints (this also works in linked worktrees, where `.git` is a file).
- **Written for a cold reader.** The doc must make sense to someone with no context of this session.

## Common mistakes

| Mistake | Instead |
|---|---|
| Reading the design system during the briefing | Ask first; read only after the summary is confirmed |
| Briefing the reviewer with suspected findings | Give scope and sources only |
| Trusting a documented contrast value | Recompute it |
| Fixing a token but not its copies | Fix every fix place named in the briefing |
| Showing three findings in one message | One finding, then discuss until the owner moves on |
| Patching one spot when a rule caused it | Change the rule, then every place it applies |
| Publishing an external artifact after each fix | Batch; publish once at the end |
