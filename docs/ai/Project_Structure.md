# Project Structure

> Product: TACTIX
> Version: 1.0
> Document Type: Repository Structure
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Repository Layout
3. Monorepo Branches
4. Backend Structure
5. Flutter Structure
6. Tests Layout
7. Configuration Files
8. Environment Files
9. Docker & CI
10. Docs Layout
11. Naming Conventions
12. Evolution Rules
13. Acceptance Criteria

---

# 1. Objective

Defines the canonical repository layout for TACTIX so AI agents and humans navigate consistently.

---

# 2. Repository Layout

Monorepo-style, per recommended structure:

```
tactix/
  backend/
  mobile/
  admin/
  docs/
  infra/
  .github/
  AGENTS.md
  README.md
```

---

# 3. Branches

- main — production
- develop — staging
- feature/* — work in progress
- fix/* — bug fixes
- hotfix/* — urgent releases

---

# 4. Backend Structure

```
backend/
  src/
    modules/
      auth/
      users/
      clubs/
      players/
      fixtures/
      gameweeks/
      teams/
      transfers/
      scoring/
      leagues/
      rankings/
      match-center/
      news/
      notifications/
      achievements/
      premium/
      admin/
    common/
      filters/
      guards/
      interceptors/
      pipes/
      dto/
      utils/
    app.module.ts
    main.ts
  prisma/
    schema.prisma
    migrations/
  test/
  Dockerfile
  package.json
```

---

# 5. Flutter Structure

```
mobile/
  lib/
    core/
      theme/
      routes/
      network/
      storage/
      widgets/
    features/
      auth/
      home/
      live/
      team/
      transfers/
      players/
      clubs/
      match/
      leagues/
      standings/
      news/
      premium/
      profile/
      settings/
    l10n/
    main.dart
  test/
  pubspec.yaml
```

---

# 6. Tests

- backend/test — Jest suites
- mobile/test — Flutter tests

Tests mirror module/feature structure.

---

# 7. Configuration

- .env.example per service
- env values via secrets store
- No secrets committed

---

# 8. Docker & CI

- Dockerfile per service
- docker-compose for local
- .github/workflows for CI/CD

---

# 9. Naming Conventions

- Classes: PascalCase
- Files and dirs: kebab-case
- Prisma models: PascalCase
- API routes: kebab-case
- Gameweek identifiers: numeric

---

# 10. Evolution Rules

- New features get their own module/feature dir
- Deprecated code is removed, not stacked
- Docs mirrored for any structural change

---

# 11. Acceptance Criteria

✓ Layout is standard.

✓ Agents navigate without ambiguity.

✓ Structure aligns with docs.

✓ Code scaffolding in place.

---

# Dependencies

• Coding Standards

• Backend

• Flutter