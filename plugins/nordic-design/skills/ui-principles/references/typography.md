# Typography

Type carries hierarchy and readability. Sources in brackets, listed in [sources.md](sources.md).

## Contents

- Hierarchy and headings
- Type scale
- Fluid type
- Line length
- Size, leading and resizing
- Review checks

## Hierarchy and headings

- One h1 per page. It names the page. [W3C WAI headings tutorial; MDN heading elements]
- Heading levels follow the structure, not the look. Do not skip levels for styling. [WCAG 1.3.1, 2.4.6]
- A decorative name above the h1 (a section or app name, a banner) is not a heading. Mark it up as plain text or a landmark label.
- Decorative identity elements are less important than the page title and should not be larger than it. [NN/g visual hierarchy]
- One definition per heading level: the element and its class share one rule. Add a class only where the level and the look must differ. Two definitions for one level drift apart. `[reasoned]`

## Type scale

- Use a modular scale: each level is the previous times a ratio (for example 1.2 on phones, 1.25–1.333 on wide screens). [Utopia; Material type scale; Carbon type]
- Keep the number of levels small. Each level needs a job.
- Distinguish levels by size and weight together; size alone needs a clear ratio.

## Fluid type

- Fluid scales interpolate between a small-screen and a large-screen scale with `clamp()`. [Utopia; Smashing, modern fluid typography]
- On small screens the ratio is smaller on purpose, so levels move closer together. That is not a defect.
- Only levels that actually stack (appear next to each other, for example h2 above h3) must stay distinguishable at every width.
- Fluid sizes must still respond to user zoom: combine rem with viewport units, never pure `vw`. [WCAG 1.4.4; Smashing, modern fluid typography; web.dev fluid type that respects user font size]

## Line length

- Line-length advice (about 45–90 characters, ideally 50–75) is for paragraphs, where the eye must find the start of the next line. [Butterick, line length; Baymard line length; WCAG 1.4.8]
- One or two sentences of UI text (labels, hints, descriptions, table cells) are not a line-length problem. Do not flag them.
- Limit paragraph width with `max-inline-size` in `ch` or `rem`, not by shrinking the font.

## Size, leading and resizing

- Body text at least 1rem (the browser default the user can change); avoid shrinking general UI text below that for a compact look. [WCAG 1.4.4; `[reasoned]` for the 1rem floor]
- Leading about 1.4–1.6 for body text, tighter for large headings. [Butterick; WCAG 1.4.12]
- Text must survive 200 % zoom and the WCAG text-spacing overrides without loss. [WCAG 1.4.4, 1.4.12]

## Review checks

- Exactly one h1? Any decorative element larger than it?
- Any heading level defined twice (element rule and class rule)?
- Do stacked levels stay distinct at the smallest width?
- Is a line-length finding about a paragraph, or about short UI text?
- Font sizes in rem; fluid sizes include a rem part?
