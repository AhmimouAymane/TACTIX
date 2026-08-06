# Coding Standards

> Product: TACTIX
> Version: 1.0
> Document Type: Coding Standards
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. General Principles
3. Language & Formatting
4. Naming
5. Backend (NestJS)
6. Mobile (Flutter)
7. API Contracts
8. Error Handling
9. Validation
10. Testing
11. Documentation
12. Security
13. Git Workflow
14. Code Review
15. Acceptance Criteria

---

# 1. Objective

The Coding Standards define how TACTIX code is written, reviewed, and maintained.

---

# 2. General Principles

- Readable over clever
- Consistent over clever
- Small, focused units
- Server is source of truth for rules
- Never commit secrets

---

# 3. Language & Formatting

- TypeScript: strict mode
- Dart: lints package
- Formatters: prettier (TS), dart format
- Line width: 100

---

# 4. Naming

## TypeScript

- Classes/PascalCase
- Functions/camelCase
- Constants/SCREAMING_SNAKE
- Files/kebab-case

## Dart

- Classes/PascalCase
- Functions/variables camelCase
- Files/snake_case
- Widgets/PascalCase

---

# 5. Backend (NestJS)

## Module Pattern

- One module per domain
- Controller thin, service holds logic
- DTO validation everywhere

## Data Access

- Prisma only, no raw SQL
- Repositories encapsulate queries

## Rules

- All money in MAD integers or fixed-decimal
- All times UTC in storage
- Business rules server-side only

---

# 6. Mobile (Flutter)

## Structure

- Feature-first dirs
- State via Riverpod
- No business logic in widgets

## Rules

- Server validates budgets, deadlines, limits
- Never trust client clock for deadlines
- Localization via l10n

---

# 7. API Contracts

- snake_case payloads
- Consistent error shape
- Versioned endpoints
- DTO = contract, documented

---

# 8. Error Handling

- Domain errors with codes
- Map to HTTP statuses
- Log with context
- Client shows localized messages

---

# 9. Validation

## Backend

- class-validator DTOs
- Business validation in services
- Race conditions handled (deadline, transfer)

## Mobile

- Format validation only
- Show server errors clearly

---

# 10. Testing

## Backend

- Unit: services
- Integration: API
- Factories for test data

## Mobile

- Unit: logic/pure functions
- Widget tests: key screens

## Rule

- Fix = test first, then fix

---

# 11. Documentation

- Update docs when behavior changes
- Comments explain why, not what
- DTO changes mirrored in API.md

---

# 12. Security

- Validate all inputs
- Never log PII or tokens
- Server-enforce all rules
- Review dependencies

---

# 13. Git Workflow

- Conventional commits (feat, fix, docs)
- Small PRs
- Branch per task
- Rebase before merge
- Review required on main

---

# 14. Code Review

- Check correctness over style
- Verify tests cover change
- Check docs impact
- No secrets or smells

---

# 15. Acceptance Criteria

✓ Code is formatted and linted.

✓ Strict types enforced.

✓ Business rules are server-side.

✓ Tests cover changes.

✓ Docs stay in sync.

✓ No secrets in repo.

---

# Dependencies

• AI Agent Guide

• Project Structure

• Backend

• Flutter