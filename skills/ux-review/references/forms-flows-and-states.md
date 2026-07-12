# Forms, flows, and states — empirical checks

Evidence-based rules from Baymard Institute (usability testing; cite/link only), the GOV.UK Design System & Service Manual (Open Government Licence v3.0 — attribute), NN.g, and W3C WCAG. Each is an observable check. Paraphrased.

> **One genuine tension to resolve by context:** GOV.UK recommends validating **on submit** (single-question government pages); Baymard recommends validating **on blur** (long commercial multi-field forms). Not contradictory — pick by form type.

## Form field labeling
- **Every input has a persistent, associated `<label for>`** matching the input `id`. Flag inputs labeled only by an adjacent `<div>/<span>`, by `aria-label` where a visible label was feasible, or unassociated. (GOV.UK text-input)
- **Never use placeholder text as the label** — it vanishes on typing, isn't reliably read by screen readers, and default placeholder grey often fails contrast (WCAG 1.4.3). Put format examples in hint text, not the placeholder. (GOV.UK)
- **Avoid inline/floating labels inside the field** on multi-field/mobile forms — on a validation error the user must delete input to re-read the label. (Baymard: mobile-forms-avoid-inline-labels)
- **Labels self-explanatory out of context** — scope bare labels ("Billing phone", not "Phone"). (Baymard checkout)
- **Hint text**: one short sentence, no full stop, no links, associated via `aria-describedby`. Flag multi-sentence hints or links inside hints. (GOV.UK)
- **Mark optional fields, not required ones** — never asterisk mandatory fields; append "(optional)" to the minority. (GOV.UK question-pages)

## Input types, autofill & sizing
- **`autocomplete` on personal-data fields** (`email`, `tel`, `postal-code`, `bday-*`) — its absence blocks autofill and fails WCAG 2.2 SC 1.3.5. Flag `autocomplete="off"` on such fields without reason. (GOV.UK)
- **`inputmode`, not `type="number"`**, for codes/phone/card/account — `type=number` allows scroll increment, strips leading zeros, gives no typo feedback. Use `inputmode="numeric"|"decimal"`, `spellcheck="false"` on codes. (GOV.UK)
- **Size the field to expected content** — a full-width box for a 5-char postcode miscommunicates. (GOV.UK)
- **Keep field count minimal** — completion drops ~4–6% per field beyond the eighth; flag default address-line-2, company, "confirm email". (Baymard checkout)

## Validation & error messaging
- **Validate on submit (GOV.UK single-question pages)**: move focus to an **error summary** at the top of `main` (heading "There is a problem"), prefix the page `<title>` with `Error:`. Flag per-keystroke validation on these pages. (GOV.UK validation)
- **Validate on blur (Baymard commercial forms)**: never mid-typing ("Why are you telling me my email is wrong, I haven't finished it"). 31% of sites have no inline validation; ~4% get it fully right. (Baymard inline-validation)
- **Clear the error the moment the input becomes valid** — don't leave a stale red field after it's fixed (esp. interdependent fields like password confirmation). (Baymard)
- **Error message adjacent to its field**, stating what's wrong AND how to fix it, bound via `aria-describedby`; error-summary link text matches the field message word-for-word and moves focus to the field. Flag a single generic banner with no per-field messages. (GOV.UK error-message / error-summary)
- **Never wipe entered data on validation failure.** "Do not clear any form fields when showing the error message." (GOV.UK validation)
- **Don't use field errors for things the user can't fix** (ineligibility, permissions, capacity) — route to a page explaining the problem and next steps. (GOV.UK validation)
- **Give positive confirmation, not only failure** — users want a green check that a correctly-typed field "took." (Baymard)

## Destructive / irreversible actions
- **Gate serious/irreversible actions** behind a confirmation that restates the specific action and names the object ("Delete project 'Q3 Budget'?"), not a generic "Are you sure?". (NN.g confirmation-dialog)
- **Confirm button uses a specific verb** ("Delete file" / "Keep file"), not "OK/Yes"; the destructive button is not the default/autofocus. (NN.g)
- **Style destructive distinctly but never by color alone** — the label must stand alone without the red. (NN.g + destructive-action UX)
- **Prefer Undo for reversible/low-risk actions**; reserve confirmation dialogs for the truly serious to avoid confirmation fatigue. (NN.g)

## Navigation & wayfinding
- **Breadcrumbs on product/detail pages** (hierarchy, plus history on deep sites) — 68% of sites have sub-par breadcrumbs. (Baymard breadcrumbs)
- **One thing per page in flows**; group only genuinely related questions, and use a statement (not a question) as the `<h1>` on grouped pages. (GOV.UK question-pages)

## Search
- **Autocomplete suggests relevant scopes and is keyboard-navigable** — 72% of mobile sites fail to suggest categories. (Baymard search)
- **"No results" offers a path forward** (suggestions, spelling help, relaxed scope, popular links) — 88% of no-results pages give no help. (Baymard search)

## Loading / empty / error states
- **Every async view has explicit loading, empty, AND error states** — components rendering only the populated state read as broken when empty and hang when a request fails. Provide skeleton/spinner while fetching, a first-run empty state with a next action, and inline error+retry on failure.

## Mobile touch targets
- **≥24×24 CSS px, or ≥24px spacing** (WCAG 2.2 SC 2.5.8 AA); aim for 44×44 (SC 2.5.5 AAA / Apple HIG 44pt / Material 48dp). Flag icon buttons, checkboxes, "×", pagination, dense link lists below this. Exemptions: inline-in-text links, browser-controlled, legally-required sizing. (W3C WCAG 2.2)

## Progressive disclosure
- **Don't hide majority-needed content behind expandables** — essential instructions/price/delivery/required fields inside a collapsed `<details>`/accordion. "Do not use the details component to hide information that the majority of your users will need." (GOV.UK details)
