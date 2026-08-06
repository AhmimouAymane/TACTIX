# API

> Product: TACTIX
> Version: 1.0
> Document Type: API Specification
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. API Principles
3. Base URL
4. Authentication
5. Response Format
6. Error Format
7. Pagination
8. Rate Limiting
9. Versioning
10. WebSocket Events
11. Endpoint Overview
12. Core Endpoints
13. Fantasy Endpoints
14. League Endpoints
15. Match Endpoints
16. Content Endpoints
17. Admin Endpoints
18. Search
19. Caching
20. Acceptance Criteria

---

# 1. Objective

The API specification defines the contract between the mobile app, the web admin, and the backend.

---

# 2. API Principles

- REST over HTTPS
- JSON payloads
- Consistent naming (snake_case)
- Idempotent writes
- Versioned
- Rate limited
- Documented

---

# 3. Base URL

Production:

https://api.tactix.ma/v1

Staging:

https://api.staging.tactix.ma/v1

---

# 4. Authentication

## Bearer Token

Authorization: Bearer <access_token>

## Token Lifecycle

- Access token: short-lived
- Refresh token: rotated on use
- Logout invalidates all refresh tokens

---

# 5. Response Format

## Success

{
  "data": { ... },
  "meta": { "page": 1, "total": 100 }
}

## WebSocket Messages

{
  "type": "score.update",
  "data": { ... }
}

---

# 6. Error Format

{
  "error": {
    "code": "TRANSFER_BUDGET_EXCEEDED",
    "message": "Budget exceeded",
    "details": { ... },
    "hint": "Sell a player first"
  }
}

## Common Codes

UNAUTHORIZED

FORBIDDEN

NOT_FOUND

VALIDATION_ERROR

RATE_LIMITED

SERVER_ERROR

DEADLINE_PASSED

BUDGET_EXCEEDED

CLUB_LIMIT_EXCEEDED

DUPLICATE_ENTRY

---

# 7. Pagination

Query parameters:

page

per_page (max 100)

Response includes meta.

---

# 8. Rate Limiting

## Limits

- Auth endpoints: strict
- Public endpoints: per IP
- Authenticated endpoints: per user

## Response

HTTP 429 with Retry-After header.

---

# 9. Versioning

- URL versioning (/v1)
- Breaking changes = new version
- Old versions deprecated with notice

---

# 10. WebSocket Events

## Match Events

match.score_update

match.event_added

match.status_change

## Fantasy Events

points.updated

rank.updated

## Manager Events

deadline.countdown

notification.new

---

# 11. Endpoint Overview

## Domains

Auth

Users

Players

Clubs

Fixtures

Gameweeks

Teams

Transfers

Leagues

Rankings

News

Notifications

Admin

---

# 12. Core Endpoints

## Auth

POST /auth/register

POST /auth/login

POST /auth/refresh

POST /auth/logout

POST /auth/forgot-password

POST /auth/reset-password

POST /auth/verify-email

---

## Users

GET /users/me

PATCH /users/me

DELETE /users/me

GET /users/:id (public profile)

---

# 13. Fantasy Endpoints

## Players

GET /players

GET /players/:id

GET /players/:id/history

GET /players/search

---

## Clubs

GET /clubs

GET /clubs/:id

GET /clubs/:id/players

---

## Fixtures

GET /fixtures

GET /fixtures/:id

GET /fixtures?gameweek=:gw

---

## Gameweeks

GET /gameweeks

GET /gameweeks/current

GET /gameweeks/:id

---

## Teams

POST /teams (create squad)

GET /teams/mine

PUT /teams/mine (save squad)

GET /teams/mine/entries

---

## Transfers

POST /transfers (confirm transfer)

GET /transfers?gameweek=:gw

---

# 14. League Endpoints

POST /leagues

GET /leagues/mine

GET /leagues/:id

POST /leagues/:id/join

POST /leagues/:id/invite

GET /leagues/:id/standings

POST /leagues/:id/announcements

DELETE /leagues/:id/members/:userId

---

# 15. Match Endpoints

GET /matches/live

GET /matches/:id

GET /matches/:id/events

GET /matches/:id/lineups

GET /matches/:id/stats

GET /matches/:id/fantasy

---

# 16. Content Endpoints

GET /news

GET /news/:id

GET /news/:id/related

POST /news/:id/save

GET /announcements

---

# 17. Admin Endpoints

## Users

GET /admin/users

PATCH /admin/users/:id

POST /admin/users/:id/suspend

POST /admin/users/:id/restore

---

## Data

POST /admin/players

PATCH /admin/players/:id

POST /admin/fixtures

PATCH /admin/fixtures/:id

POST /admin/stats/correct

---

## Content

POST /admin/news

PATCH /admin/news/:id

POST /admin/announcements

---

## System

GET /admin/audit-log

POST /admin/feature-flags

POST /admin/maintenance-mode

---

# 18. Search

GET /search?q=:query&type=players|clubs|leagues|managers

Returns grouped results.

---

# 19. Caching

## Cache Headers

Public data: Cache-Control headers.

## Conditional Requests

ETag / If-None-Match supported.

---

# 20. Acceptance Criteria

✓ All endpoints documented.

✓ Auth flows work end to end.

✓ Errors are structured and localized.

✓ Pagination is consistent.

✓ Rate limiting is enforced.

✓ WebSocket events are documented.

✓ Admin endpoints are role-protected.

---

# Dependencies

• Backend

• Database

• Security