---
name: css-modern
description: Modern CSS development guidelines using logical properties, Baseline 2024 features, and CSS Grid layouts. Use when writing or reviewing CSS/SCSS, especially for RTL support, responsive design, or layout decisions.
license: MIT
---

# Modern CSS Best Practices Skill

Guidelines for modern CSS development using logical properties, Baseline 2024 features, and best practices for internationalization and responsive design.

## Core Principles

Write CSS that is:
- **Modern:** Use Baseline 2024 features
- **International:** Support RTL and different writing modes
- **Maintainable:** Use logical properties and CSS variables
- **Responsive:** Use container queries and modern units

## Layout: Grid vs Flexbox

**CRITICAL:** Prefer CSS Grid for layout tasks. Use Flexbox only for single-axis inline flows.

### When to Use Grid
- Page and section layouts (rows **and** columns)
- Card grids, form layouts, dashboard panels
- Any time you need items to align across both axes
- Use `subgrid` when children need to align with a parent grid

### When to Use Flexbox
- Inline flows that may wrap — tag lists, chip groups, button rows, breadcrumbs
- Distributing space in a single row or column
- Centering a single item

```scss
// ❌ WRONG - Flexbox used for a two-dimensional card layout
.card-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .card {
    flex: 1 1 300px;
  }
}

// ✅ CORRECT - Grid for two-dimensional layout
.card-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

// ✅ CORRECT - Flexbox for a single-axis inline flow that wraps
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

## Logical Properties

**CRITICAL:** ALWAYS use CSS logical properties instead of physical directional properties.

### Why Logical Properties?

Logical properties ensure:
- RTL (right-to-left) language support
- Writing-mode flexibility
- Future-proof internationalization

### Example

The same pattern applies to all directional properties — margin, padding, border, inset, and size. One example:

```scss
// ❌ WRONG - Physical properties
.element {
  margin-top: 1rem;
  margin-left: 0.5rem;
  padding-left: 1rem;
  width: 100%;
  max-width: 1200px;
  border-left: 1px solid black;
  border-top-left-radius: 0.5rem;
}

// ✅ CORRECT - Logical equivalents
.element {
  margin-block-start: 1rem;
  margin-inline-start: 0.5rem;
  padding-inline-start: 1rem;
  inline-size: 100%;
  max-inline-size: 1200px;
  border-inline-start: 1px solid black;
  border-start-start-radius: 0.5rem;
}

// ✅ CORRECT - Axis shorthands when setting both sides
.element {
  margin-block: 1rem 2rem;   // block-start block-end
  margin-inline: 0.5rem;     // both inline sides
  padding-block: 1rem;
  padding-inline: 0.5rem 1rem;
}
```

**Note:** `inset` is a physical shorthand (`top right bottom left`), not a logical one. Use `inset-block-*` and `inset-inline-*` for logical positioning.

### Quick Reference: Logical Properties

| Physical | Logical |
|:---------|:--------|
| `top` / `bottom` | `inset-block-start` / `inset-block-end` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |
| `margin-top` / `margin-bottom` | `margin-block-start` / `margin-block-end` |
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-top` / `padding-bottom` | `padding-block-start` / `padding-block-end` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `border-top` / `border-bottom` | `border-block-start` / `border-block-end` |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |
| `border-top-left-radius` | `border-start-start-radius` |
| `border-top-right-radius` | `border-start-end-radius` |
| `border-bottom-left-radius` | `border-end-start-radius` |
| `border-bottom-right-radius` | `border-end-end-radius` |
| `width` / `height` | `inline-size` / `block-size` |
| `max-width` / `min-height` | `max-inline-size` / `min-block-size` |

## Modern CSS Features (Baseline 2024)

**Use modern CSS features** that are part of Baseline 2024 or later. These features are widely supported across modern browsers.

### :has() Selector

Parent/ancestor queries:

```scss
// Select parent based on child state
.card:has(.error) {
  border-color: var(--danger-color);
}

// Select sibling based on another sibling
.nav-item:has(+ .nav-item.active) {
  margin-inline-end: 2rem;
}

// Conditional styling
form:has(input:invalid) .submit-button {
  opacity: 0.5;
  pointer-events: none;
}
```

