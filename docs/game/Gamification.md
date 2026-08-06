# Gamification

> Product: TACTIX
> Version: 1.0
> Document Type: Game Rules
> Status: Proposed
> Last Updated: August 2026

---

# Table of Contents

1. Objective
2. Principles
3. XP System
4. Levels
5. Achievements
6. Badges
7. Trophies
8. Streaks
9. Weekly Awards
10. Season Rewards
11. Social Features
12. Fair Play
13. Analytics
14. Edge Cases
15. Acceptance Criteria

---

# 1. Objective

Gamification deepens engagement through achievements, badges, streaks, and rewards that recognize manager skill, dedication, and consistency.

It rewards football knowledge and activity without affecting game fairness.

---

# 2. Principles

- Rewards are cosmetic or social
- Gamification never influences fantasy points
- Nothing is purchasable
- No pay-to-win mechanics
- All rules apply equally

---

# 3. XP System

## Sources

Managers earn XP for:

- Completing onboarding
- Creating a team
- Making transfers
- Selecting a captain
- Joining leagues
- Inviting friends
- Reaching weekly point milestones
- Completing achievements

## XP Limits

XP per action is capped.

XP is not time-limited.

---

# 4. Levels

## Level Curve

Levels unlock through cumulative XP.

## Level Titles

Levels provide:

- Level number
- Title
- Cosmetic badge frame

## No Gameplay Advantage

Levels never affect:

- Points
- Rankings
- Transfers
- Budget

---

# 5. Achievements

## Categories

Onboarding

Weekly

Seasonal

Social

Statistics

Streaks

## Tiers

Bronze

Silver

Gold

Platinum

## Definition

Each achievement has:

- ID
- Name
- Description
- Category
- Tier
- Icon
- Unlock condition
- Progress tracking
- Reward

---

# 6. Badges

## Types

Achievement badges

Season badges

Special event badges

League champion badges

## Display

Badges appear on:

- User profile
- League member lists
- Leaderboards
- Shared result cards

---

# 7. Trophies

Major milestone rewards.

Examples:

- Season league winner
- Global top 100 finish
- Highest single-gameweek score
- Perfect gameweek (11/11 starters played)

---

# 8. Streaks

## Weekly Streak

Tracked by consecutive active gameweeks.

Active means:

- Squad valid and locked
- At least 1 point earned

## Reset

The streak resets when:

- A gameweek is missed without a valid squad
- The team is deleted

## Rewards

Cosmetic streak badges at:

- 3 consecutive gameweeks
- 10 consecutive gameweeks
- 20 consecutive gameweeks
- Full season

---

# 9. Weekly Awards

## Categories

Top weekly scorer

Highest rank climb

Best captain choice

Most valuable transfer

## Timing

Computed after gameweek finalization.

## Display

Profile

League dashboards

Competition Center

---

# 10. Season Rewards

End-of-season recognition:

- Champion trophy
- Top-3 podium badges
- Top-10 season badges
- Participation badges
- Best manager categories

---

# 11. Social Features

- Share achievements
- Share weekly results
- League leaderboards
- Friend comparison
- Invite referral rewards

---

# 12. Fair Play

## Anti-Cheat

- No point manipulation
- No account sharing for rewards
- No fraudulent referrals

## Detection

Automated flags and manual review.

## Penalties

Revocation of rewards

Temporary suspension

Permanent ban (severe)

---

# 13. Analytics

Tracked:

- Achievement unlock rates
- Streak retention impact
- Level distribution
- Award engagement

---

# 14. Edge Cases

- Achievement unlocked twice
- Streak broken by postponed gameweek
- Award revoked after correction
- Referral abuse

---

# 15. Acceptance Criteria

✓ XP accrues correctly.

✓ Levels unlock and display.

✓ Achievements notify on unlock.

✓ Badges display everywhere defined.

✓ Streaks track and reset correctly.

✓ Weekly awards compute after finalization.

✓ No gamification affects points or rankings.

✓ Admins can review and revoke rewards.

---

# Dependencies

• Fantasy Engine

• Scoring System

• League System

• Profiles

• Notification service

• Analytics module