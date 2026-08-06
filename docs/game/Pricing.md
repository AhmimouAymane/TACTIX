# Pricing

> Product: TACTIX
> Version: 1.0
> Document Type: Player Pricing Engine
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Pricing Principles
3. Price Model
4. Price Bands
5. Initial Pricing
6. Price Changes
7. Price Change Frequency
8. Price Change Threshold
9. Price Caps
10. Price Rises
11. Price Falls
12. Ownership Impact
13. Selling Price
14. Team Value
15. Price History
16. Transparency
17. Edge Cases
18. Performance
19. Acceptance Criteria

---

# 1. Objective

The Player Pricing Engine determines every player's fantasy price throughout the season.

It balances player value against popularity, performance, and scarcity so that managers make meaningful selections.

---

# 2. Pricing Principles

- Prices are transparent
- Price changes are driven by data, not manual edits
- Prices adjust at most once per gameweek
- Prices have a floor and a ceiling
- Selling price is based on purchase price
- The engine never locks managers into negative value

---

# 3. Price Model

## Core Fields

Current Price

Starting Price

Previous Price

Price Change

---

## Price Range

Minimum price:

4.0 Fantasy Credits

Maximum price:

15.0 Fantasy Credits

---

# 4. Price Bands

Prices use 0.1 increments.

Example prices:

4.5

5.0

6.5

9.2

11.8

Prices are always displayed to one decimal.

---

# 5. Initial Pricing

## Pre-Season

Prices are set before the season.

## Pricing Inputs

- Club strength
- Position
- Expected points
- Historical performance
- Ownership forecast

---

# 6. Price Changes

## Trigger

Price changes react to market activity.

# 7. Price Change Frequency

- Changes are applied once per gameweek
- Between gameweek finalization and the next deadline

## Snapshot

The engine evaluates at a fixed weekly cutoff.

---

# 8. Price Change Rules

## Rises

A price rises when a player is transferred in more than a threshold.

## Drops

A price drops when a player is transferred out more than a threshold.

## Movement Cap

A single price can change by at most:

0.1 per cycle

## Limit

A player can rise or fall at most 1 increments per week of normal movement.

---

# 9. Price Caps

## Floor

A player's price cannot go below:

4.5 Fantasy Credits

## Ceiling

A player's price cannot exceed:

15.0 Fantasy Credits

---

# 10. Price Rises

## Condition

Net transfers in exceeds the threshold:

e.g. 10,000 owners (configurable per player popularity).

## Result

Price rises by 0.1.

Rise is capped at the ceiling.

---

# 11. Price Falls

## Condition

Net transfers out exceeds the threshold.

## Result

Price falls by 0.1.

Fall is capped at the floor.

---

# 12. Management Impact

## Popularity

The engine tracks:

- Total ownership count
- Net transfer movements
- Ownership percentage

## Transparency

Ownership is shown on player cards.

---

# 13. Selling Price

## Sale Value

When selling a player, the manager receives:

- The lower of (purchase price) or (current price)

Profit from rises is credited.

Loss from drops is not credited.

---

# 14. Team Value

## Definition

Team Value = sum of current player prices in the squad.

## Displayed

Shown in the My Team screen.

---

# 15. Transparency

## History

Player pages show:

- Price history chart
- Price trend

## Notifications

Managers are notified on:

- Price rise
- Price drop

---

# 16. Edge Cases

- Two managers cross the same player at the deadline
- Price changes conflict with a transfer
- Player transferred club mid-season
- Price of leader/suspended players
- Season reset

---

# 17. Performance

- Daily price recalculation completes in under 60 minutes
- Ownership aggregation is batched

---

# 18. Acceptance Criteria

✓ Prices initialized pre-season.

✓ Changes move in 0.1 steps.

✓ Rises and falls follow thresholds.

✓ Price caps (floor/ceiling) enforced.

✓ Selling price uses the lower of purchase/current.

✓ Ownership and price history display.

✓ Notifications fire for changes.

---

# Dependencies

• Fantasy Engine

• Transfer module

• Analytics module