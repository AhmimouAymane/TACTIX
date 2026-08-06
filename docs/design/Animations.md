# Animations

> Product: TACTIX
> Version: 1.0
> Document Type: Motion / Animations
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Motion Principles
3. Timing & Easing
4. Live Updates
5. Navigation Animations
6. Component Animations
7. Football-Feel Animations
8. Loading & Shimmer
9. Confetti / Celebrations
10. Reduced Motion
11. RTL Mirroring
12. Performance
13. Acceptance Criteria

---

# 1. Objective

The Animations guide defines intentional motion for TACTIX, balancing live energy with calm readability.

---

# 2. Principles

- Motion supports intent
- Quick and purposeful
- Subtle for live data
- Confetti sparingly
- Respect reduced motion

---

# 3. Timing & Easing

## Durations

Quick: 150ms

Standard: 250ms

Emphasis: 400ms

## Easing

Standard ease-in-out for most

Spring for highlight taps

Deceleration for sheets

---

# 4. Live Updates

- Score changes: brief flash/scale
- Point updates: subtle pulse
- Rank movements: fade + slide row
- Player price arrows

Keep under 300ms to avoid fatigue

---

# 5. Navigation Animations

- Slide (platform)
- Bottom sheet: rise with fade
- Tab switches: cross-fade
- Avoid zooming on common flows

---

# 6. Component Animations

- Buttons: press scale 0.98
- Cards: tap ripple/lift
- Progress bars: eased fill
- Live dot: pulsing glow ring

---

# 7. Football-Feel Animations

- After goal event: subtle pitch pulse on timeline
- Kickoff time map feel
- Score shake only for big moments (careful with motion)
- Crest appear on team switch

---

# 8. Loading / Shimmer

- Skeleton shimmer standard
- Live corner pulse badge
- Pull-to-refresh with pitch-line arc

---

# 9. Confetti / Celebrations

Use for:

- League win
- Achievement unlock
- Record score
Keep short (< 1.2s) and auto-dismiss

---

# 10. Reduced Motion

- Follows OS setting
- Disables non-essential animations
- Static states remain clear

---

# 11. RTL Mirroring

- All directional animations mirror in Arabic

---

# 12. Performance

- Use native drivers for transforms/opacity
- Avoid layout animation storms
- Cap simultaneous live animations

---

# 13. Acceptance Criteria

✓ All key screens have sensible motion.

✓ Live updates are subtle.

✓ Reduced motion honored.

✓ Animations perform at 60fps.

✓ RTL mirrors correctly.

---

# Dependencies

• Design System

• Components

• Mobile Screens