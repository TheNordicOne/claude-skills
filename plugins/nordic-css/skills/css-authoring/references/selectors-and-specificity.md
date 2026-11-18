# Selectors & specificity

Keep specificity **low and flat** so the cascade stays predictable and styles remain overridable; most of what follows is a facet of that. (The base/variant/token *model* for components lives in `references/naming.md`; this file is selector mechanics.)

**Classes are the primary hook, but not the only correct selector.** Element selectors belong in base/reset styling and in rich-text content you don't own; state selectors (`:disabled`, `[aria-*]`, a `data-*` the behaviour genuinely sets), pseudo-elements, and substring/attribute selectors are all legitimate where they fit. Styling from real state you don't own the class of is often the *better* choice, because the style then tracks the source of truth rather than a class you keep in sync — but never *invent* a `data-*` purely to style (see `naming.md`).

**Don't style via `#id`.** Strictly about styling: an element having an id is fine (anchors, labels, scripting, ARIA); only using `#id` as a styling selector is in scope, and it's almost never warranted — high specificity and non-reusable. Style the class instead.

**Don't couple selectors to tag or DOM structure** — over-qualifying by element, or chaining down the DOM, both add specificity and break when markup changes. Target the thing directly.

**Match the combinator to the real relationship.** The descendant combinator matches at any depth, so it leaks into nested instances — fine when you genuinely mean "anywhere inside," but reach for the child combinator (or a scope/class) when you mean *direct*. Sibling combinators are the right tool for real adjacency and state-governs-what-follows relationships.

**Substring and attribute selectors are a normal tool**, with no blanket ban — on real attributes or on class-name substrings alike. Keep two things honest: the selector must actually *mean* what you think (matching a protocol prefix is not the same as "external links"), and matching class-name substrings to build a shared *variant* hook is a technique whose right use is covered in `naming.md`.

**`!important` is a last resort.** It's needed only in the rare case — essentially to override styles you don't own (third-party or inline) or when there's genuinely no other meaningful solution. Expect heavy scrutiny, and require a short justifying comment on every legitimate use; no comment means treat it as the smell. Cascade layers are what make this discipline practical (see `references/architecture.md`).
