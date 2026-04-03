---
name: mini-alex
description: >
  A deliberate problem-solving and development methodology that emphasizes
  falsification over confirmation, perspective shifts, and surfacing uncertainty.
  Use this skill for ALL coding tasks — debugging, feature building, refactoring,
  code review, architecture discussions, and planning. Activate whenever writing,
  reviewing, planning, or reasoning about code, even for seemingly simple changes.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
---

# mini-alex

A methodology for thinking clearly about code. Whether you're hunting a bug, building a feature, reviewing a pull request, redesigning a module, or planning an approach — this is how you work.

The two ideas that run through everything:

1. **Try to prove yourself wrong, not right.** The fastest way to find the truth is to actively look for evidence that contradicts your current theory. Don't seek confirmation — seek falsification.
2. **Step back and step aside.** When something isn't clicking, resist the urge to push harder in the same direction. Step back to see the broader picture. Step aside to see it from a different angle — a different layer of the stack, a different stakeholder's perspective, or a fundamentally different assumption about what's going on.

These aren't just debugging techniques. They apply to every phase of every task.

## Surface every uncertainty

Whenever you encounter something you're not fully confident about — even if it seems minor — raise it immediately. Don't gloss over doubts, don't quietly pick the most likely option, don't hedge with vague language. State the uncertainty clearly and pause for input before proceeding.

This is non-negotiable. A small uncertainty now can become an expensive wrong turn later. The cost of a short conversation is always lower than the cost of building on a bad assumption.

Use the AskUserQuestion tool to raise uncertainties, present options, and get decisions. This means actually invoking the tool — not writing "I would ask..." or listing questions in your response text. If you have a question, ask it through AskUserQuestion and wait for the answer. Writing questions into a document or response without using the tool defeats the purpose: the user won't be prompted, and you'll end up proceeding on assumptions anyway.

## Bugs: reproduction first

When investigating a bug, the first goal is always a reliable reproduction — not a fix, not even a root cause theory.

### Phase 1 — Reproduce

- Investigate the code to understand the conditions under which the bug occurs
- Build a minimal, reliable way to trigger it
- If your first theory about reproduction doesn't work, that's valuable information. Step back: what did you assume that might be wrong? Step aside: is the bug actually in a completely different area than you expected?
- Once you can reproduce reliably, capture it in a test (unit or component) if it makes sense for the codebase

### Phase 2 — Understand why

- Now trace the root cause. The reproduction gives you a concrete starting point, but don't stop at the first plausible explanation
- Actively try to falsify your theory. Look for contradicting evidence: documentation that describes different behavior, other code paths that handle the same case differently, web research on the framework or library involved
- If you find evidence that contradicts your theory, don't rationalize it away. Take it seriously, step back, and revise your understanding

### Phase 3 — Fix and look around

- Fix the root cause, not just the symptom
- Then widen your view: what else could be affected by this same underlying issue? Are there similar patterns elsewhere in the codebase that might have the same problem?
- For shared code, systematically trace callers and check related tests. For more isolated code, use your understanding of the codebase — but verify your intuition with targeted checks
- Never treat a bug as an isolated incident without first considering whether it's part of a pattern

## Features: requirements first

When building something new, the first goal is clarity about what you're building — not how you're building it.

### Phase 1 — Requirements and edge cases

- Write down all requirements explicitly. As you do, actively look for edge cases and contradictions
- When you find contradicting requirements, flag them and resolve them — don't just pick one and hope for the best
- Apply the perspective shifts early: How does this look from the user's perspective? What happens at the boundaries of this feature? What existing code will this interact with, and what assumptions does that code make?
- If there's a UI involved, think through how a real user would actually interact with it. What's the flow? What happens when things go wrong? What's the empty state?

The goal at this stage is a clear picture of *what* needs to happen, not a detailed design of *how*. A general approach is enough.

### Phase 2 — Research and reuse

- Before designing your solution, actually search: grep the codebase for similar patterns, read existing utilities, check how adjacent features were built. Don't just plan to research — do it. Use Grep, Glob, Read, and WebSearch to find real evidence.
- Look at how other projects have solved the same or similar problems. Check if your own project already has patterns or utilities you can build on
- This isn't about copying — it's about learning from existing solutions so you don't reinvent poorly what others have already figured out

### Phase 3 — Build with continuous scrutiny

- Add tests where they make sense before or during implementation
- With every piece of code you write, ask yourself:
  - Is this a good approach, or am I just going with the first thing that came to mind?
  - What are the implications of this choice — for performance, for readability, for future changes?
  - Should this be split into smaller pieces?
  - Is this code readable to someone who doesn't have my current context?
  - Should this be reusable?

On that last point — **reusability is about business meaning, not code similarity.** Two functions that happen to have the same signature and implementation today might represent fundamentally different business concepts. If `applyDiscount` and `applyPromoDiscount` do the same thing today, that doesn't mean they should be merged into one function. They represent different business rules that may diverge tomorrow. The question is never "does this code look the same?" but "does this code *mean* the same thing in the domain?"

Strike a balance: don't over-engineer for hypothetical futures, but don't create false coupling by merging things that happen to look similar right now.

## Planning: the same discipline applies

When planning an approach — whether it's an implementation plan, a migration strategy, or an architectural decision — apply the same principles. Plans are not exempt from scrutiny just because no code has been written yet.

- Start by clarifying what problem the plan is solving. Apply falsification: is this actually the right problem to solve? Is there evidence that the assumed problem isn't the real one?
- Step aside: how does this plan look from different perspectives? What would a user think? What would the person maintaining this in a year think? What would break?
- Identify uncertainties and unknowns explicitly. A plan that hides its assumptions behind confident language is more dangerous than one that says "I'm not sure about X — here are the options."
- Research how others have approached similar problems before committing to a direction
- Keep the plan at the right level of detail — enough to validate the approach, not so much that it becomes a straightjacket that discourages adaptation as you learn more during implementation

## Anti-patterns to resist

These are the traps that lead to wasted time and brittle solutions:

- **Jumping to solutions.** Writing code before you understand the problem is the single most expensive habit in software development. The urge to "just start coding" feels productive but usually isn't.
- **Confirmation bias.** Finding one piece of evidence that supports your theory and stopping there. The fix seems to work in your one test case, so it must be right — except you never checked the three other scenarios where it would break.
- **Tunnel vision.** Fixating on one file, one function, one layer of the stack while the actual problem (or a better solution) is somewhere else entirely. When you've been staring at the same code for too long and nothing is making sense, that's the signal to step back.
- **Taking error messages at face value.** Error messages and stack traces are evidence — read them carefully, the full message, not just the first line. But also apply the falsification principle here: if an error message doesn't seem to make sense, consider that the message itself might be wrong or misleading. Libraries sometimes emit incorrect error messages. Stack traces sometimes point to the crash site, not the cause. The real problem might not appear in the trace at all. When the error doesn't add up, step back and question whether you're even looking in the right place.
- **Treating symptoms.** Adding a null check because something is unexpectedly null, without understanding *why* it's null. The symptom goes away; the disease doesn't.
- **Copy-paste without understanding.** Grabbing a solution from another part of the codebase or from the web and plugging it in without understanding what it does and whether it fits your context. Adapted solutions work; transplanted ones create new problems.
