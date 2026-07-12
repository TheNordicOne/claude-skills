# Authoring hygiene

## Don't restate values already in effect

Declaring a property whose value is already the effective value is noise that reads as intent. "Already in effect" covers three sources: the property's initial value, the UA default, **and inherited values**. The nuance: a declaration that *looks* like a default while actually **overriding** an inherited, UA, or framework value is legitimate. The test is always whether it changes the computed value or is a no-op.

## Shorthand vs longhand — match the form to intent

A shorthand resets the sub-properties you omit. Use it when you mean the whole group and want that reset; use longhand when you're changing one sub-property and must leave the siblings intact — a `background` shorthand wiping an existing image, a `font` shorthand resetting everything but size and family, an axis shorthand setting both edges. Never `transition: all` — name the properties you animate, to avoid animating unintended changes and the performance cost.

## Motion — cheap properties, tokenised, and sparing

Animate compositor-friendly properties (`transform`, `opacity`) rather than layout-triggering ones that force reflow every frame. Take durations and easing from tokens, not scattered magic values. Use motion **sparingly and keep it subtle** — short, small, unobtrusive; restraint is the default, and you don't reach for animation lightly. (`prefers-reduced-motion` is an accessibility concern and out of scope here.)

## Inline styles — avoid, with one exception

Inline styles can't be reused, sit above selector specificity in the cascade and **unlayered** (so they override the whole cascade-layer system), and can't express pseudo-states or queries. The one legitimate use is passing a **dynamic runtime value** in as a custom property that the stylesheet then consumes — the value is dynamic, the styling stays in CSS.