### CSS Nesting

Better style organization:

```scss
// Native CSS nesting (no preprocessor needed)
.card {
  background: var(--surface-card);
  padding: var(--content-padding);
  
  & .title {
    @include text-h2;
    margin-block-end: 1rem;
  }
  
  & .content {
    @include text-body;
  }
  
  &:hover {
    box-shadow: 0 4px 8px oklch(from black l c h / 0.1);
  }
  
  &.featured {
    border: 2px solid var(--primary-color);
  }
}
```

### Container Queries

Component-based responsive design:

```scss
// Define container
.card-grid {
  container-type: inline-size;
  container-name: card-grid;
}

// Query the container
.card {
  display: grid;
  gap: 1rem;
  
  @container card-grid (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @container card-grid (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Container Query Units

Responsive sizing based on container:

```scss
.card {
  // Container query units
  padding: 2cqi;              // 2% of container inline size
  font-size: clamp(1rem, 3cqi, 2rem); // Fluid with container
  
  .title {
    font-size: 5cqi;          // 5% of container inline size
    margin-block-end: 2cqb;   // 2% of container block size
  }
}
```

**Available container query units:**
- `cqw` - 1% of container width
- `cqh` - 1% of container height
- `cqi` - 1% of container inline size
- `cqb` - 1% of container block size
- `cqmin` - smaller of cqi or cqb
- `cqmax` - larger of cqi or cqb

### color-mix()

Dynamic color manipulation:

```scss
.button {
  background: var(--primary-color);
  
  &:hover {
    // Mix with black for darker shade
    background: color-mix(in oklch, var(--primary-color), black 20%);
  }
  
  &:disabled {
    // Mix with white for lighter, washed out version
    background: color-mix(in oklch, var(--primary-color), white 60%);
  }
}

// Create color variations
.badge {
  --badge-bg: color-mix(in oklch, var(--info-color), white 80%);
  --badge-text: color-mix(in oklch, var(--info-color), black 30%);
  
  background: var(--badge-bg);
  color: var(--badge-text);
}
```

### Subgrid

Nested grid layouts:

```scss
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid; // Align with parent grid rows
  grid-row: span 3;            // Span 3 rows of parent
  
  .header { grid-row: 1; }
  .content { grid-row: 2; }
  .footer { grid-row: 3; }
}
```

### Cascade Layers

Control specificity ordering across large codebases:

```scss
// Define layer order (lowest to highest priority)
@layer reset, base, components, utilities;

// Add styles to a layer
@layer base {
  body {
    font-family: var(--font-family);
    color: var(--text-color);
  }
}

@layer components {
  .button {
    padding-block: 0.5rem;
    padding-inline: 1rem;
  }
}

// Utility overrides always win, regardless of selector specificity
@layer utilities {
  .hidden { display: none; }
}
```

### text-wrap

Improved text wrapping for headings and paragraphs:

```scss
// Balance short text (headings, captions) — evens out line lengths
h1, h2, h3 {
  text-wrap: balance;
}

