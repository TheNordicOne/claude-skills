# Phase 5: Implementation

Turn the decisions into changes without collisions, with an independent check on each change, and leave the repo clean.

## Contents

- Planning rounds
- Implementer brief
- Reviewer brief
- Integrating
- External artifacts
- Finish

## Planning rounds

1. List every decided change with its fix places.
2. Group changes into units with **disjoint file sets**. Units that touch the same file go into different rounds.
3. Units in one round run in parallel. A later round starts only after the earlier one is integrated.

## Implementer brief

```
Implement these decisions. Branch <unit-branch> from <review-branch>,
worktree <path>.

Decisions (verbatim from the findings doc): <text>
Files you own: <list>. Touch nothing else.
Fix places that must stay in sync: <list>
Small commits. Run only the tests relevant to these files.
Never publish external artifacts.
```

## Reviewer brief

The reviewer gets the diff and the decision text, nothing else: no implementer notes, no coordinator opinion.

```
Review this diff against the decisions below. Read-only.
Decisions: <text>
Diff: <git diff review-branch..unit-branch>
Report: anything that does not match the decisions, any fix place missed,
any change outside the decisions.
```

Send the implementer back with the findings; review again until clean.

## Integrating

- Rebase each finished unit branch onto the current review branch, one at a time.
- Fast-forward only; keep the history linear.
- Remove the unit's worktree and branch right after it is integrated.
- The next round branches from the updated review branch, so it works on current code.

## External artifacts

- One agent owns the external copy of the design system (a published style guide, a design-tool file). Others never edit it.
- That agent re-reads the artifact right before changing it.
- Publish once, at the end, with all decisions in.

## Finish

- The owner checks every visible change before the work counts as done. Bundle these checks at the end.
- Mark each finding **Implemented** in the doc.
- Exactly one worktree is left: the review branch's, or none if it was merged by the owner's rule. No leftover branches, worktrees or backups.
