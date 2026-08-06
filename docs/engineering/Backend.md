# Backend

> Product: TACTIX
> Version: 1.0
> Document Type: System Architecture
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Technology Stack
3. Architecture Overview
4. Service Modules
5. Module Design
6. Real-Time Architecture
7. Data Layer
8. Caching
9. Background Jobs
10. Integration Layer
11. Observability
12. Admin Dashboard
13. Content Management
14. Deployment Notes
15. Performance
16. Acceptance Criteria

---

# 1. Objective

The Backend powers all TACTIX functionality: authentication, fantasy engine, live scoring, leagues, transfers, notifications, and administration.

This document defines the proposed backend architecture.

---

# 2. Technology Stack

| Component | Technology |
|---|---|
| Language | TypeScript (Node.js) |
| Framework | NestJS |
| Database | PostgreSQL |
| Cache / Real-Time | Redis |
| Real-Time Transport | WebSocket (Socket.IO) |
| Job Queue | BullMQ (Redis) |
| API Style | REST + WebSocket |
| ORM | Prisma |
| Testing | Jest |
| Container | Docker |

This stack is a proposal and may be adjusted.

---

# 3. Architecture Overview

## Monolithic Modular Backend

TACTIX uses a modular monolith.

Modules communicate internally.

Deployment: single deployable service (scalable horizontally).

## Why Modular Monolith

- Faster iteration
- Simpler operations
- Database transactions across modules
- Clear boundaries for future extraction

---

# 4. Service Modules

## Core Modules

Auth

Users

Profiles

Clubs

Players

Fixtures

Gameweeks

Fantasy Teams

Transfers

Scoring

Leagues

Rankings

Match Center

News

Notifications

Search

Achievements

Premium

Admin

Analytics

---

# 5. Module Design

Each module is self-contained:

- Controller (HTTP)
- Service (business logic)
- Repository (data access)
- DTOs (validation)
- Events (integration)

## Dependencies

Modules depend on interfaces, not implementations.

---

# 6. Real-Time Architecture

## Transport

WebSocket gateway for:

- Live scores
- Match events
- Fantasy point updates
- Ranking changes

## Channels

Match channel

Gameweek channel

Manager channel

League channel

## Reconnect

Reconnection with exponential backoff.

## Fallback

REST polling fallback.

---

# 7. Data Layer

## PostgreSQL

- Primary relational store
- Migrations via Prisma
- Read replicas for scaling

## Redis

- Session cache
- Live score cache
- Rate limiting
- Job queue
- WebSocket presence

---

# 8. Caching

## Cache Levels

- CDN for public data (players, clubs, fixtures)
- Redis for hot data (scores, prices)
- Application cache for computation

## Cache Invalidation

Event-driven invalidation.

---

# 9. Background Jobs

## Job Types

- Gameweek finalization
- Price change processing
- Bonus point calculation
- Notification dispatch
- Analytics aggregation
- Data provider sync

## Queue

BullMQ with retries.

---

# 10. Integration Layer

## Data Provider

- Scheduled sync jobs
- WebSocket live events (where available)
- Manual override via Admin

## Push Providers

- FCM (Android)
- APNs (iOS)

## Analytics

- Event pipeline

---

# 11. Observability

## Logging

Structured JSON logs.

## Metrics

- API latency
- Error rates
- Queue depth
- WebSocket connections

## Tracing

Distributed tracing for critical flows.

## Alerting

Threshold-based alerts.

---

# 12. Admin Dashboard

## Platform

Web application.

## Stack

React-based admin frontend (or NestJS-served SPA).

## Features

User management

Club management

Player management

Fixture management

Statistics correction

Content management

League moderation

Data sync control

Feature flags

Maintenance mode

Audit log viewer

---

## Correction Workflow

1. Admin edits official data

2. System logs the change

3. Points recalculate

4. Notifications sent

---

# 13. Content Management

## Content Types

News articles

Announcements

Sponsored content

Banners

## Workflow

Draft

Review

Schedule

Publish

Archive

## Localization

Content supports Arabic, French, English.

---

# 14. Deployment Notes

## Containerized

Docker images.

## Orchestration

Docker Compose (development).

Kubernetes (production, future).

## Environments

Development

Staging

Production

---

# 15. Performance

## API Targets

Average response: under 250 ms

p95: under 500 ms

## Real-Time Targets

Event delivery: under 5 seconds

---

# 16. Acceptance Criteria

✓ All modules are implemented.

✓ Live data streams over WebSocket.

✓ Background jobs process reliably.

✓ Admin dashboard covers operational tasks.

✓ Corrections trigger recalculation.

✓ Observability is in place.

---

# Dependencies

• PRD

• Database Design

• API Specification

• Security

• Deployment