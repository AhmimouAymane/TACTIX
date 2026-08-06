# Flutter (Mobile Application)

> Product: TACTIX
> Version: 1.0
> Document Type: Mobile Architecture
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Technology Stack
3. Architecture
4. Project Structure
5. State Management
6. Routing
7. Data Layer
8. Real-Time
9. Localization
10. Theming
11. Deep Links
12. Notifications
13. Offline Handling
14. Payments
15. Performance
16. Testing
17. Acceptance Criteria

---

# 1. Objective

The Flutter app is the primary TACTIX experience: fantasy teams, live scoring, leagues, and content across Android and iOS.

---

# 2. Technology Stack

| Component | Choice |
|---|---|
| Framework | Flutter |
| Language | Dart |
| State | Riverpod |
| Navigation | go_router |
| Local Storage | Hive / Isar |
| Networking | Dio |
| WebSocket | socket_io_client |
| Localization | intl |
| Maps | google_maps_flutter |
| Notifications | firebase_messaging |

---

# 3. Architecture

## Feature-First

Apps split into features.

Each feature has its own:

- data
- domain
- presentation

## Layers

presentation

application

domain

data

---

# 4. Project Structure

lib/
  core/
  features/
    auth/
    home/
    match_center/
    fantasy_team/
    transfers/
    search/
    live_scores/
    player_profile/
    club_profile/
    leagues/
    standings/
    news/
    premium/
    profile/
    settings/
  models/
  utils/
  widgets/
  main.dart

---

# 5. State Management

Riverpod for:

- Authentication state
- Squad state
- Live match data
- League standings
- Theme
- Language

## Local-Only State

- Form fields
- Bottom sheets
- Filters

---

# 6. Routing

- go_router routes:
  / (Home)

  /auth/login

  /register

  /matches/:id

  /match_center

  /team

  /players

  /player/:id

  /clubs

  /club/:id

  /leagues

  /league/:id

  /standings

  /news

  /profiles/:id

  /settings

## Deep Links

- Notifications open the correct route
- League invites open the League screen

---

# 7. Data Layer

- Dio with interceptors
  - attaches access token
  - refreshes on 401
  - handles errors
- Repositories per feature
- Cache via Hive

---

# 8. Real-Time

- Listens per screens:
  - Home — sales
  - Live Center — live events
  - Points — point updates
  - Notifications — chat and alerts

- Reconnect with backoff
- Fallback polling

---

# 9. Localization

- Arabic, French, English
- RTL support for Arabic
- Translations maintained centrally

---

# 10. Theming

- Dark mode support
- ThemeSystem token

---

# 11. Deep Links

- Universal Links (iOS)
- App Links (Android)
- Web fallback URLs

---

# 12. Notifications

- Local notifications for reminders
- Remote via FCM/APNs

---

# 13. Offline

- Cache squads
- Cache player lists
- Queue transfer intent
- Show sync status

---

# 14. Security

- Secure storage for tokens (flutter_secure_storage)
- Server-time validation for deadline checks
- No sensitive data in logs

---

# 15. Performance

- Lazy loading lists
- Image caching
- Profile-friendly build sizes
- Avoid heavy layouts per frame

---

# 16. Testing

- Unit tests — logic, scoring
- Widget tests — key widgets
- Integration (smoke)

---

# 17. CI / Quality

- Format, analyze
- Auto fixing
- Versioning workflow

---

# 18. Acceptance Criteria

✓ App runs on Android and iOS.

✓ Squad editing works with budget/limits.

✓ Live scoring updates without refresh.

✓ All 3 languages supported.

✓ Dark mode works.

✓ Notifications deep link correctly.

✓ Offline squad reads work.

✓ Tests passed.

---

# Dependencies

• Backend

• API

• Database Design

• Security