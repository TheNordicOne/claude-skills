---
name: ux-review
description: >
  Concrete, evidence-based UX review heuristics for catching the usability and interaction defects
  that generated and hand-written UIs ship — missing loading/empty/error states, fake semantics,
  broken focus and keyboard paths, placeholder-as-label, dark patterns, poor form and error-recovery
  flows, weak hierarchy, and the specific anti-patterns AI code generators emit by default. Invoke
  when reviewing any user-facing UI, flow, or interaction, especially alongside the ux-reviewer agent.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
  sources: See references/sources.md for full attribution (Nielsen/NN.g, Laws of UX, Baymard, GOV.UK, deceptive.design, W3C WCAG, arXiv 2502.13499).
---

# ux-review

A checklist for reviewing user interfaces for real usability, not surface polish. Work through the relevant sections against the diff and report issues as findings (use the `brutal-review` skill's format and severity/verdict conventions).

## Why this skill exists — the blind spot

A UI can render cleanly, compile, and look finished while being unusable by keyboard or screen reader, hostile at the edges, or quietly manipulative. **Automated code generation is especially prone to this**, and does not catch it in its own output: an audit of 1,296 LLM-generated e-commerce components found **55.8% contained at least one deceptive design pattern, produced spontaneously without being asked to manipulate** (arXiv 2502.13499), and accessibility research finds generated UI "optimizes for visual output while generating near-zero semantic information for the layer assistive tech reads." The recurring tell is **correct pixels, absent semantics and states**.

So review with two lenses, and sweep both every time:
1. **Competence** — is there a *real* element, a *real* label, a *real* state attribute, and a *real* error/keyboard path behind what looks finished? (§ "AI-generated UI anti-patterns")
2. **Intent** — does the UI manipulate the user against their own interest? (§ "Deceptive / dark patterns")

Then apply the usability and form/flow heuristics (see references) for depth.

## How to use this skill

- **Start with the AI-generated anti-patterns catalog below** — it's the highest-signal sweep for generated or AI-assisted code, and the cheapest to verify. Much of Group 1 and Groups 3–4 are catchable statically or with axe-core/Lighthouse/eslint-plugin-jsx-a11y; recommend wiring those into CI as a first gate, then review for what they can't see.
- **Then the dark-patterns sweep** — short, and a compliance issue (EU DSA Art. 25, US FTC, CA CPPA), not only UX.
- **Then, for depth**, pull the reference files as the diff warrants:
  - `references/usability-heuristics.md` — Nielsen's 10 heuristics + Laws of UX, rendered as observable checks (hierarchy, feedback, target size, memory load, progress).
  - `references/forms-flows-and-states.md` — empirical form, validation, error-recovery, navigation, search, loading/empty/error-state, disabled-control and option-label rules (Baymard / GOV.UK / WCAG / NN/g).
  - `references/sources.md` — full source list and licensing/attribution.
- **For foundation-level rules** (spacing, type, colour, layout), use the `nordic-design:ui-principles` skill.
- **Cite the criterion.** A finding grounded in a WCAG success criterion or a named source is worth far more than unsourced taste — name it.
- **Severity guidance:** a control that doesn't work by keyboard/screen reader, data loss on error, or a manipulative pattern is High/Critical. Weak hierarchy or a missing accelerator is usually Medium/Low. Don't flood the report with preference-level notes.

---

## AI-generated UI anti-patterns (the centerpiece)

The dominant failure is *fake completeness*: it looks interactive, but the semantics, states, and non-mouse paths are missing. What follows is a grouped set of the patterns that recur most — treat it as a lens that primes what to look for, **not a closed checklist**. Work the items that apply, but keep reasoning about how *this particular* UI could fail a real user; the catalog exists to sharpen your eye, not to bound it. A UI that passes every item below can still be bad, and new failure shapes appear all the time — if something feels off but isn't listed here, that's still a finding.

### Group 1 — Fake semantics (looks interactive, isn't accessible)
- **`div`/`span` as a clickable control** — `onClick` on a `div`/`span` with no `role="button"`, no `tabindex="0"`, no Enter/Space `onKeyDown`. Not focusable, not operable by keyboard, announced as "generic." The single most common generated a11y failure. Real fix: a `<button>`.
- **Icon-only control with no accessible name ("mystery meat")** — a `<button>` containing only an SVG/icon with no `aria-label`, visually-hidden text, or `title`, and the icon not `aria-hidden="true"`. Screen reader announces "button," purpose unknown.
- **Non-semantic structure** — visual headings as `<div class="title">` not `<h1>`–`<h6>`; nav as `<div>`s not `<nav>`; repeated cards/menu items as sibling `<div>`s not `<ul>/<li>`. Kills screen-reader navigation (jump-to-heading, landmarks, "list, N items").
- **Unlabeled form inputs** — `<input>/<select>/<textarea>` with no associated `<label for>`, wrapping label, or `aria-label(ledby)`.
- **Placeholder-as-label** — the field's only descriptive text is `placeholder`; it vanishes on focus/typing, breaks memory and error-recovery, and placeholder grey usually fails contrast.
- **Images without meaningful `alt`, or decorative images not hidden** — `<img>` with no `alt` attribute at all (vs. intentional `alt=""`); decorative SVG/icons announced because not `aria-hidden="true"`.

### Group 2 — Missing states & feedback (the "happy path only" tell)
- **Submit blocked until the form is valid** — a `disabled` primary button gated on validation leaves people guessing what's missing, and keyboard users can't even focus it. Keep submit enabled, validate on submit and show an error summary (see the disabled-control rules in `references/forms-flows-and-states.md`).
- **Toast-only error reporting that auto-dismisses** — validation/API errors surfaced *only* as a timed toast, far from the field and gone before it can be read; no inline error bound via `aria-describedby`, no persistent summary, possibly not a live region.
- **Infinite spinner with no timeout / no error path** — loading state entered on request start but no `catch`/error branch and no timeout → a failed request spins forever; user can't tell "loading" from "broken."
- **Silent failure / no error boundary** — `fetch`/mutation with no `.catch`, no error state rendered, no `try/catch` around parsing; a form that POSTs and shows nothing on failure. User thinks it worked.
- **Fake / decorative loading skeletons** — a skeleton driven by a fixed `setTimeout` rather than real pending state, or whose shape doesn't match the content it replaces; no `aria-busy`/live indication. *(Synthesized — verify in context.)*
- **Missing empty state** — a list/view that renders only the populated case; an empty result reads as broken. Needs a first-run empty state with a next action.

### Group 3 — Dynamic state not exposed to assistive tech
- **Missing ARIA state on stateful widgets** — accordions/disclosure without `aria-expanded`; toggles without `aria-pressed`/`aria-checked`; custom selects/tabs without `aria-selected`/`aria-controls`. State changes visually but not programmatically.
- **Broken focus management in modals/overlays** — a `position:fixed` `<div>` with no `role="dialog"`/`aria-modal`, no focus moved in, no focus trap, no `Escape` to close, no focus restore on close, background not `inert`/`aria-hidden`.
- **Custom select/combobox/menu with no keyboard model** — listbox/menu from `<div>`s lacking `role`, `aria-activedescendant`, and arrow/Enter/type-ahead handling.
- **Missing keyboard handlers on custom interactions** — mouse-only `onClick`/drag with no `onKeyDown` equivalent; sliders/reorder with no arrow-key support.
- **Modals stacked on modals** — a dialog that can open another dialog → z-index and focus-trap conflicts; user can't tell which layer is active or how to escape.

### Group 4 — Legibility, contrast & sensory
- **Undersized type as the default** — small font sizes applied broadly to body and general UI text instead of being reserved for the genuinely secondary cases (legal fine print, dense data tables) where a smaller size is a deliberate, justified choice. Generated UI has a strong tendency to shrink almost everything below a comfortable reading size for a "sleek, compact" look, which hurts legibility for everyone and especially older users, low-vision users, and small or high-density screens. The test is which way the default runs: readable body text should be the norm and smaller text the cherry-picked exception, not the reverse. Flag a design where the baseline reading size is uncomfortably small.
- **Low-contrast text** — body/placeholder/disabled/secondary text below WCAG AA (4.5:1 normal, 3:1 large). Light-grey-on-white and thin fonts are a signature of AI-styled UI. Verify with a contrast checker.
- **Low-contrast non-text elements** — contrast is not only a text problem. The boundaries and marks a user relies on to perceive the interface — card borders, dividers, input/field outlines, button edges, icons, focus indicators, chart lines and legends, selected/active states — must be distinguishable too. Generated UI routinely makes these so faint they nearly vanish (a card border a hair off its background, a hairline divider that reads as empty space, a focus ring you can't find). WCAG 1.4.11 asks for 3:1 on the parts of a control or graphic needed to identify it. Flag any structural boundary, control, or state you can barely see.
- **Color as the only signal** — error = red border only (no icon/text); validity/selection/status/chart series encoded purely by hue; hover that only changes color. Excludes color-blind and low-vision users (WCAG 1.4.1).
- **No `prefers-reduced-motion` handling** — auto-animations/parallax/transforms with no `@media (prefers-reduced-motion: reduce)` guard; can trigger vestibular symptoms.

### Group 5 — Interaction traps
- **Hover-only interactions that die on touch** — menus/tooltips/actions revealed solely via `:hover`/`onMouseEnter` with no `:focus-within` or tap equivalent; content that must be hoverable/dismissable/persistent (WCAG 1.4.13).
- **Autofocus stealing / scroll-jump on load** — `autofocus` or `.focus()` on mount, especially mid-page, yanks the viewport and disables arrow-key page scroll.
- **Scroll-jacking** — `wheel`/`scroll` `preventDefault` driving custom scroll, or full-page snap with no keyboard path; breaks focus order, scrollbars, and find-in-page.
- **Forms that wipe input on validation error** — error handling that resets/remounts the form or doesn't retain entered values through the error branch. A top cause of abandonment.
- **Fake / non-functional affordances (and the inverse)** — buttons/links with empty, `#`, or `onClick={() => {}}` handlers, TODO/stub handlers, or prominent CTAs with no route; conversely, real primary actions styled as plain text with no affordance. Common when generated UI is never wired up.

---

## Deceptive / dark patterns (intent lens — short, and a compliance issue)

Manipulative UI that works against the user. LLMs emit these **by default** (interface-interference alone was 63.2% of deceptive generated components), so flag them even when unintentional. Full taxonomy, regulatory cross-references, and the AI-specific deceptive variants are in `references/dark-patterns.md` — read it when the diff touches commerce, signup, consent, pricing, or cancellation. The core sweep:

- **Sneaking / hidden costs** — items, add-ons, or fees injected by default, or first shown at the final step; free trials capturing payment with no plain "you'll be charged X on DATE."
- **Fake urgency / scarcity** — countdowns from `Date.now() + offset` or that reset on reload; hardcoded/random "only N left" or "X people viewing" not tied to real data.
- **Preselection** — `checked`/`selected` on marketing/consent/data-sharing opt-ins or the pricier plan.
- **Confirmshaming & visual interference** — decline options with guilt-worded labels ("No thanks, I don't want to save money") or deliberately de-emphasized (grey link) while accept is a saturated CTA.
- **Hard to cancel / "no way back"** — one-click signup but obstructed cancel; state-changing actions (add, subscribe, join) with no undo/remove control.
- **Forced action** — blocking gate with no dismiss demanding registration/consent to proceed.
- **Trick wording** — double negatives or toggles where "on" means "opt out."
- **Missing privacy disclosure** — forms collecting PII/payment with no linked privacy notice near submit (generated forms omitted this in 51–66% of cases).
- **Ratings without counts** — a score/stars rendered with the underlying review count omitted.
- **Destructive actions** — delete/deactivate with no confirm/undo; *or* a confirm dialog that emphasizes the destructive/business-favorable choice and de-emphasizes "Cancel/Keep."

---

## Attribution

Heuristic names and definitions belong to their authors — credit **Jakob Nielsen / NN.g** (10 heuristics), **Jon Yablonski** (Laws of UX, CC BY-NC-ND), **Baymard Institute** (cite/link only), **GOV.UK Design System** (Open Government Licence v3.0, attribute), **Harry Brignull / deceptive.design** (dark-pattern taxonomy), and **W3C WCAG**. All entries here are paraphrased. See `references/sources.md`.
