# Components

> Product: TACTIX
> Version: 1.0
> Document Type: UI Components
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Component Principles
3. Component Inventory
4. Core Components
5. Football-Specific Components
6. Data Display
7. Feedback
8. Navigation
9. Inputs
10. Live Components
11. Component States
12. Accessibility
13. Acceptance Criteria

---

# 1. Objective

The Components library defines reusable UI building blocks for TACTIX, consistent with the Design System.

---

# 2. Component Principles

- Reusable everywhere
- Accessible by default
- Locale-aware
- Dark-mode ready
- Self-contained

---

# 3. Component Inventory

## Core

Button

Card

AppBar

BottomNav

TextField

Chip

Badge

Avatar

Divider

Skeleton

---

## Football

PlayerCard

FixtureCard

MatchRow

ScoreCard

LineupRow

LiveDot

PositionTag

CaptainBadge

---

## Data

PointBadge

PriceTag

ProgressBar

RankBadge

StatBar

TrendIndicator

---

## Feedback

Snackbar

BottomSheet

Dialog

Toast

EmptyState

LoadingState

ErrorState

---

## Navigation

BottomNavBar

TabBar

SegmentedControl

Drawer

---

## Inputs

SearchBar

Switch

Dropdown

Stepper

Picker (date/time)

---

# 4. Core Components

## Button

Variants: primary, secondary, ghost, danger, premium

Sizes: sm, md, lg, full

States: enabled, pressed, loading, disabled

## Card

Surfaces with optional press feedback.

## TextField

With label, error, helper, leading/trailing icon.

## Chip / Badge

Compact labels: position, status, tag.

---

# 5. Football-Specific Components

## PlayerCard

Photo, name, position, price, points, club crest.

Used in: search, squad, transfers.

## FixtureCard

Clubs, kickoff, status, live score.

Used in: fixtures, match center.

## MatchRow

Compact live match with score and minute.

## LiveDot

Pulsing indicator for live matches.

## PositionTag

GK / DEF / MID / FWD with color.

## CaptainBadge

C on player avatar.

---

# 6. Data Display

## PointBadge

Gameweek and total points.

## PriceTag

Current price with change arrow.

## RankBadge

Rank with movement indicator.

## StatBar

Minutes, pass accuracy, etc.

---

# 7. Feedback

## Snackbar

Global message, auto-dismiss.

## BottomSheet

Squad actions, filters.

## Dialog

Confirmations, transfers.

## Empty / Loading / Error States

Standardized with retry.

---

# 8. Navigation

## BottomNavBar

Items: Home, Live, Team, Leagues, Profile (or approved IA).

## SegmentedControl

Fixtures / Standings / etc.

---

# 9. Inputs

SearchBar for players, clubs, leagues.

Switch for toggles (notifications).

Stepper for quantity (transfers).

Picker for deadlines/timezone display.

---

# 10. Live Components

- Match updates with subtle animation
- Point updates flash
- Ranking changes animate

---

# 11. States

Every component defines:

- Default
- Loading
- Error
- Empty
- Disabled

---

# 12. Accessibility

- Semantic labels
- Focus order
- Reduced motion
- Touch target ≥ 44px
- Contrast AA

---

# 13. Acceptance Criteria

✓ Components used across screens.

✓ States consistent.

✓ Localized strings.

✓ Dark and light modes.

✓ AA accessible.

---

# Dependencies

• Design System

• Mobile Screens

• Animations