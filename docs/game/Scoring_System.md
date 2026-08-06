# Scoring System

> Product: TACTIX
> Version: 1.0
> Document Type: Game Rules
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Scoring System Architecture
3. Base Points
4. Goal Contributions
5. Distribution of Points by Position
6. Clean Sheets
7. Save Points
8. Penalty Saves
9. Penalty Misses
10. Bonus Points
11. Captain Multiplier
12. Deduction Rules
13. Own Goals
14. Minimum Points
15. Live Scoring
16. Post-Match Finalization
17. Data Corrections
18. Scoring Examples
19. Botola Context Adjustments
20. Consistency Rules
21. Edge Cases
22. Acceptance Criteria

---

# 1. Objective

The Scoring System defines how managers and players earn TACTIX points during Botola Pro Inwi matches.

Every point awarded comes from official, verified match events.

The system is transparent, consistent, and fair for all managers.

---

# 2. Scoring System Architecture

The scoring system is a single source of truth for player fantasy points.

## Core Components

Base Points

Event Points

Bonus Points

Deductions

Captain & Vice Captain Multipliers

---

## Point Flow

Match Event

↓

Validation

↓

Point Calculation

↓

Squad Assignment

↓

Gameweek Finalization

---

## Scoring Principles

- Every point is traceable to an official event
- No hidden calculations
- Rules apply equally to all players
- Points are final after verification
- Corrections require an administrator

---

# 3. Base Points

## Base Structure

The base point structure is position-based and mirrors proven fantasy football models while being calibrated for Botola Pro.

| Position | Base for Playing | Base for 60+ Minutes | Base for 90 Minutes |
|---|---|---|---|
| Goalkeeper (GK) | 1 pt | 0 extra | 0 extra |
| Defender (DEF) | 1 pt | 1 extra | 2 extra |
| Midfielder (MID) | 1 pt | 1 extra | 2 extra |
| Forward (FWD) | 1 pt | 1 extra | 2 extra |

---

## Playing Definition

A player is counted as playing when they appear in the starting lineup or enter as a substitute.

## 60+ Minute Rule

A player earns the minutes bonus when appearing at or after:

60 minutes (60th minute) of match time.

---

# 4. Goal Contributions

## Goals Scoring Points

| Action | Points |
|---|---|
| Goal by a Goalkeeper or Defender | 8 |
| Goal by a Midfielder | 5 |
| Goal by a Forward | 4 |

---

## Assists

| Action | Points |
|---|---|
| Assist | 3 |

---

## Own Goals

-2 points

Negative score applied (see Deductions).

---

# 5. Distribution by Position

A player's goals are signed by position for maximum clarity and transparency.

The point value for the same event differs by whether it was a Goalkeeper, Defender, Midfielder, or Forward.

| Event | GK | DEF | MID | FWD |
|---|---|---|---|---|
| Goal | 8 | 8 | 5 | 4 |
| Assist | 3 | 3 | 3 | 3 |
| Clean Sheet | 4 | 4 | 1 | 0 |
| Penalty Save | 2 | 0 | 0 | 0 |
| Penalty Miss | -2 | -2 | -2 | -2 |
| Yellow Card | -1 | -1 | -1 | -1 |
| Red Card | -3 | -3 | -3 | -3 |
| Own Goal | -2 | -2 | -2 | -2 |

---

# 6. Clean Sheets

A clean sheet is awarded when a player's team concedes zero goals.

## Clean Sheet Value

| Position | Points |
|---|---|
| Goalkeeper | 4 |
| Defender | 4 |
| Midfielder | 1 |
| Forward | 0 |

## Requirements

- Fielded player must have appeared for at least 60 minutes.
- Clean sheet applies to the player's real team, not the fantasy team.

---

# 7. Penalty Saves

A goalkeeper earns extra points for saving a penalty kick.

## Points

+2 points

## Condition

A penalty kick saved by the goalkeeper during normal open play or extra time.

Penalty saves in a shootout do not award save points.

(Finalization rules apply after verification.)

---

# 8. Penalty Miss

A player who misses a penalty (shot onto the post, over, or saved) receives a deduction.

## Points

-2 points

---

# 9. Bonus Points

Bonus Points are awarded to the best-performing players in each match.

## Allocation Table

| Ranking | Description | Points |
|---|---|---|
| 1st | Best player | 3 |
| 2nd | Runner-up | 2 |
| 3rd | Third best | 1 |

Bonus points are calculated from a performance index using official match statistics, including:

- Goals
- Assists
- Saves
- Key Passes
- Tackles
- Dribbling
- Pass Accuracy

Bonus points are awarded after official verification.

---

# 10. Captain and Vice Captain

## Captain

The captain's points are doubled.

Captain Points = Player's Base Points x 2

---

## Vice Captain

If the captain scores 0 minutes:

Vice captain's points are doubled instead.

---

## Rule

The multiplier is applied after all deductions.

