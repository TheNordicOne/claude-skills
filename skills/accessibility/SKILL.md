---
name: accessibility
description: WCAG AA accessibility and semantic HTML best practices. Covers document structure, ARIA, keyboard navigation, focus management, forms, media, tables, and Baseline 2024 features (dialog, popover, search). Apply whenever writing or reviewing HTML in any framework.
license: MIT
---

# Accessibility & Semantic HTML Skill

WCAG AA accessibility and semantic HTML best practices. Apply whenever writing HTML — regardless of framework. Prioritize native HTML semantics over ARIA, use Baseline 2024 features, and ensure keyboard and screen reader support.

## Core Principles

Write HTML that is:
- **Semantic:** Use elements for their meaning, not their appearance
- **Accessible:** Meet WCAG AA; keyboard-operable, screen-reader friendly
- **Modern:** Use Baseline 2024 HTML features
- **Minimal:** Avoid unnecessary wrappers, ARIA, and JS when native elements suffice

**The first rule of ARIA:** Don't use ARIA if a native HTML element provides the semantics you need.

## Document Structure & Landmarks

### Heading Hierarchy

- Use exactly one `<h1>` per page
- Never skip heading levels (e.g., `<h1>` followed by `<h3>`)
- Headings must reflect content hierarchy, not visual sizing

```html
<!-- ❌ WRONG - Skipped heading level -->
<h1>Dashboard</h1>
<h3>Recent Activity</h3>

<!-- ✅ CORRECT - Sequential heading levels -->
<h1>Dashboard</h1>
<h2>Recent Activity</h2>
<h3>Today</h3>
```

### Sectioning Elements

Use sectioning elements to define the document outline and create implicit ARIA landmarks.

| Element | Landmark Role | Use For |
|:--------|:-------------|:--------|
| `<header>` | `banner` (when top-level) | Site header, page title area |
| `<nav>` | `navigation` | Primary and secondary navigation |
| `<main>` | `main` | Primary page content (one per page) |
| `<aside>` | `complementary` | Sidebar, related links, supplementary content |
| `<footer>` | `contentinfo` (when top-level) | Site footer, copyright, legal links |
| `<section>` | `region` (when labelled) | Thematic grouping with a heading |
| `<article>` | `article` | Self-contained, independently distributable content |

```html
<!-- ✅ CORRECT - Semantic document structure -->
<body>
  <header>
    <nav aria-label="Main">...</nav>
  </header>

  <main>
    <h1>Page Title</h1>

    <section aria-labelledby="recent-heading">
      <h2 id="recent-heading">Recent Orders</h2>
      <article>...</article>
      <article>...</article>
    </section>

    <aside aria-label="Related products">...</aside>
  </main>

  <footer>...</footer>
</body>
```

**Rules:**
- Only one `<main>` per page
- Label multiple `<nav>` elements with `aria-label` to distinguish them
- A `<section>` without a heading or label has no landmark role — use it only when you can label it
- Avoid redundant roles: do **not** add `role="banner"` to `<header>` or `role="navigation"` to `<nav>`

### Skip Links

Provide a skip link as the first focusable element for keyboard users:

```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>...</header>
  <main id="main-content">...</main>
</body>
```

## Interactive Elements

### Links vs Buttons

**Links navigate. Buttons perform actions.** This distinction is critical for assistive technology.

| Use | Element | Why |
|:----|:--------|:----|
| Navigate to a URL | `<a href="...">` | Screen readers announce "link"; users expect navigation |
| Trigger an action | `<button>` | Screen readers announce "button"; users expect an action |
| Submit a form | `<button type="submit">` | Default button type inside forms |

```html
<!-- ❌ WRONG - div as button -->
<div class="btn" onclick="save()">Save</div>

<!-- ❌ WRONG - anchor as button (no navigation) -->
<a href="#" onclick="save(); return false;">Save</a>

<!-- ❌ WRONG - button for navigation -->
<button onclick="location.href='/about'">About Us</button>

<!-- ✅ CORRECT - button for action -->
<button type="button" (click)="save()">Save</button>

<!-- ✅ CORRECT - anchor for navigation -->
<a href="/about">About Us</a>
```

