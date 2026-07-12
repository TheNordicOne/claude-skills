# Selectors & specificity

Keep specificity **low and flat** so the cascade stays predictable and styles remain overridable. Most of the rules below are facets of that one idea. (The base/variant/token *model* for components lives in `references/naming.md`; this file is selector mechanics.)

## Classes are the primary hook — but not the only correct selector

Style with classes as the default hook for components. That does **not** mean classes-or-nothing — plenty of non-class selectors are the *right* tool:

```scss
.card { … }                       /* classes: the default component hook */

input[type="email"]   { … }       /* real native attribute */
button:disabled       { … }       /* :disabled over [disabled] — reflects true state, incl. inherited */
[aria-current="page"] { … }       /* real ARIA state = single source of truth */
.field::placeholder   { … }       /* pseudo-element */
.prose h2             { … }        /* element selectors belong in base/reset and rich-text you don't own */
```

Styling from state you don't own the class of — `[disabled]`, `[aria-expanded]`, a `data-*` the behaviour genuinely sets — is often the *better* choice, because the style tracks the source of truth instead of a class you keep in sync. (Do not *invent* a `data-*` purely to style — see `naming.md`.)

## Don't style via `#id`

Strictly about **styling**: an element having `id="pricing"` is fine (anchors, `label for`, JS, ARIA). Only using `#id` as a *styling* selector is in scope, and it's almost never warranted — it's high-specificity and non-reusable.

```scss
#pricing { padding-block: var(--space-6); }   /* smell */
.pricing { padding-block: var(--space-6); }   /* style the class; the id keeps its real job */
```

## Don't couple selectors to tag or DOM structure

Target the thing directly rather than qualifying by element (`div.card` → `.card`) or chaining down the DOM (`.sidebar ul li a`) — both add specificity and break when markup changes.

## Combinators — match the combinator to the real relationship

```scss
.menu a   { … }   /* descendant: matches at ANY depth — leaks into nested instances */
.menu > a { … }   /* child: direct children only — say what you mean */
.field + .field { margin-block-start: var(--space-3); }   /* next-sibling: real adjacency */
:checked ~ .details { … }                                 /* subsequent-sibling: a state governing what follows */
```

Descendant (space) is fine when you genuinely mean "anywhere inside," but its at-any-depth reach is the leak to watch — when you mean *direct*, use `>` (or a scope/class). Siblings `+`/`~` are the right tool for real adjacency and state relationships.

## Substring / attribute selectors are a normal tool

Matching on real attributes (`[href$=".pdf"]`, `[type="email"]`) or on class-name substrings (`[class^="note-"]`, `[class*="col-"]`) is legitimate — no blanket ban. Two things to keep honest:

- The selector must actually mean what you think. `a[href^="https://"]` is **not** "external links" — your own site is `https://` too, and it misses `http:`/`mailto:`/protocol-relative. Key off a real signal for external, not the protocol.
- Matching class-name substrings to build a shared *variant* hook is fine as a technique — but see `naming.md` for where the shared base vs. the variant actually belong.

## `!important` — last resort, with a comment

Needed in ~0.1% of cases — essentially only to override styles you don't own (third-party/inline) or when there is genuinely no other meaningful solution. Expect heavy scrutiny, and require a short `/* why */` on every legitimate use; no comment ⇒ treat it as the smell.

```scss
/* legit: overriding a third-party widget's higher-specificity style we can't edit */
.vendor-datepicker input { padding-inline: var(--space-3) !important; /* lib sets it via a selector we can't reach */ }

.btn { color: var(--fg) !important; }   /* smell: winning a fight we created — fix the specificity instead */
```

Cascade layers are what make this discipline practical — see `references/architecture.md`.