---

# 11. Deductions

## Yellow Card

-1 point

## Red Card

-3 points

## Own Goal

-2 points

## Penalty Miss

-2 points

---

## Missing Rules

A player sent off:

- Points before the red card are kept.
- No additional playing minutes bonus.

---

# 12. Point Tables Summary

| Event | GK | DEF | MID | FWD |
|---|---|---|---|---|
| Appearance (any) | +1 | +1 | +1 | +1 |
| 60+ Minutes | +1 | +1 | +1 | +1 |
| Goal | +8 | +8 | +5 | +4 |
| Assist | +3 | +3 | +3 | +3 |
| Clean Sheet | +4 | +4 | +1 | 0 |
| Penalty Save | +2 | 0 | 0 | 0 |
| Penalty Miss | -2 | -2 | -2 | -2 |
| Yellow Card | -1 | -1 | -1 | -1 |
| Red Card | -3 | -3 | -3 | -3 |
| Own Goal | -2 | -2 | -2 | -2 |

---

# 13. Own Goals

An own goal is scored by a player for their opponent.

## Scoring

-2 points

No goal contribution points are awarded.

---

# 14. Minimum Points

## Floor

A player that does not play earns 0 points for the gameweek.

A player who plays may score negative points due to deductions.

Min Score Floor: 0

Applies to non-playing players only.

---

## Minimum Week

A player that does not play earns:

- No appearance points
- No minute points

This is a 0 contribution to the fantasy team.

---

# 15. Live Scoring

## Update Behavior

Points are recalculated in real time as official events arrive.

- Goals
- Assists
- Cards
- Substitutions

---

## Live Source

Official data feed subscribed to the Real-Time Engine.

---

## Point Statuses

Live points are non-final.

Final points are confirmed at Full-Time.

---

# 16. Post-Match Finalization

After the final whistle:

1. Match verified by the data team.

2. Bonus points calculated.

3. Clean sheet points verified.

4. Final points locked for the match.

---

## Verification Window

Full-time data must be available.

Any correction is processed through the correction workflow.

---

# 17. Data Correction

## Trigger

Only administrators may edit official player statistics.

## Process

Corrections trigger a full recalc of affected squads, leagues, and rankings.

## Notifications

Affected managers receive a notification.

---

# 18. Scoring Examples

## Example 1

Player: Forward (FWD)

Situation:

Plays 60 minutes, scores 1 goal, 1 assist.

Calculation:

+1 appearance

+1 minutes

+4 goal

+3 assist

Total: 9

---

## Example 2

Player: Defender (DEF)

Situation:

Plays 90 minutes, clean sheet, 1 goal.

Calculation:

+1 appearance

+1 minutes

+4 clean sheet

+8 goal

Total: 14

---

## Example 3

Player: Midfielder (MID)

Situation:

Plays 90 minutes, 1 red card.

Calculation:

+1 appearance

+1 minutes

-3 red card

Total: -1

Note:

A negative match score is possible. Deductions apply after appearance and minutes bonuses.

---

## Example 4

Player: Forward (FWD)

Situation:

Plays 70 minutes, misses penalty.

Calculation:

+1 appearance

+1 minutes

-2 penalty miss

Total: 0

---

# 19. Botola Context Adjustments

## Scoring Calibration

Botola Pro Inwi matches generally feature fewer goals than major European leagues.

To keep defensive and offensive value balanced, TACTIX adjusts scoring weight.

Adjustments are evaluated each season.

---

## Adjustable Parameters

- Goal points by position
- Clean sheet value
- Bonus points threshold
- Points floor

Adjustments are applied at season boundary only.

---

# 20. Consistency Rules

The scoring engine is shared across:

- Game rules
- Local leagues
- Global rankings
- Player statistics

No manager receives special points.

---

# 21. Edge Cases

## Own Goal after a shot

- 'Goalkeeper' is awarded no goal.
- A player is awarded as relevant.

## Penalty shootout

- Penalty saves in shootout do not award save points.
- Penalty miss in a shootout does not deduct points.

## Match Abandoned

- No points awarded before verification.
- Match is reviewed by administrator.

## Player Sent Off in Extra Time

- Points for playing time counted until red card.

## Substitute Appears Late

- Substitute plays fewer than 60 minutes: only Appearance points apply.

---

# 22. Acceptance Criteria

✓ Base points are awarded correctly per position.

✓ Goals and assists count as defined.

✓ Clean sheets computed correctly.

✓ Bonus points are computed from verified data.

✓ Captain's points are doubled correctly.

✓ Vice-captain activation works.

✓ Deductions apply in order.

✓ Live scoring updates in real time.

✓ Finalization occurs after verification.

✓ Corrections trigger recalculation.

✓ Every point is traceable to a source.

---

# Dependencies

• Real-Time Engine

• Player and match data

• Official data provider

• Fantasy Engine

• Gameweek engine