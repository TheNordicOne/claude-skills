# Sources & attribution

All checklist entries in this skill are paraphrased from the sources below. When reporting a finding, cite the specific criterion/source — it carries far more weight than unsourced taste. Before redistributing this skill commercially, honor each source's terms.

## Licensing summary
| Source | Terms | Obligation |
|---|---|---|
| Nielsen's 10 Usability Heuristics — Jakob Nielsen / NN.g | © Jakob Nielsen. The page grants "You may use these heuristics in your own work." | Credit Jakob Nielsen + link; use the heuristics, don't copy the article prose. |
| Laws of UX — Jon Yablonski | **CC BY-NC-ND 4.0** | Attribute Jon Yablonski; no commercial use of the content itself; don't redistribute modified copies of their text. Paraphrasing into your own checklist is fine. |
| Baymard Institute | Proprietary research | Cite/link only; don't reproduce their text/figures wholesale. |
| GOV.UK Design System & Service Manual | **Open Government Licence v3.0** | Free to reuse (incl. commercially) with attribution: "Contains public sector information licensed under the Open Government Licence v3.0." Don't imply GDS endorsement. |
| NN.g articles (confirmation dialogs, deceptive patterns, GenUI) | Proprietary | Cite/link only. |
| Harry Brignull / deceptive.design | Taxonomy is de-facto standard, adopted by regulators | Credit Harry Brignull / deceptive.design; verify current site terms before copying wording. |
| W3C WCAG 2.2 "Understanding" docs | W3C Document License | Quotable with attribution. |
| arXiv 2502.13499 "Deception at Scale" | Academic preprint | Cite. |

## Source index
**Nielsen / NN.g**
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.nngroup.com/articles/confirmation-dialog/
- https://www.nngroup.com/articles/deceptive-patterns/
- https://www.nngroup.com/articles/genui-vs-vibe/
- https://www.nngroup.com/articles/consistency-and-standards/
- https://www.nngroup.com/articles/toggle-switch-guidelines/

**Laws of UX** — https://lawsofux.com/ (individual laws linked in usability-heuristics.md)

**Baymard Institute**
- https://baymard.com/research/checkout-usability
- https://baymard.com/blog/inline-form-validation
- https://baymard.com/blog/mobile-forms-avoid-inline-labels
- https://baymard.com/research/ecommerce-search
- https://baymard.com/blog/ecommerce-breadcrumbs

**GOV.UK Design System / Service Manual (OGL v3.0)**
- https://design-system.service.gov.uk/components/text-input/
- https://design-system.service.gov.uk/patterns/validation/
- https://design-system.service.gov.uk/components/error-message/
- https://design-system.service.gov.uk/components/error-summary/
- https://design-system.service.gov.uk/patterns/question-pages/
- https://design-system.service.gov.uk/components/details/
- https://design-system.service.gov.uk/accessibility/

**W3C WCAG 2.2 / APG**
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
- https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

**Dark patterns / AI anti-patterns**
- https://www.deceptive.design/types
- https://arxiv.org/abs/2502.13499 · https://arxiv.org/html/2502.13499v2
- https://dl.acm.org/doi/10.1145/3744257.3744266 — ACM W4A 2025, LLM-generated inaccessible UI
- https://frontendmasters.com/blog/ai-generated-ui-is-inaccessible-by-default/
- https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/
- https://www.smashingmagazine.com/2022/08/error-messages-ux-design/
- https://optimiseordie.substack.com/p/crimes-of-ux-21-placeholder-labels
- https://www.boia.org/blog/accessibility-tips-be-cautious-when-using-autofocus
- https://www.sitepoint.com/scrolljacking-accessibility/
- https://modall.ca/blog/vibe-coded-app-breaks-production

## Verify-in-context notes
Two Part-B entries are synthesized from the broader "AI skips error/edge handling" findings rather than a study isolating their AI-generation frequency — treat as well-established UX failures, not single-source-confirmed AI tells:
- **Fake / decorative loading skeletons**
- **Forms that wipe input on validation error** (the UX failure is well-sourced; its AI-frequency is inferred)
