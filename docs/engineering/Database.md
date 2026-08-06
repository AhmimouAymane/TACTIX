# Database

> Product: TACTIX
> Version: 1.0
> Document Type: Database Design
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Technology
3. Design Principles
4. Entity Overview
5. Core Entities
6. Fantasy Entities
7. League Entities
8. Content Entities
9. Billing Entities
10. Relationships
11. Indexing Strategy
12. Data Retention
13. Migrations
14. Backups
15. Performance
16. Acceptance Criteria

---

# 1. Objective

The Database stores all TACTIX data: users, clubs, players, fixtures, fantasy teams, leagues, points, and content.

This document defines the proposed schema and operational strategy.

---

# 2. Technology

| Component | Choice |
|---|---|
| Database | PostgreSQL |
| Cache | Redis |
| ORM | Prisma |
| Migrations | Prisma Migrate |
| Hosting | Managed PostgreSQL (cloud) |

---

# 3. Design Principles

- Normalized where it matters
- Denormalized for hot reads
- Soft deletes for recoverability
- Audit fields on critical tables
- Time-based fields stored in UTC
- Identifiers are UUIDs

---

# 4. Entity Overview

## Domains

Identity

Football Reference Data

Fantasy Gameplay

Competition

Content

Billing

System

---

# 5. Core Entities

## User

id, email, password_hash, username, display_name, country, language, favorite_club_id, avatar_url, bio, role, status, email_verified_at, created_at, updated_at, deleted_at

## Role

id, name, permissions

## Session

id, user_id, token_hash, device, platform, expires_at, created_at

---

# 6. Football Reference Data

## Club

id, name, short_name, city, stadium, crest_url, colors, status, created_at, updated_at

## Player

id, club_id, first_name, last_name, photo_url, position (GK/DEF/MID/FWD), nationality, date_of_birth, shirt_number, status, starting_price, current_price, previous_price, created_at, updated_at

## Player Price History

id, player_id, price, effective_at, reason

## Fixture

id, competition_id, gameweek_id, home_club_id, away_club_id, venue, kickoff_at, status, home_score, away_score, created_at, updated_at

## Match Event

id, fixture_id, minute, type (goal/assist/card/sub/save/etc.), player_id, detail, sequence, verified, created_at

## Competition

id, name, code, country, season_start, season_end, status

## Gameweek

id, competition_id, number, deadline_at, status, created_at

---

# 7. Fantasy Entities

## Fantasy Team

id, user_id, season_id, name, budget_remaining, formation, value, total_points, current_rank, created_at, updated_at

## Squad Slot

id, team_id, player_id, position (GK1/GK2/DEF1.../SUB1-4), is_captain, is_vice_captain, purchased_price, created_at, updated_at

## Gameweek Entry

id, team_id, gameweek_id, points, captain_id, vice_captain_id, transfers_made, penalty_points, status (draft/locked), locked_at

## Transfer

id, team_id, gameweek_id, player_out_id, player_in_id, cost (penalty), price_delta, created_at

## Gameweek Points

id, entry_id, player_id, fixture_id, base_points, bonus_points, deductions, total, source_event_id

## Price Change Event

id, player_id, gameweek_id, old_price, new_price, direction, created_at

---

# 8. League Entities

## League

id, name, code, type (private/public), owner_id, capacity, status, created_at

## League Member

id, league_id, user_id, joined_at, role (owner/member)

## League Invitation

id, league_id, user_id, token, status, expires_at, created_at

## League Announcement

id, league_id, author_id, content, created_at

## League Standing (Materialized)

id, league_id, user_id, gameweek_id, rank, total_points, gameweek_points, updated_at

---

# 9. Content Entities

## Article

id, title, slug, category, cover_image, status, author_id, published_at, created_at

## Article Translation

id, article_id, language, title, body, created_at

## Announcement (Global)

id, title, body, target (all/premium/league), status, published_at, created_at

---

# 10. Billing Entities

## Subscription

id, user_id, provider (google/apple), product_id, status, current_period_end, expires_at, created_at, updated_at

## Receipt

id, subscription_id, provider, provider_receipt, verified, created_at

---

# 11. Notifications & System

## Notification

id, user_id, type, title, body, data, deep_link, read_at, created_at

## Notification Preference

id, user_id, category, channel, enabled

## Audit Log

id, actor_id, action, entity_type, entity_id, before, after, created_at

## Achievement

id, user_id, achievement_code, tier, unlocked_at

## Feature Flag

id, name, enabled, updated_by, updated_at

---

# 12. Relationships

- User 1—N Session
- User 1—1 Fantasy Team (per season)
- Club 1—N Player
- Fixture N—1 Gameweek
- Gameweek N—1 Competition
- Fantasy Team 1—N Squad Slot
- Fantasy Team 1—N Gameweek Entry
- League 1—N League Member
- User N—M League (through League Member)
- Player 1—N Player Price History

---

# 13. Indexing Strategy

## Hot Queries

- Players by club and position
- Fixtures by gameweek
- Fantasy team by user and season
- League standings by league and gameweek
- Match events by fixture

## Composite Indexes

- (gameweek_id, status) on Fixture
- (user_id, season_id) on Fantasy Team
- (league_id, gameweek_id) on League Standing
- (player_id, gameweek_id) on Gameweek Points

---

# 14. Data Retention

## Time-Based

- Sessions: 30 days after expiry
- Analytics: 12 months
- Audit logs: minimum 2 seasons
- Deleted usernames: reserved 180 days

## Legal

- User data per privacy policy
- Deleted accounts anonymized

---

# 15. Migrations

- Versioned via Prisma
- Forward-only in production
- Backward-compatible steps
- Reviewed before apply

---

# 16. Backups

- Daily automated backups
- Point-in-time recovery enabled
- Off-site storage
- Restore tested quarterly

---

# 17. Performance

- Read replicas for reporting
- Slow query monitoring
- Connection pooling
- Query timeout policies

---

# 18. Acceptance Criteria

✓ All entities modeled.

✓ Relationships are consistent.

✓ Hot queries are indexed.

✓ Migrations are versioned.

✓ Backups run and restore.

✓ Retention policies are enforced.

---

# Dependencies

• Backend

• API Specification

• PRD