---
name: breaker
description: >
  A theoretical "try to break it" skill for any target — code, a UI/UX flow, an infra or config
  change, a design, an API. Hunts for how something could fail through three escalating modes:
  a scrappy first pass at the obvious breakers, then breaking the target's assumptions, then
  creative lateral chains. Theoretical by default — it never touches a real app, DB, or live
  system to confirm a break without asking first. Invoke it when you want to know how something breaks.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
---

# breaker

Point it at something and it tries to break it — on paper. The goal is to surface how a target could fail before it fails for real, by thinking like someone determined to make it fall over.

Reuse the `brutal-review` skill's finding format and verdict honesty for anything you report. This skill governs *how you hunt for breaks*; that one governs how a break is written up and how honest a verdict has to be.

## The hard rule: theoretical by default, ask before you touch anything real

You reason about how the target breaks. You do **not** run the app, hit the database, call the API, write to the filesystem, or otherwise operate any live system to confirm a break on your own initiative.

When a hypothesis is worth actually verifying, **stop and ask** — use the AskUserQuestion tool to present:
- **what** you want to test,
- **how** you'd test it (the exact command / input / steps),
- **the risk** (what it touches, whether it's reversible, any side effects),

and proceed only on explicit permission. Until then, the break stays a hypothesis, and you say so — most breaker findings are PLAUSIBLE by nature, and inflating one into a CONFIRMED break you never actually ran is exactly the dishonesty the verdict discipline exists to prevent.

## On invocation: pick the scope first

If you're invoked **without a specific mode requested**, don't just start — use AskUserQuestion to ask how the user wants to run, listing the choices:
- **Full escalating pass** — run all three modes in order, each escalating to the next when it runs dry (the default, recommended).
- **Scrappy first pass only** — just the quick obvious breakers.
- **Break the assumptions only** — go straight to negating the target's premises.
- **Creative & lateral only** — go straight to chasing surprising break chains.

(The user can always pick "Other" and describe something bespoke.) If the **target** itself is unclear — what exactly am I breaking, and what's in scope — clarify that too before starting.

## The three modes escalate, cheapest first

The modes build on one another. In a full pass you run them in order, and **you only climb to the next mode when the current one stops surfacing new breaks** — the same "when your attacks stop revealing anything new, go deeper" logic as a war-game's loop-until-dry. The obvious cracks are cheap to find, so find those first; spend the expensive creative thinking only on a target that's already survived the easy stuff. When a single mode is requested explicitly, run just that one and skip the escalation.

### Mode 1 — Scrappy first pass
Throw the obvious, low-ceremony breakers and see what cracks. Fast and broad:
- Empty / missing / null where something's expected; a required thing absent.
- Extremes — huge input (10k-char paste), zero, negative, overflow, a list of 100k.
- Malformed — wrong type, wrong encoding, an emoji or a quote or a newline where plain text was assumed.
- Interaction fumbles — double-click submit, back-button mid-flow, refresh mid-operation, offline mid-save, two tabs.
- Order — do steps out of sequence, skip a prerequisite, repeat a one-shot action.

Run until it stops finding new cracks. If a target is riddled with these, that's the headline — don't bother climbing higher until they're addressed.

### Mode 2 — Break the assumptions
Now go under the surface. Enumerate every premise the target quietly leans on, then negate each one and ask what happens when it's false:
- **Inputs** — "id is always present," "the amount is positive," "this string is valid UTF-8."
- **Ordering & lifecycle** — "this callback fires exactly once," "init runs before use," "cleanup always runs."
- **Environment** — "the dependency is up," "the clock only moves forward," "the write succeeded," "there's enough memory/disk."
- **Users** — "the user finishes within the session," "one user per account," "they follow the happy path."
- **Invariants** — "these two values stay in sync," "this list is never empty," "this is immutable."

The break lives in the unexamined premise. List the assumptions explicitly — naming them is half the work — then attack the ones whose falsehood would hurt most. Run until negating further assumptions reveals nothing new.

### Mode 3 — Creative & lateral
The expensive, high-value mode: chase the surprising, non-obvious break that no checklist would catch. Follow a hunch across boundaries and let one small anomaly feed the next:

> paste an emoji into `amount` → it parses to `NaN` → `NaN > 0` is `false` so the validation "passes" → the charge is skipped → the free tier unlocks.

Prize the weird emergent chain over coverage. Combine two individually-fine behaviors into a failure. Ask "what would the author never expect anyone to do here?" — then do that, on paper, and see where it leads. This mode doesn't loop to dryness the same way; it runs as long as threads are worth pulling.

## Escalating out of the skill

When a hypothesis deserves more than the breaker can give on paper, recommend the next step rather than overreaching:
- **To an actual test** — ask permission (as above) and, if granted, run the minimal check.
- **To a war-game** — when a break is worth a rigorous, adjudicated RED-vs-BLUE stress-test of that specific target, hand it to the `war-game` skill.
- **To a fix** — when the break is clear enough to act on, report it as a finding and let the owner decide.

## Output

A list of potential breaks, ranked most-severe first, each as a `brutal-review`-format finding plus the two things that make a breaker finding actionable:
- **The hypothesis** — the concrete way it breaks (inputs/state → wrong result), and **which mode/assumption/chain** surfaced it.
- **Severity if real** — how bad it is *if* confirmed.
- **How to confirm** — the exact test that would settle it, flagged as pending permission if it touches anything real.
- **Verdict** — CONFIRMED only if you legitimately reproduced it (which, given the theoretical default, usually means the user already granted a test); otherwise PLAUSIBLE, honestly labeled.

Close with what you tried and where you stopped — which modes ran, which went dry, and which threads are still worth pulling — so a short list of breaks doesn't get mistaken for "nothing else is wrong."
