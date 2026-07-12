# Spacing & sizing

## Two spacing lanes: between vs inside

Space *between* elements and space *inside* an element are different jobs; don't conflate them.

**Between elements** is owned by the container via `gap` on the flex/grid parent, so the container owns the spacing and children carry no assumption about their surroundings — they stay reusable, with no trailing-edge margin to strip. The escape hatch is a single-direction margin for flow content whose parent's display you don't control — only *between*, one direction, so it can't double up or collapse-surprise. Auto-margin pushing and negative-margin clawbacks are smells: the structure asking to be fixed.

**Inside an element** is `padding`, owned by the element. It's the right tool, not a smell — it doesn't collapse the way margins do, and it enlarges an interactive element's hit area where a margin would only shove neighbours. The smell is crossing lanes: faking internal space with margins, or faking between-space by padding the parent instead of using `gap`.

## Sizing — content-driven by default

Let content determine size; don't hard-fix dimensions reflexively, and constrain only when there's a real reason — whether to constrain at all is situational. A fixed dimension is **not** inherently a smell: a fixed size can be exactly the intent, and the code alone doesn't tell you, so don't flag fixed sizing on sight.

When you do limit to a **range**, prefer `clamp()` — a fluid value between bounds in one declaration — over static `min`/`max` pairs or breakpoint jumps. But don't force it: a lone bound is fine when that's all you need, and most values, including most `font-size`, never need it.
