# Transfers

> Product: TACTIX
> Version: 1.0
> Document Type: Game Rules
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Transfer Principles
3. Transfer Allowance
4. Free Transfers
5. Extra Transfers
6. Transfer Window
7. Transfer Flow
8. Budget Handling
9. Position Handling
10. Club Limit Handling
11. Validation Rules
12. Confirmation Flow
13. Deadlines
14. Wildcard (Future)
15. Transfer Pricing
16. Team Value
17. Reversing Transfers
18. Edge Cases
19. Error Handling
20. Analytics
21. Acceptance Criteria

---

# 1. Objective

The Transfers module governs how managers add and remove players from their fantasy squad.

It controls the free transfer allowance, extra transfer costs, budget handling, and validation of every squad change.

---

# 2. Transfer Principles

- Every transfer is validated against squad rules
- Budget must never go negative
- Club limits are always enforced
- Position requirements are always enforced
- Transfers lock at the deadline
- All changes are atomic

---

# 3. Transfer Allowance

## Per Gameweek

Each manager receives:

1 free transfer

per gameweek.

---

## Unused Transfers

Unused free transfers are carried over.

Maximum bank: 2 free transfers.

A manager starting the week with 2 free transfers can make 2 transfers without penalty.

---

# 4. Free Transfers

A free transfer costs 0 penalty points.

Example:

A manager with 1 free transfer removes a midfielder and replaces him with a defender.

Penalty: 0 points.

---

# 5. Extra Transfers

## Cost

Each transfer beyond the free allowance costs:

-4 points

applied to the current gameweek.

---

## Calculation

Gameweek penalty = (Transfers made - free allowance available) x -4

Example:

3 transfers made in a gameweek with 1 free transfer available.

Penalty = (3 - 1) x -4 = -8 points.

---

## Accounting Order

Penalties are applied:

- After all points
- Before gameweek finalization

---

# 6. Transfer Window

## Open

The window opens immediately after:

- Gameweek finalization
- Next gameweek becomes active

## Close

The window closes at the:

- Gameweek deadline

## No Late Transfers

No transfer is accepted after the deadline for the current gameweek.

---

# 7. Transfer Rules

## Squad Size

Every transfer must keep the squad at exactly 15 players.

## Entering/Leaving

A transfer removes exactly one player and adds exactly one player.

## Budget

The new player's price must fit within the available budget.

## Position

The new player must not break squad position requirements.

## Club Limit

The new player must not exceed 3 players from one club.

## Duplicate

A player already in the squad cannot be added again.

---

# 8. Budget Handling

## Budget Calculation

Remaining Budget = Current Budget + (Price of player out - Price of player in)

## Negative Budget

A transfer that would make the budget negative is rejected.

## Budget Display

Updated in the team editor in real time.

---

# 9. Position Handling

## Squad Structure

Goalkeepers: 2

Defenders: 5

Midfielders: 5

Forwards: 3

## Validation

A transfer cannot create an invalid position count.

---

# 10. Club Limit Handling

## Limit

Maximum 3 players from the same real club.

## Validation

A transfer cannot create a squad with 4 players from one club.

---

# 11. Validation Rules

| Rule | Behaviour |
|---|---|
| Budget exceeded | Transfer rejected |
| Position invalid | Transfer rejected |
| Club limit exceeded | Transfer rejected |
| Squad size invalid | Transfer rejected |
| Duplicate player | Transfer rejected |

---

# 12. Confirmation

## Confirmation Screen

Before applying the transfer, the manager confirms:

- Player out
- Player in
- Cost difference
- Penalty (if extra)
- Resulting budget

## Confirmation Timestamp

The confirmation timestamp is used for deadline checks.

---

# 13. Deadlock

## Two Actions at Once

Transfers and deadline race are resolved by:

- The first persisted valid action wins
- Server-side atomic guard

---

# 14. Wildcard (Future)

## Status

Not available in Version 1.

Considered for future release.

Defined here for architecture clarity.

## Concept

A wildcard would allow unlimited free transfers during one gameweek.

## Rules (Future)

- One per season
- Active before deadline
- Cannot be combined with another wildcard

---

# 15. Transfer Pricing

## Price Effects

A transfer uses player's current price.

Selling price is the player's purchase price, not current market price.

Profit from price rises is credited on sale.

Loss is not credited.

---

# 16. Team Value

## Definition

Team Value = Total current price of all players in squad.

## Display

Shown in My Team screen.

---

# 17. Reversing Transfers

## Rule

Transfers cannot be reverted after confirmation.

If a mistake occurs:

- Use a second transfer
- If hitting extra transfer penalty

---

# 18. Edge Cases

- Deadline reached during transfer
- Double transfer at deadline
- Player transferred for club move
- Player price change within transfer
- No free transfer available

---

# 19. Error Handling

## Common Errors

Rejected transfer shows a reason.

- Budget
- Position
- Club limit
- Duplicate
- Deadline passed
- Locked squad

---

# 20. Analytics

Tracked events:

- Transfer count
- Free vs paid
- Cost impact
- Abandoned transfers
- Transfer errors

---

# 21. Acceptance Criteria

✓ 1 free transfer per gameweek.

✓ 2 transfers max carried.

✓ Extra transfers cost -4.

✓ Budget enforced.

✓ Position, club and duplicate rules enforced.

✓ Deadline locks transfers.

✓ Transfers are atomic.

✓ Unused transfers are carried correctly.

---

# Dependencies

• Fantasy Engine

• Scoring System

• Player Pricing Engine

• Screens UI (My Team)

• Analytics module