**Rules:**
- A `<button>` without a `type` attribute defaults to `type="submit"` inside a form. Always set `type="button"` for non-submit buttons
- Never use `<div>` or `<span>` as interactive elements — they lack focus, keyboard, and role semantics
- If you must make a non-interactive element interactive (rare), you need: `role`, `tabindex="0"`, and keyboard event handlers — but prefer a native element instead

### Buttons Without Visible Text

When a button has only an icon, provide an accessible name:

```html
<!-- ✅ CORRECT - aria-label for icon-only button -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>

<!-- ✅ CORRECT - visually hidden text -->
<button type="button">
  <svg aria-hidden="true">...</svg>
  <span class="visually-hidden">Close dialog</span>
</button>
```

## Forms & Validation

### Labelling

Every form control **must** have an accessible name. Prefer visible `<label>` elements.

```html
<!-- ❌ WRONG - no label -->
<input type="email" placeholder="Email">

<!-- ❌ WRONG - placeholder is not a label -->
<input type="email" placeholder="Enter your email">

<!-- ✅ CORRECT - explicit label association -->
<label for="email">Email address</label>
<input id="email" type="email" autocomplete="email">

<!-- ✅ CORRECT - implicit label wrapping -->
<label>
  Email address
  <input type="email" autocomplete="email">
</label>
```

### Grouping Related Controls

Use `<fieldset>` and `<legend>` to group related controls:

```html
<!-- ✅ CORRECT - grouped radio buttons -->
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
  <label><input type="radio" name="contact" value="sms"> SMS</label>
</fieldset>
```

### Input Types

Use the correct `type` attribute. It affects mobile keyboards, autofill, and built-in validation.

| Data | Type | Notes |
|:-----|:-----|:------|
| Email | `type="email"` | Shows `@` key on mobile |
| Phone | `type="tel"` | Shows numeric keypad |
| URL | `type="url"` | Shows `.com` key on mobile |
| Number | `type="number"` | Spinner, `min`/`max`/`step` support |
| Date | `type="date"` | Native date picker |
| Search | `type="search"` | Clear button, search semantics |
| Password | `type="password"` | Masked input, password managers |

### Autocomplete

Use the `autocomplete` attribute to help browsers and password managers:

```html
<input type="text" autocomplete="name">
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
<input type="text" autocomplete="street-address">
<input type="text" autocomplete="new-password">
```

### Native Validation Attributes

Use built-in validation before reaching for JavaScript:

```html
<input type="email" required aria-describedby="email-error">
<input type="text" minlength="2" maxlength="100">
<input type="number" min="1" max="99" step="1">
<input type="url" pattern="https://.*" title="Must start with https://">
<span id="email-error" role="alert" aria-live="assertive"></span>
```

### Accessible Error Messages

Connect error messages to their inputs with `aria-describedby` and announce them dynamically:

```html
<label for="username">Username</label>
<input
  id="username"
  type="text"
  required
  aria-invalid="true"
  aria-describedby="username-error"
>
<span id="username-error" role="alert">Username is required.</span>
```

**Rules:**
- Set `aria-invalid="true"` on inputs with errors
- Use `aria-describedby` to link inputs to their error messages
- Use `role="alert"` or `aria-live="assertive"` on error containers so screen readers announce them when they appear
- Group related errors at the form level with an error summary linking to each invalid field

## Modern HTML (Baseline 2024)

### `<dialog>` Element

Use the native `<dialog>` element for modals and non-modal dialogs. It provides built-in focus trapping (modal), Escape to close, and backdrop.

#### Modal Dialog

```html
<button type="button" id="open-dialog">Edit Profile</button>

<dialog id="profile-dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Edit Profile</h2>
  <form method="dialog">
    <label for="display-name">Display name</label>
    <input id="display-name" type="text" required>
    <button type="submit">Save</button>
    <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
  </form>
</dialog>
```

```typescript
// Open as modal — traps focus, shows backdrop
document.getElementById('open-dialog').addEventListener('click', () => {
  document.getElementById('profile-dialog').showModal();
});
```

#### Non-Modal Dialog

```typescript
// Open as non-modal — no focus trapping, no backdrop
dialog.show();
```

