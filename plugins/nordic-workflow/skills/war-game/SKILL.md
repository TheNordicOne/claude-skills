---
name: war-game
description: >
  Adversarial red-team vs blue-team stress-testing for anything that needs hardening — a module,
  a UI/UX flow, an infra or config change, a trust boundary, a state machine, or a specific
  finding you want to pressure-test. RED attacks with concrete scenarios, BLUE is the target's
  real behavior, and each round is adjudicated BREAKS or SURVIVES with evidence. Invoke
  deliberately when you want to prove whether something actually holds up, not for routine review.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
---

# war-game

A deliberate adversarial exercise: point it at a target, attack it from every angle that matters, and find out what actually breaks before reality does. This is not routine review — it's the heavier instrument you reach for when you want to *prove* whether something holds up.

Reuse the `brutal-review` skill's finding format and verdict discipline for anything you report — this skill governs the adversarial *method*; that one governs how a finding is written and how honest a verdict has to be.

## What you can war-game

Anything with a way to fail — not just security. A component's UX flow, an infrastructure or config change, a data migration, a concurrency-heavy module, a public API contract, an auth boundary, a build pipeline, or a single risky finding another reviewer surfaced. If it can break, mislead a user, corrupt data, or fall over under load, it can be war-gamed.

## The method: RED vs BLUE, adjudicated

Each round has three moves:

1. **RED — attack.** Propose one concrete, specific scenario that could break the target. Not "what if input is bad" but "what if `amount` is `-0.01` and the two requests arrive in the same tick." Specificity is what separates a war-game from hand-wringing.
2. **BLUE — the real defense.** Answer from the target's **actual code or design**, not a flattering strawman. Read what really happens on RED's scenario. If the code has a guard, name it; if it doesn't, say so plainly. BLUE's integrity is the whole game — a BLUE that invents defenses the code doesn't have produces false confidence.
3. **ADJUDICATE — BREAKS or SURVIVES.** Decide, with evidence:
   - **BREAKS / CONFIRMED** — only when RED can point to the real code path that fails, or cheaply reproduce it (run the case, trace the values). Reproduce where feasible; execution is how a break earns CONFIRMED.
   - **BREAKS / PLAUSIBLE** — the attack path is well-argued but you couldn't reproduce it (distributed timing, a rare interleaving). State in one clause exactly what observation would confirm or refute it. Never inflate a PLAUSIBLE break into a CONFIRMED one.
   - **SURVIVES** — BLUE's real, verified defense handles it. Record it; a documented "we tried X and it held" is a valuable result.

## Pick adversaries that fit the target

RED's power comes from attacking along axes the author didn't think about. Choose a cast appropriate to the target's domain rather than a fixed list — a UX target and a database migration fail in completely different ways. Starting points:

- **Correctness / logic** — boundary values, empty/null/huge inputs, off-by-one, unexpected types, contradictory but individually-valid inputs.
- **Concurrency / state** — two actors at the same instant, retries, out-of-order events, a step interrupted mid-flight, stale reads, lost updates.
- **Failure / infra** — a dependency down or slow, a timeout, a partial write, a deploy that skews versions, config drift, a full disk, a restart mid-operation.
- **Scale** — 100× the data, 10k concurrent users, an unbounded loop or query, the N+1 that's fine with 3 rows and fatal with 30,000.
- **Security / trust** — an attacker with a stolen token, tampered input, an IDOR on someone else's id, injection, a boundary that trusts data it shouldn't. *(For a deep offensive pass, this axis deserves its own dedicated treatment — war-game covers it broadly, not exhaustively.)*
- **UI / UX** — a confused first-time user, a screen-reader or keyboard-only user, a rage-tap / double-submit, a slow network with no feedback, a tiny screen, an empty state, a validation error that wipes input.
- **The honest legitimate user** — not malicious, just doing something reasonable the design didn't anticipate (pastes a formatted number, leaves a tab open for a day, hits back mid-flow).

For any given target, only some axes apply. Name the ones that do, and attack those hard.

## Running the game

**Prefer parallel independent adversaries.** When you can spawn sub-agents, dispatch several red-teamers at once, each assigned a different axis (or told to attack freely from a different starting assumption). Independent contexts find genuinely different breaks — one context tends to attack from a single angle and miss whole classes. Collect their attacks, then adjudicate each against BLUE's real behavior.

**Fall back to in-context when you can't spawn sub-agents** (for example, when this skill is invoked from inside a subagent). Then play RED and BLUE yourself in one context, and **rotate the adversary cast every round** so RED doesn't fixate on one axis — deliberately switch lens ("last round I attacked concurrency; this round I'm the malicious user; next the outage").

**Terminate when RED goes dry.** Keep running rounds until RED lands **no new break for two consecutive rounds**. Then stop and declare the target hardened *on the vectors tried* — never "hardened" unqualified. A fragile target earns many rounds; a solid one is settled quickly. This mirrors the "when your attacks stop revealing anything new, you've found the floor" idea — don't stop at the first break, and don't pad rounds once the well is dry.

**One attack at a time, resolved before the next.** Adjudicate each RED scenario fully — including any reproduction — before moving on. Parallel *adversaries* are fine; parallel *unresolved attacks* muddy which defense answered which threat.

## Output: findings + war-game summary

Report two things:

1. **The breaks, as findings** — every BREAKS becomes a finding in the `brutal-review` format (severity, `file:line`, one-line defect, concrete failure scenario, CONFIRMED/PLAUSIBLE verdict), ranked most-severe first. These compose directly with any review already in flight.
2. **A war-game summary** — a compact record so the result is trustworthy:
   - **Target & scope** — what you war-gamed.
   - **Adversary axes attacked** — which lenses you actually ran (and, honestly, which you did not — an untested axis is a residual risk, not a pass).
   - **Survived** — the notable attacks the target withstood, with the real defense that held.
   - **Residual / untested risk** — PLAUSIBLE breaks awaiting confirmation, axes you didn't reach, and assumptions BLUE relied on that could change.

A "no breaks found" result means nothing without this summary — it's the difference between "hardened against everything we could throw at it" and "we didn't really try." Show your work so the clean result can be trusted.
