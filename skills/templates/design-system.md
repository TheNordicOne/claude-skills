<!--
  Design System Skill Template

  Instructions for the agent filling this in:
  1. Replace all {{PLACEHOLDER}} values with actual values from the design system
  2. Remove any sections that don't apply (e.g., Product Tiers if not relevant)
  3. Add components specific to the design system under "Component Implementation Rules"
  4. For each component: document its selector, visual style, API inputs, variants, and states
  5. Only document what is unique to this design system — general CSS/Angular patterns belong in other skills
-->
---
name: design-system
description: {{BRAND_NAME}} design system guidelines, including design tokens, component patterns, and visual language. Use when implementing UI components that must follow {{BRAND_NAME}} branding.
license: {{LICENSE}}
---

# {{BRAND_NAME}} Design System Skill

Implementation guidelines for the {{BRAND_NAME}} design system using CSS Variables/Tokens.

## Visual Language Overview

### Design Philosophy
- **Vibe:** {{DESCRIBE_OVERALL_FEEL — e.g., "Professional, High-Contrast, Clean, Tech-focused"}}
- **Dominant Shapes:**
  - **Buttons:** {{BUTTON_SHAPE — e.g., "Fully rounded pill", "Slightly rounded", "Sharp corners"}}
  - **Cards/Containers:** {{CARD_SHAPE — e.g., "Sharp corners", "Rounded corners (8px)"}}
  - **Inputs:** {{INPUT_STYLE — e.g., "Underline only", "Bordered box", "Floating label"}}

### Typography
- **Font Family:** `var({{FONT_FAMILY_VAR}})` - '{{FONT_NAME}}'
- **Headers:** {{HEADER_STYLE — e.g., "Bold, geometric sans-serif"}}
- **Body Text:** {{BODY_STYLE — e.g., "Legible, regular weight"}}
- **Weights:** {{LIST_WEIGHTS — e.g., "Light (300), Regular (400), Medium (500), Bold (700)"}}

## Design Token Mapping

**CRITICAL:** Do not use hardcoded hex values. Always use the semantic CSS variables defined in {{TOKEN_SOURCE_FILES}}.

### Color Tokens

#### Primary & Secondary Actions
| Element | Variable | Note |
|:--------|:---------|:-----|
| **Primary Action** | `var({{PRIMARY_COLOR_VAR}})` | {{NOTE}} |
| **Primary Hover** | `var({{PRIMARY_HOVER_VAR}})` | {{NOTE}} |
| **Primary Active** | `var({{PRIMARY_ACTIVE_VAR}})` | {{NOTE}} |
| **Secondary Action** | `var({{SECONDARY_COLOR_VAR}})` | {{NOTE}} |
| **Secondary Hover** | `var({{SECONDARY_HOVER_VAR}})` | {{NOTE}} |

#### Text Colors
| Element | Variable | Note |
|:--------|:---------|:-----|
| **Links** | `var({{LINK_COLOR_VAR}})` | {{NOTE}} |
| **Links Hover** | `var({{LINK_HOVER_VAR}})` | {{NOTE}} |
| **Text (Body)** | `var({{TEXT_COLOR_VAR}})` | {{NOTE}} |
| **Text (Secondary)** | `var({{TEXT_SECONDARY_VAR}})` | {{NOTE}} |
| **Text (Inverse)** | `var({{TEXT_INVERSE_VAR}})` | {{NOTE}} |

#### Backgrounds & Borders
| Element | Variable | Note |
|:--------|:---------|:-----|
| **Background (Page)** | `var({{SURFACE_GROUND_VAR}})` | {{NOTE}} |
| **Background (Card)** | `var({{SURFACE_CARD_VAR}})` | {{NOTE}} |
| **Borders** | `var({{BORDER_COLOR_VAR}})` | {{NOTE}} |
| **Input Borders** | `var({{INPUT_BORDER_VAR}})` | {{NOTE}} |

#### Focus States
| Element | Variable | Note |
|:--------|:---------|:-----|
| **Focus Outline** | `var({{FOCUS_OUTLINE_VAR}})` | {{NOTE}} |
| **Focus Shadow** | `var({{FOCUS_SHADOW_VAR}})` | {{NOTE}} |

