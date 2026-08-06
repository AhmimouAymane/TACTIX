# Fantasy Engine

> Product: TACTIX
> Version: 1.0
> Document Type: Game Rules
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Engine Overview
3. Engine Principles
4. Fantasy Season
5. Fantasy Team
6. Starting Budget
7. Player Prices
8. Squad Validation
9. Starting XI & Bench
10. Bench Order
11. Formations
12. Captain
13. Vice Captain
14. Deadline
15. Match Day Behaviour
16. Auto-Substitution
17. Match Cancellation & Postponement
18. Double Gameweeks
19. Blank Gameweeks
20. Live Ranking
21. Tie Breakers
22. Data Corrections
23. Audit Log
24. Concurrency & Deadline Race
25. Performance
26. Edge Cases
27. Acceptance Criteria

---

# 1. Objective

The Fantasy Engine is the core gameplay system of TACTIX.

It governs every seasonal fantasy event: building a squad, managing a budget, selecting a captain, locking lineups at the deadline, and resolving points for each gameweek.

---

# 2. Engine Overview

## Key Numbers

Starting Budget

100.0 Fantasy Credits

Squad Size

15 players

Starting XI

11 players

Bench

4 players

Max Players Per Club

3

Free Transfers

1 per gameweek (2 maximum carried)

Extra Transfer Cost

-4 points

---

## Engine Flow

Season Setup

↓

Gameweek Deadline

↓

Lock Squad

↓

Process Matches

↓

Calculate Points

↓

Apply Auto-Substitutions

↓

Finalize Gameweek

↓

Update Rankings

↓

Process Price Changes

---

# 3. Engine Principles

- The engine applies the same rules to every manager
- Every action is validated before it is persisted
- Deadline rules are absolute and time-based
- Points are always traceable to official data
- Corrections produce predictable recalculations
- The engine is the single source of truth for fantasy scoring

---

# 4. Fantasy Season

## Season Structure

A TACTIX season mirrors Botola Pro Inwi.

Botola Pro Inwi consists of 30 matchdays (gameweeks).

## Season Setup

The admin configures:

- Season start and end dates
- Gameweek deadlines
- Starting budget
- Scoring configuration
- Pricing engine configuration

## Season Phases

Pre-season

↓

Regular season (gameweeks)

↓

Season finale

---

# 5. Fantasy Team

## Squad Size

Every manager owns exactly one fantasy squad of 15 players.

## Squad Composition

| Position | Count |
|---|---|
| Goalkeepers | 2 |
| Defenders | 5 |
| Midfielders | 5 |
| Forwards | 3 |

Total: 15

## Player Ownership

Squads hold real Botola Pro players.

A player may appear in many squads.

## One Squad Per Account

A manager has one active squad per season.

## Club Limits

Maximum 3 players from the same real club.

---

# 6. Starting Budget

## Budget Value

Every manager starts with:

100.0 Fantasy Credits

## Budget Rules

- Budget cannot become negative
- Player prices update over the season
- Remaining budget carries over between gameweeks
- Budget is displayed in all team editors

## Budget Constraints

A manager cannot:

- Spend more than the available budget
- Save a squad that exceeds the budget

A squad cannot be saved unless the budget is balanced.

---

# 7. Player Prices

## Player Value

Every player has:

- Current price
- Starting price
- Previous price

## Price Range

Prices are set by the Player Pricing Engine (see Pricing document).

## Price Configuration

- Starting prices are configured pre-season
- In-season prices update weekly

---

# 8. Squad Validation

Before saving, the squad must satisfy every rule:

- Exactly 15 players
- 2 GK, 5 DEF, 5 MID, 3 FWD
- Max 3 players per club
- Valid formation
- Budget within 100.0 Fantasy Credits
- Valid starting lineup with a valid formation
- Captain and vice-captain set

---

# 9. Starting XI & Bench

## Starting XI

Fixed 11-player formation.

## Bench

Exactly 4 players.

Required bench composition:

Goalkeeper

Player 1

Player 2

Player 3

## Bench Order

Bench players occupy positions 12-15 in order.

---

# 10. Bench Order

## Format

Position 12

Substitute Goalkeeper

Position 13

First substitute (any position)

Position 14

Second substitute (any position)

Position 15

Third substitute (any position)

## Substitution Behaviour

Auto-substitutions are processed by the rules engine (see Auto-Substitution).

---

# 11. Formations

## Allowed Formations

3-4-3

3-5-2

4-4-2

4-3-3

4-5-1

5-3-2

5-4-1

## Formation Requirements

- Exactly 1 goalkeeper
- Minimum 3 defenders
- Maximum 5 defenders
- Minimum 2 midfielders
- Maximum 5 midfielders
- Minimum 1 forward
- Maximum 3 forwards

## Formation Validation

Any lineup that does not match an allowed formation cannot be locked.