**Rules:**
- Always use `showModal()` for modal dialogs (traps focus, enables Escape, shows `::backdrop`)
- Use `show()` for non-modal dialogs (tooltips, notifications that don't block interaction)
- Add `aria-labelledby` pointing to the dialog's heading
- Use `<form method="dialog">` to close the dialog on submit
- Return focus to the triggering element on close
- Never use `<div role="dialog">` when `<dialog>` is available

### Popover API

Use the `popover` attribute for lightweight, non-modal overlays like tooltips, menus, and dropdowns. No JavaScript required for basic toggle behavior.

```html
<!-- Declarative toggle — no JS needed -->
<button type="button" popovertarget="menu-popover">Options</button>

<div id="menu-popover" popover>
  <ul role="menu">
    <li role="menuitem"><button type="button">Edit</button></li>
    <li role="menuitem"><button type="button">Delete</button></li>
  </ul>
</div>
```

**Popover types:**
- `popover` (or `popover="auto"`) — auto-dismisses when clicking outside or pressing Escape; only one auto popover open at a time
- `popover="manual"` — must be explicitly closed; multiple can be open simultaneously

**Rules:**
- Use `popover` for tooltips, menus, dropdowns, and date pickers
- Use `<dialog>` for modals that require focus trapping
- Use `popovertarget` to declaratively connect the trigger to the popover
- Use `popovertargetaction="show | hide | toggle"` to control behavior (default is `toggle`)
- Add appropriate ARIA roles (`role="menu"`, `role="tooltip"`, etc.) to the popover content

### `<search>` Element

Use `<search>` as a semantic wrapper for search functionality. It creates a `search` landmark.

```html
<!-- ❌ WRONG - div with role -->
<div role="search">
  <input type="search" aria-label="Search products">
  <button type="submit">Search</button>
</div>

<!-- ✅ CORRECT - native <search> element -->
<search>
  <form action="/search">
    <label for="product-search">Search products</label>
    <input id="product-search" type="search" name="q">
    <button type="submit">Search</button>
  </form>
</search>
```

### `<details>` / `<summary>` with Exclusive Accordions

The `name` attribute (Baseline 2024) creates exclusive accordion groups — opening one closes the others.

```html
<!-- ✅ Exclusive accordion group -->
<details name="faq">
  <summary>How do I reset my password?</summary>
  <p>Go to Settings > Security > Reset Password.</p>
</details>

<details name="faq">
  <summary>How do I change my email?</summary>
  <p>Go to Settings > Profile > Email Address.</p>
</details>

<details name="faq" open>
  <summary>Where are my invoices?</summary>
  <p>Go to Billing > Invoice History.</p>
</details>
```

**Rules:**
- Use the same `name` value to group exclusive `<details>` elements
- Use `open` attribute to expand a panel by default
- Do not use `<details>` for critical content that must always be visible

## Accessibility

### ARIA Landmarks

Use landmarks to let screen reader users jump between page regions. Native HTML elements create landmarks automatically — avoid redundant `role` attributes.

```html
<!-- ❌ WRONG - redundant role on native element -->
<nav role="navigation">...</nav>
<main role="main">...</main>

<!-- ✅ CORRECT - native elements are sufficient -->
<nav aria-label="Main">...</nav>
<main>...</main>
```

When multiple landmarks of the same type exist, label them:

```html
<nav aria-label="Main">...</nav>
<nav aria-label="Breadcrumb">...</nav>
```

### ARIA Live Regions

Use live regions to announce dynamic content changes to screen readers.

| Politeness | Attribute | Use For |
|:-----------|:----------|:--------|
| Assertive | `aria-live="assertive"` or `role="alert"` | Errors, critical warnings that need immediate attention |
| Polite | `aria-live="polite"` or `role="status"` | Success messages, progress updates, non-critical notifications |

```html
<!-- Error announcement (immediate) -->
<div role="alert" aria-live="assertive">
  Payment failed. Please check your card details.
</div>

<!-- Status update (waits for user to finish current task) -->
<div role="status" aria-live="polite">
  3 results found.
</div>

<!-- Loading state -->
<div role="status" aria-live="polite" aria-busy="true">
  Loading results...
</div>
```

**Rules:**
- The live region container **must** exist in the DOM before content is injected — changing content triggers the announcement, not adding the container
- Use `role="alert"` sparingly — it interrupts the user; prefer `role="status"` for non-critical updates
- Use `aria-busy="true"` during loading states to batch announcements
- Use `aria-atomic="true"` when the entire region should be re-announced on any change

### Keyboard Navigation

#### Focusable Elements

Native interactive elements are focusable by default: `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`, `<details>`.

```html
<!-- ❌ WRONG - tabindex > 0 disrupts natural tab order -->
<button tabindex="5">Save</button>

<!-- ❌ WRONG - non-interactive element with tabindex -->
<div tabindex="0" onclick="doStuff()">Click me</div>

<!-- ✅ CORRECT - use native interactive elements -->
<button type="button">Save</button>
```

**Rules:**
- **Never** use `tabindex` values greater than `0` — it disrupts the natural DOM order
- Use `tabindex="0"` only on custom interactive widgets (and pair with `role` and keyboard handlers)
- Use `tabindex="-1"` to make elements programmatically focusable but not in the tab order (e.g., for focus management)

#### Roving Tabindex for Composite Widgets

For composite widgets like tabs, menus, and toolbars, use roving tabindex — one item in the group has `tabindex="0"`, the rest have `tabindex="-1"`. Arrow keys move focus within the group.

```html
<!-- Tab list with roving tabindex -->
<div role="tablist" aria-label="Account settings">
  <button role="tab" aria-selected="true" tabindex="0" aria-controls="panel-1">General</button>
  <button role="tab" aria-selected="false" tabindex="-1" aria-controls="panel-2">Security</button>
  <button role="tab" aria-selected="false" tabindex="-1" aria-controls="panel-3">Notifications</button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">...</div>
```

**Expected keyboard behavior:**
- **Tab/Shift+Tab** — moves focus into and out of the composite widget
- **Arrow keys** — move focus between items within the widget
- **Home/End** — move focus to the first/last item
- **Enter/Space** — activate the focused item

### Focus Management

Manage focus when content changes dynamically:

```html
<!-- After deleting an item, move focus to a logical target -->
<h2 id="list-heading" tabindex="-1">Shopping Cart (2 items)</h2>

<!-- After opening inline content, move focus to it -->
<div id="expanded-content" tabindex="-1">
  ...expanded details...
</div>
```

**Rules:**
- After removing content, move focus to a logical previous element or heading
- After adding major content (e.g., expanding a section), move focus to the new content or announce it via a live region
- Use `tabindex="-1"` on non-interactive elements that receive programmatic focus
- For `<dialog>`, the browser handles focus trapping automatically when using `showModal()`

## Images & Media

### Alt Text

Every `<img>` must have an `alt` attribute. The value depends on the image's role.

| Image Role | Alt Text | Example |
|:-----------|:---------|:--------|
| Informative | Describe the content | `alt="Bar chart showing Q3 revenue up 15%"` |
| Decorative | Empty alt | `alt=""` |
| Functional (inside a link/button) | Describe the action | `alt="Download invoice PDF"` |
| Complex (charts, diagrams) | Brief summary + long description | `alt="Q3 sales breakdown"` with `aria-describedby` pointing to full description |

```html
<!-- ❌ WRONG - missing alt -->
<img src="logo.png">

<!-- ❌ WRONG - useless alt -->
<img src="chart.png" alt="image">

<!-- ✅ CORRECT - informative alt -->
<img src="chart.png" alt="Monthly revenue chart: January $50k, February $62k, March $71k">

<!-- ✅ CORRECT - decorative image -->
<img src="decorative-border.png" alt="">

<!-- ✅ CORRECT - icon inside a link -->
<a href="/home">
  <img src="home-icon.svg" alt="Home">
</a>
```

### `<picture>` Element

Use `<picture>` for art direction and serving different formats:

```html
<picture>
  <source srcset="hero-wide.avif" media="(min-width: 1200px)" type="image/avif">
  <source srcset="hero-wide.webp" media="(min-width: 1200px)" type="image/webp">
  <source srcset="hero-narrow.avif" type="image/avif">
  <source srcset="hero-narrow.webp" type="image/webp">
  <img src="hero-narrow.jpg" alt="Product showcase" loading="lazy">
</picture>
```

### `<figure>` and `<figcaption>`

Use for images, charts, code snippets, or quotes that need a caption:

```html
<figure>
  <img src="architecture-diagram.png" alt="System architecture showing three microservices connected via message queue">
  <figcaption>Figure 1: High-level system architecture</figcaption>
</figure>
```

### Lazy Loading & Fetch Priority

```html
<!-- Above the fold — load eagerly with high priority -->
<img src="hero.jpg" alt="..." loading="eager" fetchpriority="high">

<!-- Below the fold — lazy load -->
<img src="product.jpg" alt="..." loading="lazy">

<!-- Preload critical images in <head> -->
<link rel="preload" href="hero.avif" as="image" type="image/avif" fetchpriority="high">
```

**Rules:**
- Use `loading="lazy"` for images below the fold
- Use `fetchpriority="high"` for LCP (Largest Contentful Paint) images
- Never lazy-load above-the-fold images — it hurts performance
- Always provide `width` and `height` attributes (or use CSS `aspect-ratio`) to prevent layout shifts

## Tables

Use tables for tabular data, **never** for layout.

```html
<!-- ✅ CORRECT - accessible data table -->
<table>
  <caption>Q3 2024 Sales by Region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>$1.2M</td>
      <td>+15%</td>
    </tr>
    <tr>
      <th scope="row">Europe</th>
      <td>$980K</td>
      <td>+8%</td>
    </tr>
  </tbody>
</table>
```

**Rules:**
- Always include `<caption>` to describe the table's purpose
- Use `<thead>`, `<tbody>`, and `<tfoot>` to group rows
- Use `scope="col"` on column headers, `scope="row"` on row headers
- For complex tables with multi-level headers, use `id` and `headers` attributes to associate data cells with their headers
- Never use tables for page layout — use CSS Grid

## The `<output>` Element

Use `<output>` for calculation results, live feedback, or values derived from user input. It has an implicit `role="status"` and acts as a polite live region.

```html
<form oninput="total.value = parseInt(price.value) * parseInt(quantity.value)">
  <label for="price">Price</label>
  <input id="price" type="number" value="10">

  <label for="quantity">Quantity</label>
  <input id="quantity" type="number" value="1">

  <label for="total">Total</label>
  <output id="total" name="total" for="price quantity">10</output>
</form>
```

**Rules:**
- Use the `for` attribute to list the IDs of inputs that contribute to the output
- Screen readers announce changes automatically (implicit `aria-live="polite"`)
- Use for calculated values, character counts, or real-time feedback

## Quick Reference

### Do's

- Use semantic elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`)
- Use `<button>` for actions, `<a>` for navigation
- Label all form controls with `<label>`
- Group related form controls with `<fieldset>` and `<legend>`
- Use correct `input` types and `autocomplete` values
- Use `<dialog>` for modals, `popover` for lightweight overlays
- Use `<search>` for search landmarks
- Use `<details name="...">` for exclusive accordions
- Use `<table>` with `<caption>`, `scope`, `<thead>`/`<tbody>` for tabular data
- Use `<output>` for calculated or derived values
- Provide `alt` text on all images (empty for decorative)
- Use `loading="lazy"` for below-the-fold images
- Use `aria-live` regions for dynamic content announcements
- Use roving tabindex for composite widgets
- Manage focus when content changes dynamically

### Don'ts

- Don't use `<div>` or `<span>` as interactive elements
- Don't use `tabindex` values greater than `0`
- Don't skip heading levels
- Don't add redundant roles to native elements (`<nav role="navigation">`)
- Don't use `<table>` for layout
- Don't use `placeholder` as a substitute for `<label>`
- Don't use `<div role="dialog">` when `<dialog>` is available
- Don't use `<div role="search">` when `<search>` is available
- Don't lazy-load above-the-fold images
- Don't use `aria-live="assertive"` for non-critical updates

## Related Skills

- [Angular Development](../angular-development/SKILL.md) - Angular component architecture and template patterns
- [CSS Modern](../css-modern/SKILL.md) - Modern CSS layout and styling
- [Component Tests](../component-tests/SKILL.md) - Testing with semantic selectors (getByRole, getByLabelText)
- [Design System](../design-system/SKILL.md) - SoftwareOne design system components
