# AI Agent Guide

> Product: TACTIX
> Version: 1.0
> Document Type: AI Agent Guide
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Working with AI Agents
3. Repo Structure for Agents
4. Key Files
5. Read Before Coding
6. File Conventions
7. Test Conventions
8. Prohibited Actions
9. Common Tasks
10. Quality Bar
11. Communication Rules
12. Acceptance Criteria

---

# 1. Objective

This guide defines how AI coding agents work on TACTIX.

---

# 2. Working with AI Agents

- Agents read docs first
- Agents follow existing patterns
- Agents ask when ambiguous
- Agents never invent data
- Agents keep docs in sync

---

# 3. Repo Structure for Agents

Expected layout:

- docs/ — all documentation
- src/ — application code
- tests/ — test suite
- prisma/ — schema and migrations
- .github/ — CI workflows

---

# 4. Key Files

- docs/product/PRD.md — product truth
- docs/engineering/API.md — API contract
- docs/engineering/Database.md — schema truth
- docs/game/*.md — game rules
- docs/design/Design_System.md — UI tokens
- AGENTS.md — agent rules

---

# 5. Read Before Coding

Before changing behavior:

- Read the PRD section that covers the feature
- Read the relevant game doc (scoring, transfers, pricing)
- Read the API spec for the endpoint
- Read the Database doc for entities
- Check tests for expected behavior

---

# 6. File Conventions

- One concern per module
- Follow NestJS module structure
- Follow Flutter feature structure
- Naming: kebab-case files, PascalCase classes

---

# 7. Test Conventions

- Tests live next to code (or tests/ mirror)
- Name: describes expected behavior
- Unit over integration by default
- Must pass before merge

---

# 8. Prohibited Actions

- Never add rules that contradict PRD
- Never change scoring values without approval
- Never invent prices or players
- Never commit secrets
- Never skip lint or tests
- Never reorder or duplicate docs

---

# 9. Common Tasks

## Adding an Endpoint

1. DTO → controller → service → repository
2. Add tests
3. Update API.md
4. Verify against PRD

## Fixing a Bug

1. Reproduce with test
2. Fix minimal code
3. Verify

## Changing Scoring

1. Read Scoring_System.md
2. Change in one place
3. Update doc + tests
4. Flag change for review

---

# 10. Quality Bar

- Passes typecheck
- Passes lint
- Tests green
- No dead code
- Docs updated where relevant

---

# 11. Communication Rules

- Summarize what changed
- Note any doc updates
- Flag assumptions made
- Ask before big changes

---

# 12. Acceptance Criteria

✓ Agent reads relevant docs first.

✓ Changes match PRD rules.

✓ Tests and lint pass.

✓ Docs stay in sync.

✓ No secrets exposed.

---

# Dependencies

• Project Structure

• Coding Standards

• PRD