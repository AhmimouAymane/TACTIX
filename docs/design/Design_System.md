# Design System

> Product: TACTIX
> Version: 1.0
> Document Type: Design System
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Design Principles
3. Brand Colors
4. Color Roles
5. Typography
6. Spacing
7. Radii
8. Shadows
9. Icons
10. Imagery
11. Motion
12. Accessibility
13. Dark Mode
14. Localization & RTL
15. Acceptance Criteria

---

# 1. Objective

The Design System defines the visual language of TACTIX: colors, typography, spacing, components, and motion — consistent across Android and iOS.

---

# 2. Design Principles

- Football energy
- Dark-first design
- Clean and readable
- Fast, live feel
- Locale-aware

---

# 3. Colors

## Primary

Amber/Orange (#FFB020)

Used for: primary actions, highlights.

## Secondary

Dark slate:

#101828 (dark mode background)

#0B1120 (raider background)

---

## Accents

Pitch Green (#10B981)

Live Red (#EF4444)

Social Blue (#3B82F6)

Gold (premium) (#F59E0B)

---

## Neutrals

Text:

#FFFFFF (primary)

#94A3B8 (secondary)

#64748B (muted)

Surfaces:

#1E293B (card)

#0F172A (background)

---

## Semantic

Success: #10B981

Warning: #F59E0B

Error: #EF4444

Info: #3B82F6

---

# 4. Typography

## Font Stack

Primary: Inter

Fallback: system UI

## Sizes

Display: 32px

Headline: 24px

Title: 18px

Body: 16px

Caption: 13px

Label: 12px

## Weights

Bold: 700

Semibold: 600

Medium: 500

Regular: 400

---

# 5. Spacing

Base unit: 4px

Scale: 4, 8, 12, 16, 20, 24, 32

Layout margins: 16px

Card padding: 16px

---

# 6. Radii

Small: 8px

Medium: 12px

Large: 16px

Pill: 999px

---

# 7. Shadows

Elevated cards: soft shadow

Bottom sheet: top edge shadow

Dark mode: subtle glow

---

# 8. Icons

- Line style
- Sizes: 16, 20, 24, 32
- Consistent 1.5px stroke (20% optional)
- Club crests are imagery, not icons

---

# 9. Imagery

- Stadium photography with overlay
- Player photos from data provider / official sources
- Gradient overlays (dark → transparent)
- Crests with padding

---

# 10. Motion

- Quick: 150ms
- Standard: 250ms
- Emphasis: 400ms
- Easing: standard ease
- Live updates: subtle and instant

---

# 11. Accessibility

- Contrast meets WCAG AA
- Focus states visible
- Touch targets ≥ 44px
- Text scalable to 200%
- Reduced motion respected

---

# 12. Dark Mode

- Default theme: dark
- Light mode optional
- Token pairs for both

---

# 13. Localization & RTL

- Arabic RTL
- French / English LTR
- All layouts mirror

---

# 14. Acceptance Criteria

✓ Tokens defined.

✓ Light and dark modes.

✓ AA contrast.

✓ RTL works.

✓ Design applied by components.

---

# Dependencies

• PRD

• Components

• Mobile Screens

• Animations