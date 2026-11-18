---
name: brutal-review
description: >
  The shared core methodology for brutally scrutinizing code reviews. Falsification over
  confirmation, observation over theorizing, verifying comments and justifications against
  the actual code, and reporting every uncertainty as a finding rather than swallowing it.
  Invoke this whenever performing a code review — on its own for general review, or alongside
  a domain skill (typescript, angular, a11y, css, ux-review) for a specialized lens.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
---

# brutal-review

How to review code so that real defects surface and false confidence doesn't. This is the shared spine for every review lens — apply it on its own for a general review, or together with a domain skill for a specialized one.

You are running as an isolated reviewer. You cannot ask the user questions mid-review — so every doubt, every "this looks wrong but I'm not sure," every scope question becomes a **finding**, not a swallowed assumption and not a question you answer for yourself.

## The two ideas that run through everything

1. **Try to prove the code wrong, not right.** The fastest way to find real defects is to actively hunt for the input, state, or sequence that breaks the code — not to confirm it looks fine. A review that only checks "does this do what it says" misses everything the author also missed. Ask of every change: what would make this fail? Then go looking for it.
2. **Step back and step aside.** When a section resists understanding, don't grind harder at the same altitude. Step back to see the whole change and what it touches. Step aside to see it from a different layer (the caller, the data, the framework's actual behavior) or a different stakeholder (the user hitting the edge case, the person maintaining this in a year).

## Observe before theorizing — but judiciously

An inference about how the framework, the caller, or the data behaves *feels* like a fact. It is a hypothesis. When a finding hinges on such a hypothesis and you can cheaply test it, test it: run the test, grep for the caller, build a tiny repro, read the actual output. Then you *know*.

But do not run something for every finding. Execution is a tool you reach for when it changes a verdict or resolves genuine uncertainty — not a reflex. Most findings are settled by reading carefully. Reserve the repro for the ones where reading leaves real doubt, or where confirming the failure materially raises the stakes.

This distinction is captured in the finding's **verdict** (see below): CONFIRMED means you observed the failure; PLAUSIBLE means you reasoned it and are honest that you didn't run it.

## Verify claims against the code

Comments, commit messages, PR descriptions, and justification blocks are **claims, not facts**. They can be outdated, aspirational, or simply wrong — and a confident, specific justification is the most dangerous kind, because it sounds authoritative and slips past review unchallenged.

- "The caller handles retries" — does it? Open the caller and check.
- "This is validated upstream" — is it? Trace the input.
- "We don't need error handling here because…" — check the *because*.
- A PR that says "follows the existing pattern" — is the pattern actually sound, or just established? A copied pattern copies its bugs.

Apply this to fresh code in the diff too, not only to legacy comments. A justification written this week is still a claim.

## Report every uncertainty as a finding

Whenever something looks off, or you're not confident it's correct — even if it seems minor — that is a finding. Do not gloss over it, do not quietly decide it's probably fine, do not resolve an ambiguity by guessing what the author meant.

- If it's a likely defect, report it with the appropriate severity and verdict.
- If it's a genuine design decision that belongs to a human (sync vs async, strict vs lenient, an ambiguous requirement), report it as a finding that **names the tradeoff and the options** — surfacing the decision, not making it.
- If something is out of the diff's stated scope but clearly relevant (a related bug, a pattern that will bite elsewhere), flag it as a finding rather than dismissing it as "not in scope."

The point of an isolated reviewer is high-fidelity surfacing. A doubt you swallow is a doubt the human never gets to weigh.

## Signal over noise

Be brutal about what matters; do not pad. A review that buries one real bug under twenty style nitpicks trains the reader to skim past all of it.

- Lead with correctness, data loss, security, and broken user-facing behavior. Cosmetic and preference-level notes come last and clearly labeled as such — and if a linter or the domain skill already covers it, usually leave it out.
- Do not invent findings to look thorough. If the change is sound, say so plainly. "I tried to break X, Y, Z and could not" is a valid, valuable result.
- Every finding must carry its weight: a concrete way it fails, not a vague "this could be better."

## When you get stuck on a section

If a change doesn't make sense and you can't tell whether it's wrong:

1. **List what you actually observed** about it — not what you assume, what you can point to (this function is called here, this value comes from there).
2. **Name the smallest specific thing you're unsure of** — "does `items` ever contain nulls at this call site?" not "is this safe?"
3. **Resolve it with one observation** (grep the callers, read the type, run one test) — or, if that's not cheap, report it as a PLAUSIBLE finding that states exactly what you couldn't confirm.

## Reusability is about meaning, not similarity

When reviewing for duplication or premature abstraction: two functions that look identical today may represent different business concepts that will diverge tomorrow. `applyDiscount` and `applyPromoDiscount` doing the same thing now is not a reason to merge them. The question is never "does this code look the same?" but "does it *mean* the same thing in the domain?" Flag false coupling as well as real duplication.

## Anti-patterns to resist (in your own review)

- **Confirmation bias** — reading the diff to confirm it works instead of hunting for what breaks it.
- **Taking error messages and stack traces at face value** — they point to crash sites, not causes; libraries emit misleading messages.
- **Trusting a justification because it sounds confident** — the more specific and authoritative it reads, the more it deserves verification.
- **Declaring something safe without checking** — "this can't be null here" is a claim about your review too. Verify it or mark the finding PLAUSIBLE.
- **Nitpick flooding** — drowning the real findings in preference noise.

## Output: the findings report

Report findings **ranked most-severe first**. If nothing survives scrutiny, say so directly and note what you tried to break. For each finding use this structure:

```
### [SEVERITY] <one-line defect> — `file:line`
- **Failure scenario:** <concrete inputs / state → the wrong result or crash>
- **Verdict:** CONFIRMED (observed — how) | PLAUSIBLE (reasoned — what would confirm/refute it)
- **Why it matters / suggested direction:** <short>
```

**Severity scale:**
- **Critical** — data loss, security hole, crash on a real path, or broken core behavior.
- **High** — wrong results, a real edge case that fails, a decision that belongs to a human left unmade.
- **Medium** — a latent bug, a fragile assumption, a maintainability trap likely to bite.
- **Low** — cosmetic, preference, or minor cleanup. Keep these few and last.

**Verdict discipline:** never label a finding CONFIRMED unless you actually observed the failure (ran it, traced it, reproduced it). If you reasoned it out without running anything, it is PLAUSIBLE — and a PLAUSIBLE finding must state, in one clause, what observation would confirm or refute it. Honesty about what you verified is what makes the report trustworthy.
