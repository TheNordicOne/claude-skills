# Phases 2 and 3: Review and verification

Two separate agents. The reviewer finds; the verifier judges and fixes the safe part. Keeping them apart stops the finder from defending its own findings.

## Contents

- Finding fields
- Finding types
- Reviewer brief template
- Verifier brief template
- Verdict rules
- When an agent cannot write files

## Finding fields

Every finding carries all of these. A finding missing one is incomplete, not wrong.

| Field | Content |
|---|---|
| ID | Short and stable, e.g. `SP-03` (area prefix + number) |
| Area | spacing, typography, colour, layout, sizes, elevation, motion, focus-states |
| Rule | The design-system rule quoted, with its source (file, section, token) |
| Principle | The UI/UX principle broken, with a source from `ui-principles` |
| Scenario | A concrete user moment where the problem is felt |
| Evidence | Computed numbers: contrast ratios, step sizes, ratios, rem values. Recomputed, not copied from docs |
| Severity | High, Medium, Low |
| Confidence | Confirmed (computed or observed), Plausible (reasoned) |
| Fix direction | What would resolve it, without choosing a look |

## Finding types

- **Principle finding:** a foundation rule breaks a UI/UX principle.
- **Drift finding:** the design system and the code disagree. Report both values and where each lives. Never judge which is right; that is the owner's call through the source precedence.
- **Gap finding:** a foundation the scope expects is missing (no focus style defined, no motion rule).

## Reviewer brief template

```
Review the foundations of this design system. You are read-only.

Sources (precedence order): <list with paths/URLs>
Scope: <areas>. Components are out of scope.
Themes/modes: <list>
Known recurring problems to look at harder: <list or "none">

Load nordic-design:ui-principles. Recompute every number yourself.
Report drift between sources as drift findings without judging them.
Return all findings with these fields: ID, Area, Rule (quoted + source),
Principle (+ source), Scenario, Evidence (numbers), Severity, Confidence,
Fix direction. Return them as text in your final message.
```

Leave out your own opinions, suspected findings and earlier review results. The reviewer must start fresh.

## Verifier brief template

```
Verify every finding below. Work in <worktree path> on branch <branch>.

Sources (precedence order): <list>
Fix places that must stay in sync: <list>
Findings doc layout: <paste from findings-doc.md>
Findings: <full reviewer output>

For each finding decide Fixed, Open or Rejected (rules below).
Check for reasons behind the current state: docs, project memory/notes,
git log and blame, code comments.
Fix only what clearly restores documented intent, in every fix place,
one small commit per fix. Never publish external artifacts.
Do not ask the owner anything. Return the complete findings doc as
text in your final message.
```

Pick a capable model for the verifier; its judgment decides what the owner sees.

## Verdict rules

| Verdict | When |
|---|---|
| **Fixed** | True, a foundation issue, and the fix restores documented intent without changing the look the owner chose. Fixed in every fix place. |
| **Open** | True, but fixing it changes intent or the look, or the intent is unclear. Gets two or three options and one recommendation. |
| **Rejected** | Not true, not a foundation issue, or the current state has a documented reason or owner decision. The reason is written down with its evidence. |

Checks before any verdict:
- Is it true? Recompute the numbers.
- Is it really a foundation issue, or a component one?
- Is there a reason for the current state? Search docs, notes, git history (`git log -S`, `git blame`), comments.
- Does it repeat a known rule from `ui-principles` that says this is fine (e.g. line length for short UI text)?

## When an agent cannot write files

Some setups block subagents from writing report files. Do not route around it (no shell heredocs, no other tool). The agent returns the doc as text; you save it. If the text did not come back, extract it from the agent's transcript.
