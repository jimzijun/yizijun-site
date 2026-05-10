---
version: alpha
name: Yizijun Nightbook
description: A dark, calm, game-dev portfolio theme with cool slate surfaces and electric blue interaction accents.
colors:
  primary: "#0B1020"
  secondary: "#1F2937"
  tertiary: "#93C5FD"
  neutral: "#E5E7EB"
  surface: "#111827"
  surfaceAlt: "#0F172A"
  border: "#334155"
  mutedText: "#CBD5E1"
  success: "#22C55E"
  warning: "#F59E0B"
  danger: "#EF4444"
typography:
  h1:
    fontFamily: Inter, system-ui, Arial, sans-serif
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Inter, system-ui, Arial, sans-serif
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: Inter, system-ui, Arial, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  body-sm:
    fontFamily: Inter, system-ui, Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
rounded:
  sm: 8px
  md: 12px
  lg: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 60px
components:
  page-bg:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  header:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    height: 56px
  nav-link:
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: 16px
  panel:
    backgroundColor: "{colors.surfaceAlt}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px
  border-default:
    backgroundColor: "{colors.surfaceAlt}"
    textColor: "{colors.neutral}"
---

## Overview

This design system codifies the current visual identity of yizijun-site: dark atmospheric backgrounds, soft slate cards, and blue-forward links/CTAs. It is optimized for readability in long sessions and for showcasing portfolio + game pages.

## Colors

- **Primary (`#0B1020`)**: base page background and chrome.
- **Secondary (`#1F2937`)**: radial gradient top tint.
- **Tertiary (`#93C5FD`)**: primary interaction accent for links and emphasis.
- **Neutral (`#E5E7EB`)**: default text on dark backgrounds.
- **Surface (`#111827`)** and **SurfaceAlt (`#0F172A`)**: cards and secondary panels.
- **Border (`#334155`)**: subtle structure without high contrast noise.
- **MutedText (`#CBD5E1`)**: secondary copy.

## Typography

Inter/system sans with a strong hero scale and compact heading letter-spacing. Body type prioritizes legibility on dark surfaces.

## Layout

Use a centered content column (`~980px`) with horizontal padding and generous vertical rhythm:

- page section padding: `{spacing.lg}` to `{spacing.xxl}`
- grid gaps: `{spacing.md}`
- CTA spacing: `{spacing.md}`

## Elevation & Depth

Depth is mostly achieved with tonal contrast (surface vs page) plus subtle border separation. Avoid heavy drop shadows in default state.

## Shapes

Rounded geometry is consistent across interactive and content blocks:

- cards/panels: `{rounded.md}`
- tighter controls/canvas edges: `{rounded.sm}`

## Components

- **header**: sticky top, translucent dark backdrop when needed.
- **nav-link**: accent-colored links, medium emphasis.
- **card/panel**: dark surface blocks with border and rounded corners.
- **button-primary**: bright accent fill with dark text for strong contrast.
- **button-primary-hover**: lighter inversion to signal interactivity.

## Do's and Don'ts

### Do

- Keep one dominant accent (tertiary blue) for interaction hierarchy.
- Maintain dark-first contrast and muted secondary text.
- Reuse token references instead of hardcoding ad-hoc values.

### Don't

- Introduce multiple saturated accents without semantic need.
- Use low-contrast gray-on-gray text for body copy.
- Mix many radius sizes beyond the defined scale.
