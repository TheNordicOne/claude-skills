---
name: testing-principles
description: Black box testing philosophy, test levels (unit, component, integration, e2e user journeys), test data, semantic selectors, time, and mocking guidelines. Activate when writing or reviewing any `*.spec.ts`, `*.e2e.ts` or other test file — framework-agnostic rules.
license: MIT
---

# Testing Principles

## Black Box Testing

**Test behavior, not implementation.** Assert on what a user sees and does, not on internal state or method calls.

- Test the public API and rendered output — not private methods, internal signals, or class properties
- If you refactor internals without changing behavior, tests should still pass
- **The only acceptable coupling to implementation**: semantic selectors (they test the accessibility contract, which IS the public interface)

## Behaviour, Never Looks

**No visual tests.** Never assert pixel positions, widths, heights, spacing, design-token values, CSS classes or computed styles.

- Such tests break on every design change and prove nothing a person relies on. Looks are checked by eye; if pixel-level checks are ever wanted, that is an explicit choice of a visual/snapshot tool, not hand-written assertions.
- A layout concern that is real behaviour is asserted as behaviour ("the list scrolls inside its panel, the page doesn't"; "the dialog's actions stay reachable"), never as numbers.
- When reviewing, delete visual assertions — don't move them elsewhere.

## Test Levels

Each level has its own job and is complete on its own. Overlap between levels is normal: a saving interaction has its component test even when an e2e journey also saves. A lower level never leaves a case out because a higher level happens to touch it.

- **Unit and component tests cover every case**: rules, edge cases, error states, and how the UI handles every server answer — with server data and responses faked at the HTTP boundary — regardless of what e2e covers.
- **Shared parts are tested once, where they live.** A consumer (a feature, module, page) only checks that the shared part is wired up — the right data goes in, the consumer reacts to what comes out. It never re-verifies the shared part's own details (focus handling, placement, retry, empty states, validation messages).
- **E2E: few tests, never many small ones, and never all cases.** E2E tests are user journeys. Each answers "does the whole system behave as a user expects?" for one journey (e.g. "edit a document"), walking through several situations in sequence — a rejected invalid value can be one step of the journey, not a test of its own.
  - Small single-rule e2e tests are rebuilt into journeys, not kept.
  - A journey does not cover every case; the lower levels do.
  - A journey proves the real parts work together across the server/process boundary. Cases the frontend decides on its own — already covered by component tests with faked server answers — are not repeated as journey steps.
  - Don't e2e-test third-party services (e.g. that an external AI or payment provider works). Test your own code that talks to them against a fake at the boundary.

## Test Data and Start State

- **Seed the start state; never prepare it through the UI.** Data a test needs as already existing (records, uploaded and processed files, users, sessions) is set up directly — database seed, fixture files, API calls — once, before the test.
- Never "upload, wait for processing, then the real test begins". Clicking through screens that aren't the subject of the test wastes time and makes the test fail for unrelated reasons.
- UI steps in a test are only those the test is about.
- Tests own their data: count and search relative to what the test created, never absolute totals of a shared database.

## Selector Hierarchy

Use the first selector that expresses intent:

1. **`getByRole(role, { name })`** — default for interactive elements (buttons, links, checkboxes, tabs)
2. **`getByLabelText(label)`** — form controls with labels
3. **`getByPlaceholderText` / `getByDisplayValue`** — forms without labels (flag for a11y review)
4. **`getByText`** — non-interactive content (headings, status text). Prefer `getByRole('heading')` when applicable
5. **`within(container).getBy...`** — scope to a semantic region when multiple exist
6. **`data-testid`** — absolute last resort; must be stable and meaningful

### Forbidden

- **No DOM scans**: `querySelectorAll(...).find(...)` — never scan and filter
- **No deep CSS selectors**: `.a > .b > .c` — tests must not break on layout changes
- **No stylistic class selectors**: `.btn-primary` — unless contractually stable
- **No structural lookups**: `querySelector`, `closest`, element/component tag names, CSS locators
- If an element can't be reached semantically, the UI usually lacks accessibility (a missing name or role). Fix the UI, don't work around it in the test.

## Mocking Philosophy

- Mock at **system boundaries** — HTTP, external services, browser APIs
- **Do NOT mock implementation details** — internal services, private methods, signal internals
- Mocks should be minimal and behavior-focused
- Prefer real implementations where practical — they catch more real bugs
- Stub only what you must to isolate the unit under test

## Async Patterns and Time

No test may depend on how fast the machine is or on the real clock.

- `waitFor` / `findBy*` / web-first assertions for async updates that follow from an action
- **Fake clocks for anything time-based**: debounces, polls, delays, "today". Advance the clock instead of waiting in real time. Fake the clear/cancel function together with the timer it pairs with.
- **No fixed waits**, and no widened timeouts as a fix — a test that needs more time on a loaded machine is waiting on real time it shouldn't depend on.
- Never read a value once right after an action; assert on the settled end state.

## Test Structure

- One setup helper per spec file — consistent imports, no drift
- Each test should be independent and not depend on execution order
- Test the scenario described in the test name — no more, no less
