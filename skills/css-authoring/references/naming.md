# Naming

## Principles over methodology

Don't adopt a named methodology (BEM and its relatives). Those were invented to compensate for what CSS couldn't do at the time — no scoping, no real state selectors, specificity chaos — and they push you toward *more classes* instead of *better selectors*. Modern CSS plus component scoping removes most of what they solved. Use the principles below and lean on the platform.

## The component model: base from element-or-family, variant as an explicit override

The **base** styling of a component comes from the semantic element, or — when no element fits — from a starts-with attribute selector on the class family (matching classes that begin with the component's name, e.g. `[class^="note-"]`). You should not need a class that merely mirrors an element it always sits on.

A **variant** is one explicit, self-describing class that overrides **only** what it needs — ideally just a custom-property token. The shared value lives in the token, never in a generic hook or an invented attribute.

The shape matters: the **shared thing is the component base** (grouped by the element or the family selector), **not the variant** — grouping by variant recreates a utility class. **Sharing happens through the token** (the "shared by meaning → custom property" rule); each explicit class just consumes it. And you never *invent* a `data-*` to style, since that's a class in disguise — style only from attributes that exist for a real reason (real state, native, or ARIA).

Caveat on the family selector: a starts-with match only matches when the family prefix is the *first* class in the attribute; if elements can carry other classes too, use a form that also matches the prefix after a space.

## Name quality: explicit, unique, searchable

A class name should read as what the thing is. No cryptic abbreviations — say the whole word, or drop the class when the element already *is* it. No empty catch-alls (`wrapper`, `box`, `item`, `content`, `container`): they're meaningless *and* they duplicate — every component ends up with one, so the name tells you nothing and you can't grep it or tell them apart. Scoping stops the technical collision but doesn't redeem a meaningless, repeated name. Pick something specific enough to be effectively unique and searchable.

## Semantic, not presentational

Name by role or meaning, not appearance — appearance changes, and a presentational name becomes a lie the moment the colour, weight, or side changes (including under RTL). A genuine utility is the one deliberate exception: it's about its effect and named for that function.

## Casing: kebab-case

Lowercase, hyphen-separated, for classes and custom properties — consistent with CSS's own property casing and HTML's lowercase attributes.
