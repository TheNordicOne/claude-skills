# Deceptive / dark patterns — full taxonomy & observable checks

Manipulative UI that works against the user's interest. Taxonomy names and definitions originate with **Harry Brignull** (coined "dark patterns," 2010; *Deceptive Patterns*, 2023; deceptive.design), adopted verbatim by regulators. Paraphrased here — credit Harry Brignull / deceptive.design if reproducing. Detection guidance cross-checked with NN.g.

Primary sources: https://www.deceptive.design/types · https://www.nngroup.com/articles/deceptive-patterns/

> **These are also AI defaults, not just adversarial human choices.** An audit of 1,296 LLM-generated e-commerce components found 55.8% deceptive, produced spontaneously; "deal banner" components were 100% deceptive, membership signup 95.8% (arXiv 2502.13499). "Maximize sales"-style prompting makes it worse. Treat their presence as a red flag regardless of intent.

> **Regulatory cross-reference:** preselected consent, confirmshaming, and obstructed cancellation are restricted under the **EU Digital Services Act (Art. 25)**, targeted by the **US FTC** ("Bringing Dark Patterns to Light," 2022), and the **California CPPA**. Flagging these is compliance, not only UX.

## The taxonomy
- **Sneaking (hidden costs / sneak-into-basket / hidden subscription)** — an item/warranty/"protection plan"/donation added by default the user never clicked; fees first appearing at the final step, not on the price display; a free trial capturing a payment method + recurring charge with no plain "you will be charged X on DATE" near submit.
- **Fake urgency** — a countdown whose end is `Date.now() + fixedOffset`, resets on reload, or loops (not a real server deadline); "offer ends in HH:MM:SS" with no corresponding real expiry.
- **Fake scarcity** — stock-count or "N people viewing" hardcoded, client-randomized, or not read from real inventory/analytics; "selling fast" applied unconditionally.
- **Fake social proof** — "Someone in [City] just bought this" from a random generator; star ratings shown without the underlying review count.
- **Confirmshaming** — decline labels that editorialize ("No thanks, I don't want to save money"); the two choices styled with deliberate asymmetry to shame the safe one.
- **Preselection** — `checked`/`selected`/`defaultChecked` on newsletter/marketing/consent/data-sharing toggles or add-ons; the more expensive plan or most data-sharing option pre-highlighted.
- **Hard to cancel / Roach Motel / obstruction** — single-POST signup but cancel routes to a support ticket, phone number, or multi-step retention funnel; cancel buried with extra "stay" confirmations. **AI novel variant "no way back":** a state-changing action (add-to-cart, join) offered with no undo/remove control.
- **Forced action / forced continuity** — a blocking modal/gate with no dismiss demanding registration before content/checkout; required consent bundled with terms so refusing blocks the task.
- **Visual interference / misdirection** — accept/upgrade as a large saturated CTA while decline is low-contrast grey text or a near-invisible link. **The single most common pattern AI generators produce** (interface-interference = 63.2% of deceptive components).
- **Trick wording / trick questions** — double negatives ("Uncheck if you do not want to not receive emails"); toggles where "on" means "opt out."
- **Disguised ads** — ad/affiliate elements styled identically to primary buttons/nav with no "Ad"/"Sponsored" label.
- **Nagging** — permission/newsletter/app-install prompts reappearing on every navigation or right after dismissal (no remembered dismissal).
- **Comparison prevention** — pricing tiers with non-parallel feature lists, different units, or no side-by-side table.
- **Currency confusion / obscured cost** — prices only in virtual "gems/coins" with the real-money conversion hidden or multi-step.

## AI-specific deceptive output (from the 1,296-component audit — arXiv 2502.13499)
- **Manufactured-urgency styling as the default CTA** — saturated red/green/gradient buttons, "BUY NOW"/blinking emphasis, de-emphasized decline, generated with no product reason.
- **Omitted privacy/consent disclosure** — generated forms collecting email/PII/payment with no privacy notice near submit (missing in 51% account-creation / 66% membership cases).
- **Loss-aversion / retention guilt on cancellation** — cancel copy foregrounding "you'll lose…" / "may not be available again" instead of neutrally confirming the choice (concentrated in cancellation UIs).
- **"No way back"** — add/subscribe/join actions with no reverse control.
- **Ratings without counts** — a score/stars with the count omitted.
- **Destructive actions with no confirmation, or a confirm that dark-patterns the safe choice** — delete/deactivate with no guard/undo; or a confirm dialog emphasizing the destructive/business-favorable button while de-emphasizing or shame-wording "Cancel/Keep."

## Sources
- https://www.deceptive.design/types — Brignull taxonomy
- https://www.nngroup.com/articles/deceptive-patterns/ — observable detection
- https://arxiv.org/abs/2502.13499 · https://arxiv.org/html/2502.13499v2 — "Deception at Scale," LLM e-commerce components