### Status Colors
| Status | Color Variable | Hover Variable |
|:-------|:---------------|:---------------|
| **Danger** | `var({{DANGER_VAR}})` | `var({{DANGER_HOVER_VAR}})` |
| **Success** | `var({{SUCCESS_VAR}})` | `var({{SUCCESS_HOVER_VAR}})` |
| **Info** | `var({{INFO_VAR}})` | `var({{INFO_HOVER_VAR}})` |
| **Warning** | `var({{WARNING_VAR}})` | `var({{WARNING_HOVER_VAR}})` |

<!-- OPTIONAL: Remove if not applicable -->
### Product Tiers (Semantic Usage)
{{DESCRIBE_TIER_COLORS_AND_WHERE_THEY_ARE_DEFINED}}

### Brand Colors (Direct Access)
Available brand colors include:
{{LIST_ALL_BRAND_COLOR_VARIABLES}}

### Spacing & Radius
- **Content Padding:** `var({{CONTENT_PADDING_VAR}})` = {{VALUE}}
- **Inline Spacing:** `var({{INLINE_SPACING_VAR}})` = {{VALUE}}
- **Button Radius:** `var({{BUTTON_RADIUS_VAR}})` = {{VALUE}}
- **Card Radius:** `var({{CARD_RADIUS_VAR}})` = {{VALUE}}
- **Input Radius:** {{VALUE}}

## Component Implementation Rules

<!--
  For each component in the design system, document:
  1. Selector (CSS class and/or Angular directive)
  2. Visual style (shape, typography, padding)
  3. Angular API (inputs, outputs)
  4. Variants (primary, secondary, outline, text, etc.)
  5. States (default, hover, focus, active, disabled) with SCSS snippets using tokens

  Example structure for a component:

  ### Component Name (`selector`)

  #### Shape & Typography
  - **Shape:** ...
  - **Typography:** ...
  - **Padding:** ...

  #### Angular Implementation
  Use `selector` directive with inputs:
  - `inputName`: type (default: value)

  #### Variants
  **Variant Name:**
  ```scss
  background: var(--token);
  &:hover { background: var(--token-hover); }
  ```

  #### States
  ```scss
  &:disabled { ... }
  &:focus-visible { ... }
  ```
-->

### Cards & Surfaces
```scss
background: var({{SURFACE_CARD_VAR}});
border-radius: var({{CARD_RADIUS_VAR}});
border: {{CARD_BORDER — e.g., "1px solid var(--border-color)" or "none"}};
padding: var({{CONTENT_PADDING_VAR}});
```

## SCSS Mixins & Utilities

### Typography Mixins (in `{{MIXINS_FILE}}`)
```scss
{{LIST_TYPOGRAPHY_MIXINS_WITH_VALUES}}
```

### Visual Effect Mixins
```scss
{{LIST_EFFECT_MIXINS_WITH_DESCRIPTIONS}}
```

### Utility Classes (in `{{UTILITIES_FILE}}`)
```scss
{{LIST_UTILITY_CLASSES_WITH_DESCRIPTIONS}}
```

### Focus Management
{{DESCRIBE_FOCUS_APPROACH_AND_RELEVANT_VARIABLES_OR_MIXINS}}

<!-- OPTIONAL: Remove if not applicable -->
### Scrollbar Styling
{{DESCRIBE_SCROLLBAR_CUSTOMIZATION}}

## Quick Reference

### Available Components Checklist
{{LIST_ALL_COMPONENTS_WITH_SELECTORS}}

### Color Token Quick Reference
- **Actions:** {{LIST_ACTION_TOKENS}}
- **Text:** {{LIST_TEXT_TOKENS}}
- **Backgrounds:** {{LIST_SURFACE_TOKENS}}
- **Borders:** {{LIST_BORDER_TOKENS}}
- **Focus:** {{LIST_FOCUS_TOKENS}}
- **Status:** {{LIST_STATUS_TOKENS}}

### Shape Quick Reference
- **Buttons:** {{BUTTON_SHAPE_AND_TOKEN}}
- **Cards:** {{CARD_SHAPE_AND_TOKEN}}
- **Inputs:** {{INPUT_SHAPE_AND_TOKEN}}

## Related Skills
- [Angular Development](../angular-development/SKILL.md) - Angular and TypeScript best practices
- [CSS Modern](../css-modern/SKILL.md) - Modern CSS best practices