---

# 12. Captain

## Selection Rules

- Captain is selected from the starting XI
- Captain's points are doubled
- Captain can be changed until the deadline

## Captain Points

The captain's double multiplier is applied after all points are calculated.

The captain selection does not affect:

- Other players in the squad
- Bench players
- League standings beyond the point total

---

# 13. Vice Captain

## Selection

Vice-captain is selected from the starting XI or the bench.

## Activation

The vice-captain scores double only if the captain scores 0 minutes.

## Rule

Once activated, the vice-captain receives the double for the entire gameweek.

---

# 14. Deadline

## Definition

The gameweek deadline is the last moment a manager can edit the squad.

## Before the Deadline

- Squad editable
- Transfers allowed
- Captain changeable
- Formation changeable
- Bench changeable

## At the Deadline

- Squad locks
- No transfers allowed
- Captain locked
- Bench locked
- Formation locked

## Deadline Configuration

The default deadline is 1 hour before the first match of the gameweek.

Admins can configure the deadline to match real kickoff times.

---

# 15. Match Day Behaviour

## During Matches

- Players in the starting XI earn points from their fixtures
- Bench players do not earn points until auto-substituted
- Live points stream for the manager

## Point Processing

- Points are applied to the starting XI as events arrive
- Points for auto-substituted bench players are applied after matches

## Late Substitutions

Players entering at any minute produce points for the minutes played.

---

# 16. Auto-Substitution

The engine substitutes the best bench player when a starting player does not play.

## Trigger

A starting player is considered "did not play" when:

- 0 minutes played
- Not in the confirmed lineup
- Match cancelled without replay

## Selection Criteria

Auto-substitution follows bench order:

1. Goalkeeper auto-substitutes for a missing goalkeeper
2. First substitute for the first missing outfield player
3. Second substitute for the second missing outfield player
4. Third substitute for the third missing outfield player

## Restrictions

- Auto-subs respect formation limits
- Auto-subs never change the captain
- If no valid substitution exists, the position remains empty

## Default Behaviour

Auto-substitution is always enabled for regular gameweeks.

---

# 17. Match Cancellation & Postponement

When a fixture is cancelled or postponed:

- No points are awarded for that fixture
- Players in the postponed fixture are not auto-substituted
- The squad remains valid
- The fixture is marked postponed
- Players in the postponed fixture can play in the next gameweek

## Post-Lineup Cancellation

If a match is cancelled after lineups are released, no points are awarded.

---

# 18. Double Gameweeks

A double gameweek occurs when a club plays twice in one gameweek.

## Rules

- Player points count for both matches
- Captain double applies to the gameweek total
- Transfers close at the same deadline

---

# 19. Blank Gameweeks

A blank gameweek has fewer scheduled fixtures (e.g. due to cup competitions).

## Rules

- All managers are affected equally
- No special scoring adjustments
- Auto-substitution applies normally

---

# 20. Live Ranking

## Ranking Basis

Manager rankings are based on total fantasy points.

## Properties

- Rankings update per event
- Rankings reflect all managers across the platform

---

# 21. Tie Breakers

## Overall Ranking

When managers tie, rank in this order:

1. Fewest transfers made
2. Random draw (deterministic, logged)

## League Ranking

League tie-breaking follows the League System document.

---

# 22. Data Corrections

## Principle

Only administrators may correct official match data.

## Process

1. Error detected

2. Administrative correction

3. Engine recalculates affected points

4. Squads, leagues, and rankings updated

5. Affected managers notified

## Audit

Corrections are recorded in the audit log.

---

# 23. Audit Log

Every state change in the engine is recorded:

- Who performed the action
- What changed
- When it happened
- Resulting state

Retention: minimum 2 seasons.

---

# 24. Concurrency & Deadline Race

## Atomic Operations

- Transfer confirmations are atomic
- Squad saves at deadline are atomic
- No double-processing of requests

## Deadline Race

- The first persisted valid action wins
- Requests are accepted strictly by arrival order

---

# 25. Performance

- Deadline processing completes for all squads within 5 minutes at 15,000 MAU
- Point calculation scales with squads x players, with caching
- Real-time points update per live event

---

# 26. Edge Cases

- Player plays for two clubs in a season
- Double gameweek with a postponed match
- Full-time reached with no lineup released
- Two gameweeks merged due to a national break
- Player transferred after the deadline lock

---

# 27. Acceptance Criteria

- All squad validations pass before locking
- Budget never goes negative
- Captain and vice-captain multipliers apply correctly
- Auto-subs follow bench order
- Formation validation is enforced
- Deadline race resolves fairly
- Double and blank gameweeks are counted correctly
- Data corrections trigger a full recalculation
- All state changes are audited

---

# Dependencies

• Scoring System

• Transfer module

• League System

• Gameweek engine

• Live data provider

• Player Pricing Engine