// Pretty wrapping for paragraphs — avoids orphans on the last line
p {
  text-wrap: pretty;
}
```

### oklch() Color Space

Perceptually uniform colors:

```scss
:root {
  // OKLCH: oklch(lightness chroma hue / alpha)
  --color-primary: oklch(0.6 0.2 250);     // Blue
  --color-success: oklch(0.7 0.15 140);    // Green
  --color-danger: oklch(0.6 0.2 25);       // Red
  
  // Easy variations with calc()
  --color-primary-light: oklch(from var(--color-primary) calc(l + 0.2) c h);
  --color-primary-dark: oklch(from var(--color-primary) calc(l - 0.2) c h);
  
  // Transparency
  --color-primary-transparent: oklch(from var(--color-primary) l c h / 0.5);
}
```

**OKLCH Components:**
- `l` (Lightness): 0-1 (0 = black, 1 = white)
- `c` (Chroma): 0-0.4 (0 = gray, higher = more saturated)
- `h` (Hue): 0-360 degrees
- `alpha`: 0-1 opacity (optional)

### Relative Color Syntax

Transform colors dynamically:

```scss
.element {
  --base-color: oklch(0.6 0.2 250);
  
  // Lighten
  --light: oklch(from var(--base-color) calc(l + 0.2) c h);
  
  // Darken
  --dark: oklch(from var(--base-color) calc(l - 0.2) c h);
  
  // Desaturate
  --muted: oklch(from var(--base-color) l calc(c * 0.5) h);
  
  // Change hue
  --shifted: oklch(from var(--base-color) l c calc(h + 180));
  
  // Add transparency
  --transparent: oklch(from var(--base-color) l c h / 0.5);
}
```

## Best Practices

### 1. Verification Before Use

**Always verify feature availability:**
- Reference caniuse (if available) or Context7 MDN documentation
- Verify Baseline 2024 availability before using new CSS features
- Consider progressive enhancement for older browsers

### 2. Prefer Modern Over Legacy

```scss
// ✅ CORRECT - Modern
.element {
  inset-inline-start: 1rem;
  color: oklch(0.6 0.2 250);
  container-type: inline-size;
}

// ❌ WRONG - Legacy (unless required for older browser support)
.element {
  left: 1rem;
  color: #4a90e2;
}
```

### 3. Use Logical Properties Consistently

Don't mix logical and physical properties:

```scss
// ❌ WRONG - Inconsistent
.element {
  margin-block: 1rem;
  padding-left: 0.5rem;    // Should use padding-inline-start
  inset-inline-start: 1rem;
  top: 2rem;               // Should use inset-block-start
}

// ✅ CORRECT - Consistent
.element {
  margin-block: 1rem;
  padding-inline-start: 0.5rem;
  inset-inline-start: 1rem;
  inset-block-start: 2rem;
}
```

### 4. Container Queries Over Media Queries

Prefer container queries for component-level responsiveness:

```scss
// ❌ LESS IDEAL - Media query (viewport-based)
@media (min-width: 768px) {
  .card {
    grid-template-columns: repeat(2, 1fr);
  }
}

// ✅ BETTER - Container query (component-based)
.card-container {
  container-type: inline-size;
}

@container (min-width: 768px) {
  .card {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 5. Use OKLCH for Color Manipulation

OKLCH provides perceptually uniform color adjustments:

```scss
// ✅ CORRECT - OKLCH manipulation
.button {
  background: var(--primary-color);
  
  &:hover {
    background: oklch(from var(--primary-color) calc(l - 0.1) c h);
  }
}

// ❌ LESS IDEAL - Manual color values
.button {
  background: #4a90e2;
  
  &:hover {
    background: #3a7bc8; // Hard to maintain
  }
}
```

## Quick Reference

### Logical Property Axes

- **Block Axis:** Vertical in horizontal writing mode (top/bottom)
- **Inline Axis:** Horizontal in horizontal writing mode (left/right)
- In RTL, inline direction reverses
- In vertical writing modes, axes rotate

### Baseline 2024 Features Checklist

- ✅ `:has()` selector
- ✅ CSS Nesting
- ✅ Container Queries (`@container`)
- ✅ Container Query Units (`cqi`, `cqb`, etc.)
- ✅ `color-mix()`
- ✅ `subgrid`
- ✅ `oklch()` color space
- ✅ Relative color syntax
- ✅ Cascade Layers (`@layer`)
- ✅ `text-wrap: balance` / `pretty`

### Common Patterns

**Spacing:**
```scss
// Consistent logical spacing
.element {
  margin-block: 1rem;
  padding-inline: 2rem;
}
```

**Color Variations:**
```scss
// Dynamic color adjustments
.element {
  --hover-bg: oklch(from var(--bg) calc(l - 0.1) c h);
  --disabled-bg: oklch(from var(--bg) l c h / 0.5);
}
```

**Responsive Components:**
```scss
// Container-based responsiveness
.container {
  container-type: inline-size;
}

.element {
  padding: 2cqi;
  
  @container (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Related Skills

- [Angular Development](../angular-development/SKILL.md) - Angular and TypeScript best practices
- [Design System](../design-system/SKILL.md) - Design system implementation

