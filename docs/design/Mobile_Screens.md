# Mobile Screens

> Product: TACTIX
> Version: 1.0
> Document Type: UX / Screens
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. App Structure
3. Onboarding & Auth
4. Home
5. Match Center
6. Fantasy Team
7. Transfers & Player Search
8. Player Profile
9. Club Profile
10. Leagues
11. Standings
12. News
13. Premium
14. Profile & Settings
15. Notifications
16. Admin (Web only)
17. State Handling
18. RTL & Localization
19. Acceptance Criteria

---

# 1. Objective

The Mobile Screens document defines the screen-by-screen layout and flows of the TACTIX mobile app.

---

# 2. Navigation

## Bottom Navigation

Home

Live

Team

Leagues

Profile

## Secondary

- Settings
- Search
- Notifications
- Premium

---

# 3. Onboarding & Auth

## Onboarding

- Welcome carousel
- Value props (3 slides)
- Language selector
- Region selector

## Registration

- Email / phone
- Password
- Favorite club
- Preferred language

## Login

- Email + password
- Social (Google / Apple)
- Biometric option (device auth)
- Forgot password

## Email Verification

- Verify screen
- Resend timer
- Deep link

---

# 4. Home

## Sections

- Header: streak, avatar, greeting
- Live now card (if matches live)
- Next deadline card
- Weekly news
- Sales / price changes feed
- My league standings snippet
- Featured fixtures

---

# 5. Match Center

## Sections

- Fixtures list by gameweek (filter: All/Home/Club)

- Match detail:
  - Score, minute, status
  - Timeline of events
  - Lineups
  - Stats
  - Fantasy points per entry

## Live screen

- Auto-updating scores
- Event feed (goal, assist, card)
- Bonus indicator countdown notes

---

# 6. Fantasy Team

## Squad

- Pitch view of XI (formation)
- Bench section
- Captain / VC badges
- Budget remaining

## Editing

- Tap player → swap
- Search / add player
- Position-validated

## Lock / Deadline

- Locked state
- Points preview

---

# 7. Transfers

## Flow

- List of transferable players
- Free transfer counter (week)
- Penalty preview (–4 per extra)
- Budget update preview
- Confirm dialog

---

# 8. Player Profile

## Sections

- Header: photo, name, club, position, price
- Stats this season
- Next fixtures
- Fixture history (points per gameweek)
- Price history chart
- Add / transfer action button

---

# 9. Club Profile

## Sections

- Crest, name, colors
- Team squad list
- Stats
- Fixtures (upcoming / results)
- Add to favorites
- Buy/club points

---

# 10. Leagues

## Leagues list

- My leagues as cards
- Invitations
- Create league flow

## League detail

- Tabs: Standings, Members, Announcements
- Winner indicator (enable)
- League code share

## Create

- Name, privacy, invite link

---

# 11. Standings

## Global / League

- Rank table with points
- Sortable (total / gameweek)
- Manager search
- Paginated

---

# 12. News

## Feed

- Latest articles
- Categories filter
- Save articles
- Article detail with related

---

# 13. Premium

## Premium Hub

- Benfts list
- Compare free vs premium
- Plan selector (monthly / yearly / trial)

## Payment

- Store billing flow (Google / Apple)
- Restore purchases

---

# 14. Profile & Settings

## Profile

- Avatar, username, favorite club
- Stats (rank, points, streak)

## Settings

- Language, theme, notifications
- Privacy
- Delete account
- Version info

---

# 15. Notifications

## Inbox

- List of notifications
- Types: match, points, league, system
- Read / unread state
- Deep links

---

# 16. Admin (Web only)

## Admin Dashboard

- Tables
- Forms
- Stats / overrides
- Content editor
- Feature flags

---

# 17. Empty / Loading / Error

Standard patterns for:

- No squad yet
- No leagues
- No notifications
- Loading states
- Error with retry

---

# 18. RTL & Localization

- All screens mirror for Arabic
- Strings via localized labels
- Dates and numerals locale-aware

---

# 19. Acceptance Criteria

✓ All flows screen-complete.

✓ Deadlines visible.

✓ Squad edit matches rules.

✓ Live screens update seamlessly.

✓ All locales render correctly.

---

# Dependencies

• Design System

• Components

• PRD (flow rules)