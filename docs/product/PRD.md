# Product Requirements Document (PRD)

> Product: TACTIX
>
> Version: 1.0
>
> Document Owner: Product Team
>
> Status: Approved
>
> Last Updated: August 2026

---

# Table of Contents

1. Introduction
2. Product Overview
3. Vision
4. Mission
5. Business Objectives
6. Product Philosophy
7. Target Audience
8. Stakeholders
9. Product Scope
10. User Roles
11. Core Modules
12. Product Principles
13. MVP Definition
14. Product Success Metrics
15. Product Constraints
16. High-Level Feature List
17. Exit Criteria for Version 1
18. User Journey
19. Functional Requirements
20. Fantasy Engine
21. Navigation & Information Architecture
22. Home Module
23. My Team Module
24. League System
25. Competition Center & Rankings
26. Discover Module
27. Player Profile
28. Club Profile
29. Match Center
30. News & Content
31. TACTIX AI
32. Gamification
33. Premium
34. Profile & Settings
35. Notifications
36. Admin Requirements
37. Analytics
38. Error Handling & Edge Cases
39. Security & Compliance
40. Performance Requirements
41. Future Roadmap & Final Acceptance

---

# 1. Introduction

TACTIX is a premium fantasy football platform designed specifically for Moroccan football supporters.

Unlike traditional football applications that simply provide scores or statistics, TACTIX transforms football fans into active participants by allowing them to build squads, compete against other managers, and earn points based on the real-world performances of Botola Pro Inwi players.

TACTIX is designed as a scalable ecosystem rather than a single fantasy application. While Version 1 focuses exclusively on Botola Pro Inwi, the underlying architecture must support future expansion to additional leagues, tournaments, and football-related products without requiring significant redesign.

This Product Requirements Document serves as the primary source of truth for product managers, designers, developers, QA engineers, and AI coding agents.

Every requirement defined in this document is considered authoritative unless superseded by a later version.

---

# 2. Product Overview

TACTIX enables users to:

• Create fantasy football teams.

• Manage their squads throughout an entire season.

• Compete in public and private leagues.

• Track live player performances.

• Earn fantasy points.

• Analyze statistics.

• Receive intelligent recommendations.

The platform emphasizes strategic thinking, long-term planning, and community competition rather than chance.

---

# 3. Vision

Every football supporter should experience the excitement of managing a real football club.

TACTIX aims to make every Botola Pro match meaningful by giving users strategic decisions before, during, and after each fixture.

---

# 4. Mission

Create the most engaging football management platform in North Africa by combining fantasy football, modern technology, and premium user experience.

---

# 5. Business Objectives

Primary objectives include:

• Increase engagement with Botola Pro.

• Build an active fantasy football community.

• Create recurring subscription revenue.

• Establish partnerships with clubs and sponsors.

• Become the leading fantasy platform in Morocco.

Long-term objectives include expansion into:

• CAF Champions League

• Africa Cup of Nations

• International leagues

• AI football assistant

---

# 6. Product Philosophy

TACTIX is built upon five principles.

## Principle 1

Football is strategy.

Users should win because they make better decisions, not because of luck.

---

## Principle 2

Every player matters.

Even players from smaller clubs should provide fantasy value.

---

## Principle 3

The experience must be fair.

Scoring rules must remain transparent.

Statistics must remain consistent.

No hidden calculations should influence rankings.

---

## Principle 4

Quality over quantity.

Every feature introduced into TACTIX should improve user experience.

If a feature creates unnecessary complexity, it should not be implemented.

---

## Principle 5

Mobile first.

Every feature should be designed for mobile before desktop.

---

# 7. Target Audience

Primary users:

• Moroccan football supporters

• Fantasy football enthusiasts

• Students

• Office leagues

• Football communities

Secondary users:

• Sports journalists

• Football analysts

• Content creators

• Moroccan diaspora

---

# 8. Stakeholders

Internal:

• Product Owner

• Engineering Team

• UI/UX Designers

• QA Engineers

• Marketing Team

• Customer Support

External:

• Football supporters

• Sponsors

• Football clubs

• League organizers

• Data providers

---

# 9. Product Scope

Included in Version 1

✓ User registration

✓ Authentication

✓ Fantasy team creation

✓ Live scoring

✓ Transfers

✓ Captain selection

✓ Private leagues

✓ Public leagues

✓ Rankings

✓ Notifications

✓ User profiles

✓ Statistics

✓ Admin dashboard

✓ Content management

✓ Push notifications

✓ Match schedules

✓ Player search

✓ Team search

✓ Player comparisons

---

Not Included

✗ Betting

✗ Live streaming

✗ NFTs

✗ Cryptocurrency

✗ Marketplace

✗ Real-money prizes

✗ Fantasy drafts

✗ Player trading

---

# 10. User Roles

## Guest

Permissions:

• Browse information

• View fixtures

• View clubs

• View players

Cannot:

• Create teams

• Join leagues

• Earn points

---

## Registered User

Permissions:

• Create fantasy teams

• Join leagues

• Manage profile

• View rankings

• Receive notifications

---

## League Owner

Additional permissions:

• Create leagues

• Invite members

• Configure league settings

• Moderate members

---

## Administrator

Permissions:

• Manage users

• Manage clubs

• Manage fixtures

• Correct statistics

• Send announcements

• Manage reports

---

## Super Administrator

Full platform access.

Responsible for:

• Security

• Configuration

• Integrations

• Data synchronization

• System monitoring

---

# 11. Core Modules

TACTIX consists of the following modules.

Authentication

Fantasy Engine

Player Database

Club Database

Fixture Management

Live Match Engine

Scoring Engine

League Management

Transfers

Notifications

Statistics

Search

Profiles

Achievements

Admin Dashboard

Analytics

Settings

Support

Premium Features

Each module should remain independent to allow future expansion without affecting unrelated functionality.

---

# 12. Product Principles

Every feature must satisfy these conditions.

Simple

Fast

Reliable

Accessible

Scalable

Secure

Responsive

Localized

Transparent

Maintainable

---

# 13. MVP Definition

Version 1 aims to validate user demand with a complete season-long fantasy football experience.

The MVP must allow users to:

• Register.

• Build a squad.

• Join leagues.

• Compete weekly.

• View rankings.

• Make transfers.

• Select captain.

• Receive notifications.

• Follow player statistics.

• Track fantasy points.

Anything beyond these features should be considered after MVP validation.

---

# 14. Product Success Metrics

Within the first year, TACTIX should target:

50,000 registered users

15,000 monthly active users

35% weekly retention

Average session duration above 10 minutes

App Store rating above 4.7

Crash-free sessions above 99.8%

Average API response time below 250ms

Push notification delivery rate above 95%

---

# 15. Product Constraints

The application must support:

Arabic

French

English

Android

iOS

Dark Mode

Accessibility

Offline caching

Poor network conditions

Different screen sizes

---

# 16. High-Level Feature List

The first release includes the following major features:

- User authentication
- Onboarding
- Team creation
- Squad management
- Budget management
- Player transfers
- Captain and vice-captain selection
- Gameweek deadlines
- Live fantasy scoring
- Public and private leagues
- Leaderboards
- Player search and filtering
- Team statistics
- Player profiles
- Match schedules
- Push notifications
- Admin dashboard
- Content management
- Settings
- User profile
- Achievements
- Help & support

---

# 17. Exit Criteria for Version 1

TACTIX Version 1 will be considered production-ready when:

- All core user journeys are fully functional.
- Fantasy points are calculated accurately.
- Live match data synchronizes correctly.
- The application supports at least one full Botola Pro season.
- Security testing is complete.
- Performance targets are met.
- The admin dashboard can manage all operational tasks without direct database intervention.
- Critical defects are resolved before launch.

---

# 18. User Journey

This section describes the complete lifecycle of a TACTIX user, from the first app launch to long-term engagement.

The user journey is divided into multiple stages.

1. Discovery
2. Installation
3. Onboarding
4. Registration
5. Team Creation
6. League Participation
7. Weekly Management
8. Live Match Experience
9. Season Progression
10. Retention

---

# Stage 1 — Discovery

Users may discover TACTIX through:

• Social media
• Friends
• Referral links
• Football influencers
• Club partnerships
• Advertisements
• App Store search
• Google Play recommendations

Objective

Convince users that TACTIX offers the ultimate fantasy football experience for Botola Pro.

Success Metric

Installation Rate > 25%

---

# Stage 2 — First Launch

Upon launching the application for the first time:

System displays:

• Animated splash screen
• Logo
• Tagline
• Loading animation

System checks:

• Internet connection
• API availability
• App version
• Maintenance mode
• Authentication status

Possible Outcomes

Authenticated

↓

Go to Home

Unauthenticated

↓

Show Onboarding

Maintenance Mode

↓

Display Maintenance Screen

Offline

↓

Display Offline Screen

---

# Stage 3 — Onboarding

Purpose

Introduce new users to fantasy football and explain how TACTIX works.

Maximum Slides

4

Slide 1

Become the Manager

Description

Create your dream team from real Botola players.

---

Slide 2

Compete Every Week

Description

Challenge your friends and climb the rankings.

---

Slide 3

Earn Fantasy Points

Description

Goals, assists, saves, and clean sheets earn points.

---

Slide 4

Win Your League

Description

Make smart transfers and strategic captain choices.

---

Buttons

Skip

Next

Get Started

Requirements

Must only appear once.

Can be replayed from Settings.

---

# Stage 4 — Registration

Supported Methods

Email

Google

Apple (iOS)

Future

Facebook

Requirements

Email verification required.

Passwords must satisfy security requirements.

Users must accept:

• Privacy Policy

• Terms of Service

Age Requirement

Minimum age:

13 years

---

Validation Rules

Email

Must be unique.

Must be valid.

Password

Minimum 8 characters.

At least:

1 uppercase

1 lowercase

1 number

1 special character

Display password strength indicator.

---

Error Messages

Email already exists.

Invalid email.

Weak password.

Network error.

Unexpected server error.

---

# Stage 5 — Profile Setup

After registration:

User selects:

• Username

• Country

• Favorite Club

Optional

Profile picture

Bio

Favorite player

Language

Notifications

---

Requirements

Username

3–20 characters.

Unique.

No offensive words.

No emojis.

---

# Stage 6 — Dashboard Introduction

New users receive a guided tour.

Highlight:

Fantasy Team

Leagues

Rankings

Transfers

Profile

Settings

The tutorial may be skipped.

---

# Stage 7 — Team Creation

This is the most important user journey.

Every registered user must create exactly one fantasy team.

Cannot join competitions without a valid squad.

---

Squad Requirements

15 Players

Composition

2 Goalkeepers

5 Defenders

5 Midfielders

3 Forwards

Maximum

3 players

from the same real club.

---

Budget

Starting Budget

100.0 Fantasy Credits

Remaining budget displayed continuously.

---

Player Selection

Available Filters

Club

Position

Price

Popularity

Ownership %

Points

Form

Upcoming Fixtures

Search

Sort

---

Player Cards Display

Photo

Name

Club

Position

Price

Points

Ownership

Recent Form

Availability

Status

---

Availability Icons

Green

Available

Yellow

Doubtful

Red

Injured

Grey

Suspended

Blue

Unavailable

---

Validation Rules

Budget exceeded

Cannot continue.

More than 3 players from same club

Cannot continue.

Wrong squad size

Cannot continue.

Wrong position count

Cannot continue.

Duplicate player

Cannot continue.

---

Confirmation Screen

Before confirming

Show

Total Budget

Remaining Budget

Formation

Club Distribution

Captain not selected yet

---

Success Message

Congratulations!

Your fantasy team is ready for the season.

Button

Continue

---

# Stage 8 — Captain Selection

User selects:

Captain

Vice Captain

Rules

Captain

Receives double points.

Vice Captain

Receives double points only if captain does not play.

Captain may be changed until deadline.

---

# Stage 9 — Home Dashboard

The dashboard becomes the central hub.

Sections

Upcoming Fixtures

Current Gameweek

Fantasy Points

League Position

Latest News

Transfer Suggestions

Captain Recommendation

Player Form

Live Matches

Recent Notifications

---

Widgets

Current Rank

Overall Rank

Private League Rank

Points This Week

Remaining Transfers

Budget Remaining

Captain

Vice Captain

Bench Status

---

# Stage 10 — Weekly Cycle

Every Gameweek follows the same lifecycle.

Before Deadline

User can:

Transfer players.

Change captain.

Change formation.

Modify bench.

Join leagues.

---

Deadline

Squad becomes locked.

No transfers allowed.

Captain locked.

Bench locked.

Formation locked.

---

Live Matches

System receives live events.

Fantasy points update.

Rankings update.

Notifications sent.

---

After Final Match

Scores finalized.

Bonus points calculated.

Rankings recalculated.

Price changes processed.

Transfer window opens.

Next Gameweek begins.

---

# User Journey Success Metrics

Registration Completion

> 80%

Team Creation Completion

> 90%

First League Joined

> 70%

First Transfer Made

> 60%

Weekly Return Rate

> 50%

Season Completion

> 30%

---

# User Experience Principles

Every major action should require no more than three taps whenever possible.

Critical actions must include confirmation dialogs.

Loading states must always display skeleton screens or progress indicators.

No screen should remain blank during data loading.

Every error must explain:
- What happened
- Why it happened (when known)
- How the user can resolve it

The application should preserve user progress whenever possible, even if the network connection is interrupted.

# 19. Functional Requirements

This section defines every functional requirement of TACTIX.

Each module contains:

- Purpose
- Features
- User interactions
- Business rules
- Validation
- Edge cases
- Error handling
- Acceptance criteria

---

# Module 1 — Authentication

## Purpose

Provide a secure and frictionless authentication experience.

---

## Features

- Register
- Login
- Logout
- Forgot Password
- Reset Password
- Email Verification
- Session Management

---

## Registration

### Required Fields

First Name

Last Name

Username

Email

Password

Confirm Password

Favorite Club

Country

Preferred Language

Accept Terms

---

### Validation

First Name

• Required

• 2–40 characters

Last Name

• Required

• 2–40 characters

Username

• Unique

• 3–20 characters

• Letters, numbers and underscores only

Email

• Must be unique

• RFC compliant

Password

Minimum:

8 characters

Must contain:

• Uppercase

• Lowercase

• Number

• Special character

---

### Business Rules

Every email can own only one account.

Username cannot be changed more than once every 90 days.

Deleted usernames remain reserved for 180 days.

---

### Acceptance Criteria

✓ User receives verification email.

✓ User automatically logs in after verification.

✓ Welcome notification is sent.

---

# Login

Supported Methods

Email

Google

Apple

Future

Facebook

---

### Remember Me

Session Duration

30 days

---

### Failed Login

After five failed attempts

↓

Account locked

↓

15 minutes

---

### Error Messages

Invalid credentials

Account not verified

Account suspended

Network unavailable

Server unavailable

---

# Forgot Password

Flow

Email

↓

Verification Code

↓

New Password

↓

Confirmation

---

Verification Code

6 digits

Expiration

10 minutes

Maximum Attempts

5

---

# Email Verification

Verification email sent immediately.

Resend allowed after:

60 seconds

Verification token expiration:

24 hours

---

# Session Management

Inactive Session

30 days

Refresh Tokens

Automatically renewed

Logout

Invalidate all refresh tokens.

---

# Module 2 — User Profile

## Purpose

Allow users to manage their personal information.

---

### Sections

Personal Information

Statistics

Achievements

History

Favorite Club

Settings

Notifications

Privacy

---

### Editable Fields

Username

Display Name

Country

Language

Favorite Club

Avatar

Bio

---

### Read Only

User ID

Registration Date

Total Points

Season Rank

Leagues Joined

Achievements

---

### Statistics

Current Season Points

Overall Points

Highest Weekly Score

Best Overall Rank

Transfers Made

Captain Success Rate

Most Selected Club

Favorite Formation

Total Seasons Played

---

# Module 3 — Home Dashboard

Purpose

Provide a personalized football hub.

---

### Dashboard Components

Upcoming Deadline

Current Gameweek

Fantasy Points

Current Rank

League Rank

Latest News

Trending Players

Captain Recommendation

Transfer Suggestions

Upcoming Fixtures

Live Matches

Recent Notifications

Quick Actions

---

### Quick Actions

Manage Team

Transfers

Join League

Statistics

Profile

---

### Dashboard Refresh

Automatic

Every 60 seconds

Manual Pull To Refresh

Supported

---

# Module 4 — Fantasy Team

This is the heart of TACTIX.

---

## Squad Size

15 Players

---

Composition

2 Goalkeepers

5 Defenders

5 Midfielders

3 Forwards

---

Starting XI

11 Players

Bench

4 Players

---

Bench Order

Goalkeeper

Player 1

Player 2

Player 3

---

Allowed Formations

3-4-3

3-5-2

4-4-2

4-3-3

4-5-1

5-3-2

5-4-1

---

### Business Rules

Exactly

11 players

must start.

Captain required.

Vice Captain required.

Bench order required.

---

### Formation Validation

Minimum

3 Defenders

Maximum

5 Defenders

Minimum

2 Midfielders

Maximum

5 Midfielders

Minimum

1 Forward

Maximum

3 Forwards

---

# Budget Rules

Starting Budget

100.0 Fantasy Credits

Maximum Players

15

Maximum Players Per Club

3

Budget Cannot Become Negative

---

# Team Editing

Allowed Before Deadline

Yes

Allowed After Deadline

No

---

### Captain

Double Points

Yes

---

Vice Captain

Activated

Only if captain scores zero minutes.

---

# Module 5 — Player Search

Search By

Player Name

Club

Position

Price

Ownership

Points

Goals

Assists

Form

Availability

Nationality

---

Sorting

Price

Highest Points

Lowest Price

Ownership

Popularity

Alphabetical

Recent Form

Upcoming Fixtures

---

# Player Details

Each player page displays:

Photo

Club

Age

Nationality

Position

Price

Season Points

Goals

Assists

Yellow Cards

Red Cards

Minutes Played

Clean Sheets

Expected Points

Ownership

Price History

Fixture Difficulty

Recent Form

Availability

---

Graphs

Price Trend

Points Trend

Ownership Trend

---

# Module 6 — Transfers

Transfers available

1 Free

per Gameweek

Unused transfers

Maximum

2

---

Extra Transfers

Cost

-4 points

each

---

Transfer Window

Opens

Immediately after deadline.

Closes

At next deadline.

---

Transfer Flow

Remove Player

↓

Select Replacement

↓

Budget Validation

↓

Confirmation

↓

Update Squad

---

Validation

Budget

Club Limit

Position Limit

Squad Size

Formation

---

# Module 7 — Notifications

Types

Deadline Reminder

Transfer Completed

Captain Reminder

Player Injured

Price Rise

Price Drop

League Invitation

Achievement

News

Maintenance

---

Delivery

Push

In-App

Email

(User configurable)

---

# Module 8 — Search

Global Search

Supports

Players

Clubs

Leagues

Managers

---

Recent Searches

Stored

Last 10

---

Popular Searches

Updated Daily

---

# Module 9 — Settings

Language

Arabic

French

English

---

Theme

System

Light

Dark

---

Notification Preferences

Enable/Disable

Per Category

---

Privacy

Private Profile

Hide Rankings

Hide Email

Block Invitations

---

# Module 10 — Help Center

Topics

Fantasy Rules

Transfers

Captain

Scoring

Leagues

Account

Technical Issues

Contact Support

FAQ

---

# Acceptance Criteria

Every module must satisfy:

✓ Accessible

✓ Responsive

✓ Localized

✓ Offline tolerant

✓ Secure

✓ Tested

✓ Documented

✓ Analytics Enabled

---

# Global Business Rules

No duplicate usernames.

One fantasy team per account.

One captain.

One vice captain.

Maximum three players from one club.

Budget cannot become negative.

Transfers lock after deadline.

Only administrators can edit official player statistics.

Deleted users cannot continue participating until restored.

All critical actions must be logged for auditing.

# 20. Fantasy Engine

> The Fantasy Engine is responsible for every calculation performed by TACTIX.
>
> It manages player points, rankings, transfers, substitutions, budgets, chips, deadlines, and season progression.
>
> Every calculation must be deterministic, transparent, auditable, and reproducible.

---

# Engine Principles

The Fantasy Engine is built on five principles.

## Fairness

Every user competes under exactly the same rules.

No hidden bonuses.

No manual adjustments without administrator approval.

---

## Transparency

Every point earned or lost must have a visible explanation.

Users should always know why their score changed.

---

## Real-Time

Fantasy points should update as live match events are received.

If live data is delayed, the system must notify users.

---

## Reliability

All calculations must be repeatable.

Reprocessing a completed match should always produce the same result.

---

## Scalability

The engine must support:

- 100,000 concurrent users
- Thousands of simultaneous live updates
- Multiple competitions
- Multiple seasons

without changing business logic.

---

# Fantasy Season

Each football season creates one Fantasy Season.

Example

Botola Pro 2027

↓

Fantasy Season 2027

A Fantasy Season contains:

- Clubs
- Players
- Fixtures
- Gameweeks
- Fantasy Managers
- Leagues
- Rankings

---

# Fantasy Team

Each user owns exactly one fantasy team per season.

A fantasy team consists of:

15 Players

• 2 Goalkeepers

• 5 Defenders

• 5 Midfielders

• 3 Forwards

Maximum

3 players

from the same club.

---

# Starting Budget

Every manager starts with

100.0 Fantasy Credits

Credits are virtual.

They cannot be purchased.

---

# Player Prices

Every player has:

Current Price

Starting Price

Previous Price

Price History

Price Trend

Price Change Timestamp

Example

Ayoub El Kaabi

Start

10.0

Current

10.4

Difference

+0.4

---

# Squad Validation

A valid squad must satisfy ALL rules.

Rule 1

Exactly 15 players.

Rule 2

Correct position distribution.

Rule 3

Budget <= 100.

Rule 4

Maximum 3 players per club.

Rule 5

No duplicate players.

If any rule fails

↓

Squad cannot be saved.

---

# Starting XI

Managers select

11 starting players.

The remaining

4 players

form the bench.

Bench order matters.

---

# Bench Order

Bench consists of

Goalkeeper

Player 1

Player 2

Player 3

Outfield substitutes are ordered manually.

Example

Bench

GK

DEF

MID

FWD

If a defender does not play

↓

First eligible substitute replaces him.

---

# Valid Formations

Allowed

3-4-3

3-5-2

4-4-2

4-5-1

4-3-3

5-4-1

5-3-2

5-2-3

Not Allowed

2 defenders

6 defenders

6 midfielders

4 forwards

The engine validates every lineup before deadline.

---

# Captain

Each squad requires

1 Captain.

Captain receives

2×

Fantasy Points.

If captain scores

10

Fantasy Points

↓

Manager receives

20

Fantasy Points.

---

# Vice Captain

Vice Captain replaces captain only when

Captain played

0 minutes.

If captain played

1 minute

↓

Captain remains active.

Vice Captain is ignored.

---

# Deadline

Every Gameweek has one deadline.

Example

Friday

18:30

After deadline

Locked

- Transfers
- Captain
- Vice Captain
- Formation
- Starting XI
- Bench

No changes allowed.

---

# Live Match Events

The engine receives events.

Examples

Goal

Assist

Penalty

Yellow Card

Red Card

Substitution

Clean Sheet

Own Goal

Penalty Save

Penalty Miss

VAR Decision

Each event immediately recalculates fantasy points.

---

# Point Calculation

Every player starts each match with

0 points.

Points are added and removed throughout the match.

The engine stores:

Current Points

Final Points

Historical Points

---

# Official Scoring

## Appearance

Played

1–59 min

+1

Played

60+ min

+2

---

## Goals

Goalkeeper

+10

Defender

+8

Midfielder

+6

Forward

+4

Reason

Encourages selection of defenders and goalkeepers who contribute offensively.

---

## Assist

All Positions

+3

---

## Clean Sheet

Goalkeeper

+4

Defender

+4

Midfielder

+1

Forward

0

Player must play

60+

minutes.

---

## Goal Conceded

Goalkeeper

-1

every

2 goals conceded.

Defender

-1

every

2 goals conceded.

---

## Penalty Saved

Goalkeeper

+5

---

## Penalty Missed

Any Player

-2

---

## Own Goal

-2

---

## Yellow Card

-1

---

## Red Card

-3

---

## Second Yellow

Counts as

Red Card only.

Do not deduct both.

---

## Save

Goalkeeper

Every

3 saves

↓

+1

---

## Hat-Trick Bonus

Optional Feature

Disabled

Version 1

---

## Player Of The Match

Optional

Future Feature

---

# Automatic Substitution

Automatic substitutions occur after all matches in the Gameweek finish.

Conditions

Starter played

0 minutes.

↓

Eligible substitute enters.

Rules

Formation must remain valid.

Bench order respected.

Goalkeeper only replaces goalkeeper.

Example

DEF

Did not play.

↓

First bench midfielder.

Would create

2 defenders.

↓

Not allowed.

Engine tries

Next substitute.

---

# Injury During Match

Player played

1 minute

↓

No automatic substitution.

---

# Match Cancellation

If match postponed before kickoff

↓

No points awarded.

Player remains eligible for future fixture.

---

# Double Gameweek

Player may play

2 matches.

Fantasy Points

Match 1

+

Match 2

=

Total Gameweek Points

---

# Blank Gameweek

Player has

No fixture.

↓

0 points.

---

# Live Ranking

Rankings update automatically after every scoring event.

Affected Rankings

Overall

Country

Private League

Friends

Club Supporters

---

# Tie Breakers

If two managers have equal points

Order

1

Fewest transfer penalties

↓

2

Highest Gameweek Score

↓

3

Lowest Team Value

↓

4

Earliest Team Creation Date

---

# Data Corrections

Official statistics provider may correct events.

Example

Goal changed to own goal.

The engine must

Rollback

↓

Recalculate

↓

Update rankings

↓

Notify affected users.

Every correction must be logged.

---

# Audit Log

Every calculation creates an audit entry.

Timestamp

Player

Fixture

Event

Previous Points

New Points

Source

Administrator (if manual)

Audit logs cannot be deleted.

---

# Fantasy Engine Performance

Requirements

Score update

< 2 seconds

Ranking recalculation

< 5 seconds

Transfer validation

< 500 ms

Squad validation

< 300 ms

API latency

< 250 ms

---

# Acceptance Criteria

✓ Every calculation is deterministic.

✓ Every score is reproducible.

✓ Automatic substitutions always respect formation rules.

✓ Captain and vice-captain behave correctly.

✓ Rankings update after every scoring event.

✓ Data corrections automatically recalculate historical scores.

✓ Every calculation is logged.

✓ Users can inspect the breakdown of every player's fantasy points.

# 21. Navigation & Information Architecture

---

## Purpose

The navigation system provides users with a fast, intuitive, and consistent way to access every major feature of TACTIX.

The architecture must prioritize the most frequently used actions while minimizing the number of taps required to complete common tasks.

Navigation should adapt to the user's current context, such as before a gameweek deadline, during live matches, or after the gameweek has concluded.

---

# Navigation Principles

TACTIX follows these principles:

• Mobile-first

• Maximum three taps to any major feature

• Persistent bottom navigation

• Consistent page hierarchy

• Predictable navigation behavior

• Deep-link support

• Accessible with one hand

• Fast transitions

---

# Primary Navigation

The application uses a persistent bottom navigation bar with five tabs.

1. Home

2. My Team

3. Leagues

4. Discover

5. Profile

The active tab must always remain visible.

Navigation state should be preserved when switching tabs.

---

# Navigation Hierarchy

Splash Screen

↓

Authentication

↓

Onboarding

↓

Home

From Home, users may navigate to:

• My Team

• Leagues

• Discover

• Profile

• Notifications

• Live Match Center

• AI Assistant

---

# Home Tab

Purpose

Provide users with a personalized overview of their fantasy season.

Contains:

• Current Gameweek

• Countdown Timer

• Team Summary

• Live Points

• League Position

• AI Recommendations

• News

• Upcoming Fixtures

• Notifications

---

# My Team Tab

Purpose

Manage the fantasy squad.

Sections

• Starting XI

• Bench

• Captain

• Vice Captain

• Budget

• Transfers

• Formation

• Player Details

Quick Actions

• Make Transfer

• Change Captain

• Change Formation

• Save Team

---

# Leagues Tab

Purpose

Access all competitions.

Sections

• Private Leagues

• Public Leagues

• Global Rankings

• Friends

• Invitations

• League Search

League owners additionally see:

• Manage League

• Pending Requests

• League Settings

---

# Discover Tab

Purpose

Help users explore football content.

Sections

• Players

• Clubs

• Fixtures

• Statistics

• Trending Players

• Player Comparisons

• News

• Search

• AI Insights

Future additions

• CAF Competitions

• Transfer Market News

• Match Predictions

---

# Profile Tab

Purpose

Manage account information.

Sections

• Profile

• Statistics

• Achievements

• Favorite Club

• Premium

• Settings

• Support

• About

---

# Secondary Navigation

Accessible through contextual actions.

Includes:

• Notifications

• AI Assistant

• Match Center

• Transfer History

• Fantasy Rules

• Help Center

• Contact Support

---

# Navigation States

Before Deadline

Priority Components

• Countdown

• Captain Reminder

• Suggested Transfers

• Team Validation

During Live Matches

Priority Components

• Live Points

• Live Ranking

• Live Match Events

• Bonus Point Updates

After Gameweek

Priority Components

• Weekly Recap

• Rank Changes

• Price Changes

• Achievement Progress

---

# Information Architecture

Level 1

Home

My Team

Leagues

Discover

Profile

---

Level 2

Examples

My Team

↓

Transfers

↓

Player Search

↓

Player Profile

---

Discover

↓

Players

↓

Player Profile

↓

Statistics

↓

Comparison

---

Leagues

↓

League Details

↓

Leaderboard

↓

Manager Profile

---

# Global Search

Global search is accessible from every primary tab.

Search supports:

• Players

• Clubs

• Managers

• Leagues

• Fixtures

• Articles

Search results should appear in less than 300 milliseconds when using cached data and less than one second when retrieved from the server.

---

# Floating Action Button

A contextual floating action button appears only when relevant.

Examples

Home

↓

Open AI Assistant

My Team

↓

Make Transfer

League

↓

Invite Friends

Player Profile

↓

Add Player

The button should never obscure important content.

---

# Deep Linking

TACTIX supports deep links for:

Player Profiles

Club Profiles

League Invitations

Manager Profiles

Match Details

Articles

Premium Offers

Notifications

Marketing Campaigns

Referral Links

Example

tactix://player/1023

tactix://league/invite/ABC123

tactix://match/2027-04-18

---

# Navigation History

Users should return to the previous screen exactly where they left it.

Scroll positions must be preserved.

Applied filters remain active.

Search history is maintained during the session.

Unsaved team changes require confirmation before exiting.

---

# Empty States

Every empty screen must provide guidance.

Example

No Leagues Joined

Display

"You haven't joined any leagues yet."

Buttons

Create League

Browse Public Leagues

---

No Notifications

Display

"You're all caught up."

---

No Search Results

Display

"No results found."

Suggestions

• Check spelling

• Try another keyword

• Remove filters

---

# Offline Navigation

Previously visited pages remain available using cached content.

Unavailable features should clearly indicate that an internet connection is required.

Example

"Live scores are unavailable while offline."

---

# Navigation Analytics

Track:

• Screen views

• Navigation paths

• Average time per screen

• Most used tabs

• Search frequency

• AI Assistant launches

• League creation rate

• Transfer initiation rate

• Session depth

Analytics data must never include sensitive personal information.

---

# UX Requirements

The navigation system must:

• Be intuitive for first-time users.

• Minimize cognitive load.

• Maintain visual consistency.

• Preserve user context.

• Avoid unnecessary page transitions.

• Support accessibility features.

• Animate transitions smoothly without impacting performance.

---

# Acceptance Criteria

✓ Every major feature is reachable within three taps.

✓ Navigation state is preserved across tabs.

✓ Deep links open the correct destination.

✓ Unsaved changes trigger confirmation dialogs.

✓ Offline users can access cached content.

✓ Empty states provide meaningful guidance.

✓ Navigation animations remain smooth on supported devices.

✓ Navigation analytics are recorded successfully.

---

# Future Improvements

• Tablet-optimized navigation

• Desktop web navigation

• Foldable device layouts

• Voice navigation

• AI-powered shortcuts

• Personalized navigation based on user behavior

• Adaptive home layout driven by engagement patterns

# 22. Home Module

---

# Objective

The Home Module is the central hub of the TACTIX experience.

Every time a user opens the application, they should immediately understand:

• What is happening right now

• What action they should take next

• How their fantasy team is performing

• What matches are live

• What decisions are required before the next deadline

The Home screen is dynamic and changes depending on the current phase of the fantasy season.

---

# Goals

The Home screen should:

• Reduce navigation friction

• Increase weekly engagement

• Encourage transfers

• Encourage captain changes

• Surface AI recommendations

• Display live fantasy updates

• Keep users informed

---

# Home Screen Layout

The Home screen consists of the following sections.

──────────────────────────

Header

↓

Gameweek Banner

↓

Countdown

↓

Fantasy Team Summary

↓

AI Assistant

↓

Live Match Center

↓

League Snapshot

↓

Trending Players

↓

News Feed

↓

Upcoming Fixtures

↓

Achievements

↓

Quick Actions

──────────────────────────

The order may change dynamically depending on the current state of the gameweek.

---

# Header

Contains

• User Avatar

• Welcome Message

• Current Rank

• Notification Icon

• Premium Badge (if applicable)

• Settings Shortcut

Example

Good Evening,

Aymane 👋

Overall Rank

12,842

Gameweek Rank

321

---

# Dynamic Greeting

Greeting changes according to local time.

Morning

Good Morning

Afternoon

Good Afternoon

Evening

Good Evening

Night

Good Night

---

# Current Gameweek Banner

Displays

Gameweek Number

Status

Deadline

Current Phase

Example

GAMEWEEK 14

Deadline

Friday

18:30

Status

Transfers Open

---

Possible Status

Transfers Open

Deadline Soon

Locked

Live

Finished

Maintenance

---

# Countdown Widget

Displays remaining time before deadline.

Example

2 Days

14 Hours

21 Minutes

Updates every second.

When less than 24 hours remain

↓

Countdown turns orange.

When less than 2 hours remain

↓

Countdown turns red.

---

# Deadline Reminder

If user has not selected:

Captain

Vice Captain

Valid Formation

↓

Display warning card.

Example

⚠ Your captain has not been selected.

Button

Choose Captain

---

# Fantasy Team Summary

Displays

Current Points

Overall Rank

Gameweek Rank

Remaining Budget

Free Transfers

Captain

Vice Captain

Formation

Bench Status

Example

Points

58

Overall

4,218

Captain

El Kaabi

Transfers

1 Free

---

# Live Points Card

Only appears during live matches.

Displays

Current Fantasy Points

Projected Points

Live Rank

Rank Change

Animated Score

Example

Current

64

Projected

72

Rank

▲ 853

---

# AI Assistant Widget

Purpose

Provide intelligent recommendations.

Possible Recommendations

Transfer Suggestions

Captain Suggestions

Formation Advice

Injury Alerts

Suspension Alerts

Fixture Analysis

Budget Optimization

Differential Picks

Example

TACTIX AI

Your captain faces the league's strongest defense.

Expected Points

3.2

Recommended Captain

Rahimi

Expected Points

8.1

Button

View Analysis

---

# Live Match Center

Displays all ongoing fixtures.

Each Match Card shows

Home Club

Away Club

Current Score

Minute

Cards

Goals

Fantasy Players Involved

Example

Raja

2

-

1

AS FAR

76'

Fantasy Impact

Rahimi ⚽

+6

---

Selecting a match opens the Match Center.

---

# League Snapshot

Displays

Private League Rank

Friends League Rank

Global Rank

Top Manager

Weekly Leader

Buttons

View League

---

# Trending Players

Purpose

Help managers discover popular transfers.

Display

Player

Price

Ownership

Transfers In

Transfers Out

Form

Price Change

Trending Icon

Filters

Most Purchased

Most Sold

Highest Form

Price Risers

Price Fallers

---

# News Feed

Displays football news relevant to fantasy managers.

Categories

Transfers

Injuries

Suspensions

Manager Comments

Match Reports

Club News

Breaking News

News should prioritize:

Favorite Club

Fantasy Players

Upcoming Opponents

Botola Pro

Future

CAF Competitions

---

# Upcoming Fixtures

Displays

Next Match

Fixture Difficulty

Kickoff Time

Stadium

Fantasy Importance

Example

Raja

vs

Wydad

Difficulty

★★★★★

Saturday

20:00

---

# Achievements Widget

Displays

Latest Badge

Season Progress

Challenges

Example

Transfer Master

Completed

Weekly Challenge

Score 70+

Current

58

---

# Quick Actions

Always visible.

Buttons

Manage Team

Transfers

Join League

AI Assistant

Statistics

Fixtures

---

# Dynamic Home States

The Home screen changes automatically.

---

## Before Deadline

Priority

Countdown

Captain Reminder

Transfer Suggestions

Fixture Difficulty

AI Advice

---

## During Live Matches

Priority

Live Points

Live Rankings

Goal Notifications

Match Cards

Bonus Updates

---

## After Matches

Priority

Weekly Summary

Rank Changes

Price Changes

Achievements

Next Deadline

---

## During Maintenance

Display

Maintenance Illustration

Estimated Return

Status Message

Support Link

---

# Pull To Refresh

Supported

Refreshes

Fantasy Points

Fixtures

Rankings

News

Player Prices

Notifications

---

# Personalization

The Home screen adapts based on

Favorite Club

Fantasy Team

Leagues

Country

Preferred Language

Previous Activity

Premium Status

---

# Offline Mode

Available

Cached Team

Cached Fixtures

Cached Rankings

Cached News

Unavailable

Live Points

Transfers

AI Assistant

Live Matches

Display Banner

Offline Mode

Some features are unavailable.

---

# Notifications Integration

Home displays recent notifications.

Maximum

5

Unread notifications show a badge.

Notification Categories

Fantasy

League

Transfer

Player

News

System

Premium

---

# Performance Requirements

Initial Load

<2 seconds

Widget Refresh

<500 ms

Animation

60 FPS

API Requests

Parallel

Caching

Enabled

Skeleton Loading

Required

---

# Accessibility

Supports

Screen Readers

Large Text

Dynamic Fonts

Color Blind Friendly Indicators

High Contrast Mode

RTL Layout

VoiceOver

TalkBack

---

# Analytics Events

Track

Home Opened

Widget Click

Transfer Button

Captain Reminder

AI Widget Click

News Opened

Fixture Opened

League Opened

Achievement Viewed

Refresh Performed

Time On Screen

---

# Edge Cases

No Team Created

↓

Display onboarding prompt.

No Internet

↓

Show cached content.

No Live Matches

↓

Display upcoming fixtures.

Season Finished

↓

Display season summary.

Maintenance

↓

Disable interactive widgets.

---

# Error Handling

If data cannot load

↓

Show friendly error message.

↓

Allow retry.

↓

Log error.

Example

"We couldn't load your fantasy data.

Please try again."

Button

Retry

---

# Acceptance Criteria

✓ Home loads successfully within performance targets.

✓ Correct widgets appear based on gameweek status.

✓ AI recommendations are personalized.

✓ Countdown updates accurately.

✓ Live points refresh in real time.

✓ Cached data is available offline.

✓ Navigation shortcuts work correctly.

✓ Analytics events are recorded.

✓ Accessibility standards are met.

---

# Future Improvements

• Customizable Home widgets

• Drag-and-drop widget ordering

• Weather forecasts for fixtures

• Stadium attendance insights

• Personalized football calendar

• AI-generated weekly summary

• Voice assistant integration

• Home screen widgets for Android and iOS

# 23. My Team Module

---

# Objective

The My Team module is the primary workspace for every fantasy manager.

It allows users to build, review, and manage their squad throughout the season while providing all information required to make informed decisions before each gameweek deadline.

This module must make squad management simple for beginners while providing advanced tools for experienced fantasy players.

---

# Goals

The My Team module should enable users to:

• View their complete squad

• Modify formations

• Select captain and vice captain

• Manage substitutes

• Monitor budget

• Review player performance

• Prepare for upcoming fixtures

• Validate their squad before deadlines

---

# Primary Layout

The page consists of:

Header

↓

Gameweek Information

↓

Budget Summary

↓

Football Pitch

↓

Bench

↓

Quick Actions

↓

Transfer Summary

↓

Team Statistics

↓

Validation Panel

↓

Recent Changes

---

# Header

Displays

• Team Name

• Manager Name

• Current Gameweek

• Overall Rank

• Team Value

• Remaining Budget

• Free Transfers

Example

TACTIX FC

Manager

Aymane

Overall Rank

4,281

Team Value

102.7 Credits

Remaining Budget

1.4 Credits

Free Transfers

1

---

# Gameweek Banner

Displays

Gameweek Number

Deadline

Current Phase

Example

Gameweek 18

Deadline

Friday

18:30

Status

Transfers Open

---

# Football Pitch

The football pitch is the primary visual element.

Formation is displayed graphically.

Each player appears as an interactive card.

Player Card Contents

• Photo

• Name

• Club Logo

• Position

• Price

• Current Points

• Fixture Difficulty

• Availability Status

Captain Badge

Vice Captain Badge

---

# Player Status Indicators

Green

Available

Yellow

Doubtful

Red

Injured

Gray

Suspended

Blue

International Duty

Purple

Blank Gameweek

Gold

Double Gameweek

---

# Player Card Actions

Tap

↓

Open Player Profile

Long Press

↓

Quick Actions Menu

Available Actions

Replace Player

Compare Player

View Statistics

View Fixtures

Captain

Vice Captain

Favorite

---

# Drag and Drop

Users can drag players.

Supported Actions

Swap Bench Order

Swap Starting Players

Move Between Bench and Starting XI

Formation automatically validates.

Invalid moves are rejected immediately.

---

# Bench

Bench contains

Goalkeeper

Player 1

Player 2

Player 3

Bench order determines automatic substitutions.

Bench cards display:

Name

Club

Position

Price

Fixture

Status

Projected Points

---

# Captain Selection

Users may assign

One Captain

One Vice Captain

Captain Card displays

Captain Icon

Double Points Indicator

Expected Points

Ownership Percentage

---

# Captain Confirmation

Changing the captain displays

Confirmation Sheet

Current Captain

↓

New Captain

↓

Expected Difference

↓

Confirm

---

# Formation Selector

Supported Formations

3-4-3

3-5-2

4-3-3

4-4-2

4-5-1

5-3-2

5-4-1

5-2-3

Changing formation automatically suggests the most suitable bench player.

---

# Budget Panel

Displays

Starting Budget

Current Team Value

Remaining Budget

Price Change

Example

Budget

100.0

Current Value

102.4

Bank

1.2

---

# Team Value

Calculated Daily

Displayed With

Price Trend

Gain Since Season Start

Highest Value

Lowest Value

---

# Transfer Summary

Displays

Free Transfers

Transfer Cost

Transfers Already Made

Wildcard Availability

Future Chips

Example

Free

1

Extra Transfer

-4 Points

---

# Validation Panel

The system validates the squad continuously.

Checks

Correct Squad Size

Correct Formation

Budget

Club Limit

Captain Selected

Vice Captain Selected

Deadline Status

If validation fails

↓

Save button disabled

↓

Error displayed

---

# Squad Statistics

Displays

Average Player Price

Average Player Form

Expected Points

Players Injured

Players Suspended

Double Gameweek Players

Blank Gameweek Players

Club Distribution

Position Distribution

---

# Fixture Difficulty

Every player displays upcoming fixtures.

Difficulty Rating

1

Very Easy

5

Very Difficult

Example

RS Berkane

★★★★★

---

# AI Insights Panel

TACTIX AI analyzes the squad.

Suggestions

Captain

Vice Captain

Transfer

Formation

Bench Order

Differential Picks

Budget Optimization

Risk Assessment

Example

Your bench contains a player with a higher expected score than one of your starters.

Recommendation

Start Belammari instead of X.

Expected Gain

+4.3 Points

---

# Quick Actions

Buttons

Transfers

Statistics

Compare Players

Fixture Planner

AI Analysis

Reset Changes

---

# Save Changes

Button remains disabled until changes occur.

After saving

Display

Success Animation

"Team Updated Successfully"

Timestamp

Last Saved

---

# Deadline Lock

When deadline passes

The following become read-only

Formation

Captain

Vice Captain

Transfers

Bench

Starting XI

Informational data remains available.

---

# Empty States

No Team Created

↓

Prompt

"Create your first fantasy team."

No Captain

↓

Prompt

"Choose your captain."

No Vice Captain

↓

Prompt

"Choose your vice captain."

---

# Loading State

Display

Football Pitch Skeleton

Player Card Skeletons

Animated Placeholders

No blank screens.

---

# Offline State

Available

View Squad

View Cached Statistics

Unavailable

Transfers

Save Changes

Live Prices

Live AI

Banner

"You are offline. Changes cannot be saved."

---

# Error Handling

Examples

Unable to save

↓

Retry

↓

Keep local changes

Budget exceeded

↓

Highlight affected players

Invalid formation

↓

Highlight formation selector

Server unavailable

↓

Retry option

---

# Notifications

Examples

Deadline in 24 hours

Captain not selected

Player injured

Price increased

Price decreased

Transfer completed

Formation invalid

Bench updated

---

# Analytics

Track

Open My Team

Formation Changes

Captain Changes

Vice Captain Changes

Transfer Started

Transfer Saved

AI Suggestion Accepted

Bench Changes

Time On Screen

Save Attempts

Validation Errors

---

# Security

All team modifications require authenticated sessions.

Every change is logged with

User ID

Timestamp

Gameweek

Previous Squad

New Squad

IP Address

Device

---

# Performance Requirements

Load Squad

< 1 second

Save Squad

< 500 milliseconds

Drag Animation

60 FPS

Validation

Real Time

Maximum API Calls

Optimized with batching

---

# Accessibility

Supports

Screen Readers

Keyboard Navigation (Web)

Large Fonts

VoiceOver

TalkBack

RTL

Color Blind Indicators

Haptic Feedback

---

# Acceptance Criteria

✓ Squad always remains valid.

✓ Invalid formations cannot be saved.

✓ Budget rules are enforced.

✓ Captain and vice captain are always assigned.

✓ Bench order is preserved.

✓ AI recommendations reflect the latest data.

✓ Deadline locking works correctly.

✓ All changes are synchronized across devices.

✓ User receives immediate visual feedback after every action.

---

# Future Improvements

• Multi-gameweek planner

• Drag-and-drop tactical board

• Formation heat maps

• Injury risk predictions

• AI-generated weekly lineup

• Team sharing via link

• Export squad as image

• Squad comparison with friends

• Collaborative leagues with assistant managers

# 24. League System

---

# Objective

The League System enables managers to compete against other users in structured competitions.

Leagues are designed to foster engagement, friendly rivalry, and long-term retention by allowing users to compete with friends, coworkers, classmates, supporters of the same club, or the entire TACTIX community.

The League System must be scalable, secure, fair, and capable of supporting millions of participants across multiple competitions.

---

# Goals

The League System should:

• Encourage weekly engagement

• Create friendly competition

• Increase user retention

• Reward consistent performance

• Support communities

• Promote sharing and invitations

---

# League Types

TACTIX supports multiple league formats.

---

## Classic League (MVP)

Managers compete based on cumulative fantasy points earned throughout the season.

Winner

Highest total points after the final gameweek.

Supported

✅ Version 1

---

## Head-to-Head League

Managers are paired each gameweek.

Highest weekly score wins the match.

Scoring

Win

3 Points

Draw

1 Point

Loss

0 Points

Supported

🚀 Version 2

---

## Knockout Cup

Managers compete in elimination rounds.

Lowest weekly score is eliminated.

Supported

🚀 Future Version

---

## Club Supporters League

League automatically groups supporters of the same club.

Example

Wydad Fans

Raja Fans

AS FAR Fans

Supported

🚀 Future Version

---

## Friends League

Invite-only league.

Created by any registered user.

Supported

✅ Version 1

---

# League Creation

Any registered manager may create a league.

Required Fields

League Name

League Type

Visibility

Maximum Members

League Logo (Optional)

Description (Optional)

---

Validation

League Name

3–40 characters

Unique within owner account

No offensive language

Maximum Members

Minimum

2

Maximum

500

---

# Visibility

Public

Anyone may join.

Private

Invitation required.

Hidden

Accessible only through direct invitation.

---

# Join Methods

Supported

Invitation Code

Deep Link

QR Code

Direct Invitation

Share Link

Example

TACTIX://league/AB12CD

---

# League Owner Permissions

League owners can:

Edit league name

Update description

Change logo

Approve requests (if enabled)

Remove members

Transfer ownership

Delete league

Generate invitation links

Reset invitation codes

Pin announcements

---

# Member Permissions

Members may:

View leaderboard

View manager profiles

Leave league

Invite others (optional)

React to announcements

Report inappropriate behavior

---

# League Capacity

Default

100 Members

Premium League Owners

Maximum

500 Members

Business Rule

Increasing capacity does not affect existing rankings.

---

# League Dashboard

Displays

League Name

Logo

Current Gameweek

Member Count

Owner

Season Progress

Announcements

Leaderboard

Upcoming Fixtures

Weekly Awards

Recent Activity

---

# Leaderboard

Displays

Rank

Manager

Team Name

Gameweek Points

Total Points

Rank Change

Captain

Transfer Penalties

Badge

Top 3 receive special highlighting.

---

# Rank Indicators

▲ Green

Rank Improved

▼ Red

Rank Dropped

▬ Gray

No Change

---

# Weekly Awards

Automatically generated.

Examples

Highest Weekly Score

Best Captain

Best Differential

Best Bench

Most Improved Rank

Most Consistent Manager

Longest Green Arrow Streak

Supported

🚀 Version 2

---

# League Announcements

Owners may publish announcements.

Examples

"Deadline Friday at 18:30."

"Prize ceremony after Gameweek 30."

Maximum Length

500 characters

Pinned announcements remain visible until removed.

---

# Invitations

Invitation Methods

Copy Link

QR Code

Share Sheet

Email

WhatsApp

Telegram

Discord

Invitation links may expire.

---

# Join Requests

Optional

Public leagues may require approval.

States

Pending

Approved

Rejected

Expired

---

# League Search

Filters

League Name

Language

Country

Competition

Visibility

Member Count

Recently Created

Trending

---

# League History

Stores

Previous Champions

Season Rankings

Member Statistics

Historic Records

Longest Winning Streak

Highest Weekly Score

Largest Rank Increase

---

# Rivalries

Future Feature

Managers may declare rivals.

Special statistics include:

Head-to-head wins

Average score difference

Longest winning streak

Season record

---

# League Notifications

Examples

Invitation Received

Invitation Accepted

Member Joined

Member Left

Owner Changed

League Deleted

Announcement Published

Weekly Results

Season Champion

---

# Moderation

Owners may

Mute members (future chat)

Remove members

Report abuse

Block invitations

Administrators may

Suspend leagues

Delete offensive content

Ban abusive users

---

# Fair Play Rules

Managers cannot:

Create duplicate accounts

Manipulate rankings

Exploit scoring bugs

Use automated scripts

Share accounts

Any detected abuse is reviewed by administrators.

Penalties may include:

Warning

Point deduction

League removal

Temporary suspension

Permanent account ban

---

# League Analytics

Track

Leagues Created

Average Members

Invite Acceptance Rate

Weekly Active Members

Average Weekly Score

Retention

Most Active Leagues

Most Shared Leagues

---

# Empty States

No Leagues

↓

Prompt

"Join or create your first league."

No Members

↓

Prompt

"Invite your friends."

No Results

↓

Display

"No leagues found."

---

# Offline Mode

Available

View cached leaderboard

View cached standings

Unavailable

Join league

Create league

Invite members

Publish announcements

---

# Error Handling

League Full

↓

Display

"This league has reached its maximum capacity."

Invalid Invitation

↓

Display

"This invitation is no longer valid."

Already Joined

↓

Display

"You are already a member of this league."

Network Failure

↓

Retry

---

# Performance Requirements

Open League

<1 second

Leaderboard Refresh

<500 ms

Invite Generation

<300 ms

Search

<500 ms

Member Sync

Real Time

---

# Accessibility

Supports

Screen Readers

RTL

Large Fonts

High Contrast

VoiceOver

TalkBack

Keyboard Navigation (Web)

---

# Acceptance Criteria

✓ Users can create leagues.

✓ Users can join via invitation code or link.

✓ Leaderboards update automatically after scoring changes.

✓ Owners can manage league settings.

✓ Duplicate memberships are prevented.

✓ League statistics remain accurate.

✓ Notifications are delivered correctly.

✓ Fair play rules are enforced.

---

# Future Improvements

• Head-to-head competitions

• Knockout cups

• Club supporter leagues

• League chat

• Polls

• Weekly MVP voting

• Custom league trophies

• League sponsorships

• Team jerseys

• Seasonal league archives

---

# Dependencies

Fantasy Engine

Authentication

Notifications

Search

User Profiles

Analytics

Admin Panel

Real-Time Engine

# 25. Competition Center & Rankings

---

# Objective

The Competition Center is the competitive hub of TACTIX.

It provides every ranking, league, challenge, and competition in a single location, allowing managers to track their progress throughout the season.

The Competition Center must encourage continuous engagement, celebrate achievements, and make competition easy to understand regardless of the user's experience level.

---

# Goals

The Competition Center should:

• Centralize all competitions

• Encourage weekly participation

• Increase retention

• Highlight progress

• Celebrate achievements

• Promote friendly rivalry

• Make rankings transparent

---

# Navigation

Competition Center

↓

Overview

↓

Global Ranking

↓

National Ranking

↓

Friends

↓

Private Leagues

↓

Public Leagues

↓

Weekly Challenges

↓

Achievements

↓

Season History

Future

↓

Head-to-Head

↓

Knockout Cup

↓

Club Supporters League

---

# Competition Overview

Purpose

Provide a summary of every competition the manager participates in.

Widgets

Current Overall Rank

Best League Position

Current Gameweek Rank

Season Progress

Weekly Challenge Progress

Achievements

Upcoming Deadlines

Recent Rank Changes

AI Competition Insights

---

# Global Ranking

Displays

Overall Position

Total Points

Gameweek Points

Rank Change

Manager Name

Team Name

Country

Badge

---

Filters

Global

Country

Favorite Club

Friends

Verified Managers

Premium Members (optional cosmetic filter)

---

Sorting

Total Points

Gameweek Points

Rank Change

Team Value

Alphabetical

---

# National Ranking

Displays managers from the same country.

Purpose

Promote local competition.

Example

Morocco

Rank

1

Manager

Youssef

Points

1348

---

Future Expansion

Automatic country detection

Manual country selection

Regional rankings

City rankings

---

# Friends Ranking

Displays only accepted friends.

Statistics

Weekly Points

Season Points

Rank Change

Current Captain

Current Form

---

Actions

View Team

Compare Teams

Send Message (Future)

Challenge Friend (Future)

---

# Private Leagues

Displays

League Name

Current Rank

Total Members

League Logo

Recent Activity

Button

Open League

---

# Public Leagues

Categories

Most Popular

Trending

Official

Sponsored

Beginner Friendly

Nearby (Future)

---

# Weekly Challenge Rankings

Displays progress for active weekly challenges.

Example

Score 70+

Current

61

Remaining

9

Leaderboard

Reward

Completion Rate

---

# Achievements

Displays

Unlocked

Locked

Progress

Categories

Season

League

Transfers

Captain

Consistency

Community

Special Events

---

# Season History

Purpose

Allow managers to review previous seasons.

Displays

Season

Final Rank

Total Points

League Wins

Achievements

Best Captain

Highest Weekly Score

Transfers Made

Team Value

---

# Ranking Card

Each manager card contains

Avatar

Manager Name

Team Name

Rank

Total Points

Gameweek Points

Rank Movement

Country Flag

Favorite Club

Badges

---

# Rank Movement

Positive

Green

▲ +125

Negative

Red

▼ -87

No Change

Gray

▬

---

# AI Competition Insights

TACTIX AI analyzes rankings.

Examples

"You are only 8 points away from the Top 100."

"You have gained 214 places this gameweek."

"A captain differential could help you overtake the league leader."

"The league leader has already used their Wildcard."

---

# Ranking Updates

Live rankings update after every official scoring event.

Updates include

Total Points

Gameweek Points

Rank Changes

League Positions

Challenge Progress

Achievement Progress

---

# Ranking Tie-Breakers

If managers have equal points:

1. Fewer transfer penalties

2. Higher Gameweek score

3. Lower total team value

4. Earlier team creation date

If still equal

Managers share the same rank.

---

# Awards

Automatically generated after each gameweek.

Examples

Highest Weekly Score

Biggest Rank Increase

Best Captain

Best Differential

Best Bench

Most Consistent

Most Improved

---

# Hall of Fame

Displays

All-time records.

Categories

Highest Season Score

Most League Titles

Longest Winning Streak

Most Top 100 Finishes

Highest Team Value

Most Achievements

---

# Search

Competition search supports

Managers

Leagues

Challenges

Season Archives

---

# Filters

Time

Current Gameweek

Current Season

Previous Season

All Time

Scope

Global

Country

Friends

League

Challenge

---

# Empty States

No Friends

↓

"Add friends to compare your progress."

No Achievements

↓

"Keep playing to unlock your first achievement."

No Active Challenges

↓

"New challenges will appear next gameweek."

---

# Notifications

Examples

You entered the Top 100.

You became first in your league.

You lost first place.

Challenge completed.

Achievement unlocked.

New season started.

---

# Offline Mode

Available

Cached rankings

Cached achievements

Cached history

Unavailable

Live ranking updates

Challenge submissions

Leaderboard refresh

---

# Performance Requirements

Ranking refresh

< 2 seconds

Leaderboard load

< 1 second

Search

< 500 ms

Rank calculation

Real Time

---

# Accessibility

Supports

Screen Readers

Large Text

RTL

VoiceOver

TalkBack

Color-Blind Indicators

---

# Analytics

Track

Competition Center Opens

Leaderboard Views

Ranking Filter Usage

Challenge Participation

Achievement Views

Season History Opens

Friend Comparisons

League Opens

AI Insight Clicks

---

# Security

Rankings are read-only for users.

Only authorized backend services may calculate or modify rankings.

Manual adjustments require administrator approval and are recorded in the audit log.

---

# Acceptance Criteria

✓ Rankings update automatically after score changes.

✓ Tie-breakers are applied consistently.

✓ Competition Center displays all relevant competitions.

✓ Historical seasons remain accessible.

✓ AI insights reflect current competition data.

✓ Awards are generated correctly.

✓ Search and filters perform within defined limits.

---

# Future Improvements

• Regional rankings

• Club supporter rankings

• University rankings

• Corporate leagues

• Verified creator leagues

• Esports-style seasonal divisions

• Promotion & relegation between divisions

• Fantasy World Championship

---

# Dependencies

Fantasy Engine

League System

User Profiles

Analytics

Notifications

AI Assistant

Admin Panel

Real-Time Engine

# 26. Discover Module

---

# Objective

The Discover Module serves as the primary exploration hub within TACTIX.

It enables managers to discover players, clubs, fixtures, statistics, football news, AI insights, and trends that help them make informed fantasy decisions.

Unlike the Home screen, which is personalized, the Discover Module provides a broader view of the football ecosystem and supports both casual browsing and advanced research.

---

# Goals

The Discover Module should:

• Help users discover valuable fantasy players

• Surface important football news

• Provide comprehensive statistics

• Make searching fast and intuitive

• Support data-driven decision making

• Highlight trending content

• Increase daily engagement

---

# Navigation Structure

Discover

↓

Search

↓

Players

↓

Clubs

↓

Fixtures

↓

Live Matches

↓

Statistics

↓

News

↓

Trending

↓

TACTIX AI Insights

---

# Layout

The Discover screen contains the following sections:

Search Bar

↓

Quick Filters

↓

Trending Players

↓

Trending Clubs

↓

Featured Fixtures

↓

Latest News

↓

Player Statistics

↓

TACTIX AI Recommendations

↓

Popular Searches

↓

Recently Viewed

---

# Search Bar

The search bar is always visible at the top of the screen.

Users may search for:

• Players

• Clubs

• Fixtures

• Managers

• Leagues

• Articles

• Stadiums

• Coaches (Future)

Search should provide live suggestions as users type.

---

# Search Behavior

Results begin appearing after two typed characters.

Suggestions are ranked by:

• Exact match

• Popularity

• Fantasy relevance

• Recent searches

• User preferences

Search history is stored locally and synchronized across devices.

---

# Quick Filters

Available filters include:

Players

Clubs

Fixtures

News

Statistics

Transfers

Trending

Favorites

AI Picks

Users may combine multiple filters.

---

# Trending Players

Displays players with significant fantasy activity.

Metrics include:

• Most Transferred In

• Most Transferred Out

• Highest Form

• Biggest Price Rise

• Biggest Price Drop

• Most Selected Captains

• Highest Ownership

Each player card displays:

Photo

Club

Position

Price

Form

Ownership

Upcoming Fixture

Availability Status

---

# Trending Clubs

Displays clubs based on:

Current Form

Goals Scored

Clean Sheets

Upcoming Fixtures

Fixture Difficulty

Current League Position

Recent Results

---

# Featured Fixtures

Highlights important matches.

Examples

Top of the Table

Derby Matches

High Fantasy Impact

CAF Competitions (Future)

Each fixture displays:

Kickoff Time

Venue

Competition

Live Status

Fantasy Difficulty

Expected Goals (Future)

---

# Live Matches

When matches are in progress, a dedicated section appears.

Displays:

Current Score

Minute

Goals

Cards

Substitutions

Fantasy Events

Bonus Points

Users can tap any match to open the Match Center.

---

# Latest News

News Categories

Breaking News

Transfers

Injuries

Suspensions

Manager Interviews

Press Conferences

Club Announcements

Fantasy Tips

Each article displays:

Headline

Source

Published Time

Reading Time

Related Players

Related Clubs

---

# Player Statistics

Users may browse statistics by category.

Categories

Goals

Assists

Minutes

Clean Sheets

Saves

Yellow Cards

Red Cards

Expected Goals (Future)

Expected Assists (Future)

Fantasy Points

Bonus Points

Price Changes

Ownership

---

# Comparison Tool

Users can compare up to four players.

Comparison includes:

Price

Position

Club

Goals

Assists

Fantasy Points

Ownership

Form

Upcoming Fixtures

Expected Points

Price Trend

AI Recommendation

---

# TACTIX AI Insights

Displays personalized insights.

Examples

Best Budget Midfielders

Captain Picks

Differential Players

Hidden Gems

Avoid This Week

Fixture Difficulty Analysis

Transfer Recommendations

Each recommendation explains **why** it was generated.

---

# Popular Searches

Displays trending searches.

Examples

Rahimi

El Kaabi

Wydad

Raja

Top Scorers

Gameweek 15

---

# Recently Viewed

Displays:

Recently viewed players

Clubs

Fixtures

Articles

Searches

History can be cleared by the user.

---

# Favorites

Users may save:

Players

Clubs

Articles

Fixtures

Saved content synchronizes across devices.

---

# Personalization

Discover content adapts to:

Favorite Club

Fantasy Squad

Language

Country

Previous Searches

Favorite Players

Premium Status

Current Gameweek

---

# Search Filters

Users may filter players by:

Position

Club

Price

Price Range

Ownership

Points

Form

Goals

Assists

Clean Sheets

Minutes Played

Fixture Difficulty

Availability

Premium Only Statistics

---

# Sorting

Sort by:

Highest Points

Lowest Price

Highest Form

Most Selected

Highest Ownership

Most Transferred

Alphabetical

Price Increase

Price Decrease

Expected Points

---

# Empty States

No Search Results

↓

"No results found."

Suggestions:

Check spelling

Remove filters

Try another keyword

---

No Favorites

↓

"You haven't saved any players yet."

Button

Browse Players

---

No News

↓

"No news available at the moment."

---

# Offline Mode

Available:

Cached Players

Cached Clubs

Cached Articles

Cached Statistics

Unavailable:

Live Search

Live Matches

AI Recommendations

Live News

Banner

"You are viewing cached information."

---

# Error Handling

Search Failed

↓

Retry

News Failed

↓

Reload

Statistics Failed

↓

Display Cached Data

AI Unavailable

↓

Display Friendly Message

---

# Notifications Integration

Examples

Player Price Changed

Player Injured

Breaking News

Fixture Updated

Favorite Club News

Transfer Window Open

Trending Player Alert

---

# Performance Requirements

Search Suggestions

<200 ms

Player Search

<500 ms

Discover Screen Load

<2 seconds

Statistics Load

<1 second

Smooth Scrolling

60 FPS

---

# Accessibility

Supports

RTL

Screen Readers

Large Fonts

Color-Blind Indicators

VoiceOver

TalkBack

Keyboard Navigation (Web)

Dynamic Text Scaling

---

# Analytics

Track

Searches

Player Views

Club Views

Article Opens

Comparison Tool Usage

AI Recommendation Clicks

Favorite Actions

Filter Usage

Trending Card Clicks

Average Session Time

---

# Security

Search requests are rate-limited.

Personalized recommendations never expose private user data.

News and statistics APIs are validated before display.

---

# Acceptance Criteria

✓ Search returns relevant results within defined performance targets.

✓ Filters operate correctly.

✓ Comparison tool supports up to four players.

✓ Personalized recommendations are displayed accurately.

✓ Cached data is available offline.

✓ Favorites synchronize across devices.

✓ Analytics events are recorded.

---

# Future Improvements

• Voice Search

• AI-powered natural language search

• Image-based player recognition

• Advanced statistical dashboards

• Heat Maps

• Tactical Visualizations

• Transfer Rumor Tracker

• Stadium Explorer

• Match Prediction Center

• Fantasy Draft Assistant

---

# Dependencies

Search Engine

Player Database

Club Database

Statistics Service

News Service

AI Assistant

Authentication

Analytics

Caching Layer

# 27. Player Profile

---

# Objective

The Player Profile provides a complete view of an individual football player from both a football and fantasy perspective.

It enables managers to evaluate a player before transferring them, selecting them as captain, or comparing them with alternatives.

The Player Profile must become the single source of truth for every player in TACTIX.

---

# Goals

The Player Profile should allow managers to:

• Understand a player's current form

• Evaluate fantasy value

• Analyze historical performance

• Compare with other players

• Understand fixture difficulty

• Track price changes

• Read football news

• Receive AI-powered recommendations

---

# Navigation

Discover

↓

Players

↓

Player Profile

Users may also access a player profile from:

• My Team

• Transfers

• Match Center

• Competition Rankings

• Search

• AI Recommendations

• News Articles

---

# Screen Layout

Player Header

↓

Season Summary

↓

Fantasy Overview

↓

Upcoming Fixtures

↓

Performance Trends

↓

Detailed Statistics

↓

Price History

↓

Ownership Trends

↓

Recent Matches

↓

AI Analysis

↓

Similar Players

↓

Related News

↓

Actions

---

# Player Header

Displays

• Player Photo

• Full Name

• Club

• Position

• Shirt Number

• Nationality

• Age

• Market Price (Fantasy)

• Availability Status

• Ownership Percentage

• Fantasy Points

• Favorite Button

• Share Button

---

# Status Indicators

Green

Available

Yellow

Doubtful

Red

Injured

Gray

Suspended

Blue

International Duty

Purple

Blank Gameweek

Gold

Double Gameweek

---

# Season Summary

Displays

Games Played

Minutes

Goals

Assists

Fantasy Points

Average Points

Price

Current Form

Clean Sheets (GK/DEF)

Saves (GK)

Goals Conceded (GK/DEF)

Yellow Cards

Red Cards

Penalty Goals

Penalty Misses

Own Goals

---

# Fantasy Overview

Displays

Current Price

Price Change

Season Value Gain

Ownership

Captain Percentage

Vice Captain Percentage

Transfer In %

Transfer Out %

Expected Points (AI)

Risk Level

---

# Fixture Difficulty

Displays the next 5 fixtures.

Each fixture includes:

Opponent

Home/Away

Kickoff

Difficulty Rating (1–5)

Competition

AI Expected Return

Users can expand to view the full season schedule.

---

# Performance Trend

Interactive chart displaying:

Fantasy Points

Goals

Assists

Minutes

Price

Users may switch between:

Last 5 Matches

Last 10 Matches

Season

Custom Range

---

# Match Log

Each row displays:

Opponent

Home/Away

Minutes Played

Goals

Assists

Fantasy Points

Bonus Points

Cards

Clean Sheet

Price at Match

Match Rating (Future)

Users can sort and filter the log.

---

# Advanced Statistics

Available metrics:

Goals

Assists

Shots

Shots on Target

Key Passes

Crosses

Successful Dribbles

Touches in Box

Recoveries

Interceptions

Tackles

Clearances

Blocks

Pass Accuracy

Duels Won

Fouls

Cards

Expected Goals (Future)

Expected Assists (Future)

---

# Price History

Interactive chart.

Displays:

Current Price

Highest Price

Lowest Price

Daily Price Changes

Weekly Price Changes

Season Trend

Price change events are timestamped.

---

# Ownership Trends

Displays:

Current Ownership

Ownership Change

Transfers In

Transfers Out

Captain Selection %

Vice Captain %

Popularity Trend

Regional Ownership (Future)

---

# Injury & Suspension

Displays:

Current Status

Injury Type

Expected Return Date

Training Status

Suspension Reason

Matches Remaining

Medical Updates

Club Statements

---

# AI Analysis

TACTIX AI provides contextual insights.

Examples

"This player has returned attacking points in four consecutive matches."

"His next three fixtures have a low average defensive rating."

"Ownership is increasing rapidly."

"This player is a strong differential for the upcoming gameweek."

"Expected to lose value if transferred out by many managers."

Every recommendation includes an explanation.

---

# Similar Players

Suggests players based on:

Position

Price

Fantasy Points

Playing Style

Club

Form

Expected Points

Each suggestion displays:

Price Difference

Points Difference

Ownership Difference

Fixture Difficulty

AI Recommendation

---

# Comparison Tool

Managers may compare up to four players.

Comparison Categories

Price

Goals

Assists

Fantasy Points

Form

Ownership

Upcoming Fixtures

Price Trend

Availability

Expected Points

Visual charts should highlight differences.

---

# Related News

Displays articles linked to the player.

Categories

Transfers

Injuries

Press Conferences

Interviews

Match Reports

Fantasy Tips

Articles are ordered by relevance and recency.

---

# User Actions

Users may:

Add to Watchlist

Remove from Watchlist

Transfer In

Transfer Out

Compare

Share Profile

View Club

Open Match History

View Statistics

Open AI Chat

---

# Watchlist

Users can save players for later.

Watchlisted players generate optional notifications for:

Price Changes

Injuries

Suspensions

Goals

Assists

Breaking News

---

# Personalization

The profile adapts to:

Manager's Fantasy Team

Favorite Club

Language

Competition

Current Gameweek

Premium Status

Example

If the player is already in the manager's team:

Display

"Already in your squad."

If not:

Display

"Available to transfer."

---

# Offline Mode

Available

Cached Profile

Cached Statistics

Cached Fixtures

Cached News

Unavailable

Live Price Updates

AI Analysis

Real-Time Statistics

---

# Loading State

Display

Skeleton Header

Skeleton Charts

Skeleton Statistics

Loading animation should never block scrolling.

---

# Empty States

No Statistics

↓

"No statistics available yet."

No News

↓

"No recent news."

No Fixtures

↓

"Schedule not yet announced."

---

# Error Handling

Profile Failed

↓

Retry

Statistics Failed

↓

Display Cached Data

News Failed

↓

Retry

AI Failed

↓

Hide AI Card

Show Friendly Message

---

# Notifications Integration

Examples

Price Increased

Price Decreased

Player Injured

Player Returned

Suspension Lifted

Goal Scored

Hat-Trick

Breaking News

---

# Performance Requirements

Profile Load

<1 second

Statistics

<500 ms

Charts

<300 ms

Scrolling

60 FPS

Image Loading

Progressive

Caching

Enabled

---

# Accessibility

Supports

Screen Readers

RTL

VoiceOver

TalkBack

Large Text

Color-Blind Indicators

Keyboard Navigation (Web)

Dynamic Font Scaling

---

# Analytics

Track

Player Profile Opens

Time on Profile

Comparison Usage

Watchlist Adds

Transfer Button Clicks

AI Analysis Opens

Chart Interactions

News Opens

Share Actions

---

# Security

Player data is read-only.

Official statistics are immutable once finalized.

Any post-match corrections must follow the Fantasy Engine recalculation process and be recorded in the audit log.

---

# Acceptance Criteria

✓ Player data is accurate and synchronized with official sources.

✓ Charts render correctly across supported devices.

✓ Comparison tool functions correctly.

✓ AI recommendations are personalized and explainable.

✓ Watchlist notifications are delivered.

✓ Offline mode displays cached content.

✓ Performance targets are met.

---

# Future Improvements

• Video highlights

• Tactical heat maps

• Passing networks

• Shot maps

• Injury probability model

• AI performance forecasts

• Social comments

• Community ratings

• Scouting reports

• Historical career statistics

---

# Dependencies

Fantasy Engine

Statistics Service

Player Database

News Service

Search Engine

AI Assistant

Notifications

Caching Layer

Analytics

Authentication

# 28. Club Profile

---

# Objective

The Club Profile provides a complete overview of a football club participating in supported competitions.

It combines club information, squad details, fixtures, statistics, form, and fantasy insights, enabling managers to better evaluate players and upcoming fixtures.

The Club Profile serves as the authoritative source for club-related information within TACTIX.

---

# Goals

The Club Profile should enable managers to:

• Explore club information

• Analyze squad depth

• Review current form

• Evaluate fixture difficulty

• Monitor fantasy-relevant trends

• Follow favorite clubs

• Access club news

---

# Navigation

Discover

↓

Clubs

↓

Club Profile

Users may also access a club profile from:

• Player Profile

• Match Center

• Fixtures

• Search

• News

• AI Recommendations

---

# Screen Layout

Club Header

↓

Season Overview

↓

League Position

↓

Current Form

↓

Upcoming Fixtures

↓

Squad

↓

Club Statistics

↓

Fantasy Assets

↓

TACTIX AI Analysis

↓

Recent Matches

↓

Related News

↓

Actions

---

# Club Header

Displays

• Club Logo

• Club Name

• Nickname (Optional)

• City

• Country

• Founded Year

• Stadium

• Head Coach

• League Position

• Favorite Button

• Share Button

---

# Club Identity

Displays

Primary Colors

Secondary Colors

Home Kit

Away Kit

Official Competition

Supporters Count (Future)

Official Website (Future)

Social Media (Future)

---

# Season Overview

Displays

Matches Played

Wins

Draws

Losses

Goals Scored

Goals Conceded

Goal Difference

Points

League Position

Current Form

---

# League Position

Displays

Current Rank

Points

Games Played

Goal Difference

Position Change

Qualification Status

Examples

Champions League Qualification

CAF Confederation Qualification

Relegation Zone

---

# Current Form

Displays the last five matches.

Indicators

W

Win

D

Draw

L

Loss

Additional Metrics

Goals Scored

Goals Conceded

Clean Sheets

Average Fantasy Points

---

# Upcoming Fixtures

Displays the next five fixtures.

Each fixture includes

Opponent

Competition

Kickoff

Home/Away

Difficulty Rating

Expected Goals (Future)

TACTIX Fixture Rating

---

# Fixture Difficulty

Each match receives a rating from 1 to 5.

1

Very Easy

2

Easy

3

Balanced

4

Difficult

5

Very Difficult

The rating considers:

Opponent strength

Recent form

Home advantage

Defensive record

Attacking record

Historical performance

Future versions may include predictive models.

---

# Squad

Displays all registered players.

Each player card includes:

Photo

Name

Position

Age

Fantasy Price

Fantasy Points

Availability

Current Form

Ownership

Users may:

Open Player Profile

Compare Players

Transfer In

Add to Watchlist

---

# Squad Filters

Position

Goalkeepers

Defenders

Midfielders

Forwards

Availability

Price Range

Fantasy Points

Form

Alphabetical

---

# Club Statistics

Displays

Goals

Assists

Clean Sheets

Goals Conceded

Shots

Shots on Target

Corners

Possession

Pass Accuracy

Expected Goals (Future)

Expected Assists (Future)

Disciplinary Record

Average Fantasy Points

---

# Fantasy Assets

Highlights the club's most valuable fantasy players.

Categories

Top Scorer

Top Assist Provider

Highest Fantasy Points

Best Budget Option

Most Selected

Best Differential

Best Captain Choice

Most Improved

Each recommendation links directly to the Player Profile.

---

# TACTIX AI Analysis

TACTIX AI evaluates the club.

Examples

"This club has the easiest upcoming fixture schedule."

"Three consecutive home matches increase fantasy potential."

"Defensive assets have returned four clean sheets in the last six matches."

"Midfielders from this club are currently outperforming league averages."

All recommendations include supporting reasoning.

---

# Recent Matches

Displays:

Opponent

Competition

Result

Goals

Possession

Shots

Fantasy Impact

Users may open the Match Center for complete details.

---

# Club News

Displays articles related to the club.

Categories

Transfers

Injuries

Coach Interviews

Press Conferences

Club Announcements

Match Reports

Fantasy Insights

Articles are sorted by:

Relevance

Publication Date

Fantasy Impact

---

# User Actions

Users may:

Follow Club

Unfollow Club

Share Profile

View Squad

Open Fixtures

Open Statistics

View Stadium Information (Future)

Open AI Chat

---

# Favorite Club

Managers may select one favorite club.

Benefits

Personalized News

Club Notifications

Preferred Discover Content

Customized Home Widgets

Future

Supporter Leagues

Club Challenges

Exclusive Themes

---

# Personalization

The Club Profile adapts to:

Favorite Club

Language

Competition

Fantasy Team

Premium Status

Current Gameweek

---

# Offline Mode

Available

Cached Squad

Cached Fixtures

Cached Statistics

Cached News

Unavailable

Live Match Updates

AI Analysis

Real-Time Statistics

---

# Loading State

Display

Skeleton Header

Skeleton Squad

Skeleton Statistics

Skeleton Fixtures

Content loads progressively.

---

# Empty States

No Squad

↓

"Squad information is currently unavailable."

No News

↓

"No recent news."

No Fixtures

↓

"No upcoming fixtures scheduled."

---

# Error Handling

Fixtures Failed

↓

Retry

Statistics Failed

↓

Show Cached Data

News Failed

↓

Retry

AI Failed

↓

Hide AI Widget

Display Friendly Message

---

# Notifications

Examples

Favorite Club Match Starting

Breaking Club News

Coach Changed

Player Injured

Transfer Completed

Fixture Updated

Clean Sheet Achieved

---

# Performance Requirements

Club Profile Load

<1 second

Squad Load

<500 ms

Statistics

<500 ms

Smooth Scrolling

60 FPS

Image Loading

Progressive

Caching

Enabled

---

# Accessibility

Supports

Screen Readers

RTL

VoiceOver

TalkBack

Large Text

Color-Blind Indicators

Dynamic Font Scaling

Keyboard Navigation (Web)

---

# Analytics

Track

Club Profile Opens

Favorite Club Selection

Squad Views

Fixture Opens

Player Card Clicks

AI Analysis Opens

News Opens

Share Actions

Time on Screen

---

# Security

Club information is read-only.

Official standings and statistics may only be updated by authorized backend services.

All changes originating from official data providers must be logged for audit purposes.

---

# Acceptance Criteria

✓ Club information is accurate and synchronized.

✓ Squad reflects the latest registered players.

✓ Fixture difficulty ratings display correctly.

✓ AI recommendations include explanations.

✓ Favorite club preferences synchronize across devices.

✓ Cached content is available offline.

✓ Performance targets are satisfied.

---

# Future Improvements

• Stadium virtual tours

• Club trophy history

• Youth academy overview

• Women's team support

• Club financial overview

• Tactical formations

• Heat maps

• Fan community

• Club podcasts

• Official merchandise integration

---

# Dependencies

Club Database

Player Database

Fixture Service

Statistics Service

News Service

AI Assistant

Authentication

Analytics

Caching Layer

Notifications

---

# 29. Match Center

---

# Objective

The Match Center provides a complete live match experience for every Botola Pro fixture.

It combines live scores, minute-by-minute events, statistics, lineups, and fantasy-relevant updates in a single destination.

The Match Center transforms passive viewing into an active fantasy experience by connecting real match events directly to fantasy point calculations.

---

# Goals

The Match Center should:

• Provide accurate live scores and match events

• Display confirmed lineups and substitutes

• Show live fantasy points alongside match events

• Keep users informed during every minute of the match

• Support pre-match, live, and post-match states

• Deliver a fast and reliable experience during high-traffic match windows

• Help managers understand how match events affect their fantasy teams

---

# Navigation

Match Center is accessible from multiple entry points.

Entry Points

• Home dashboard live match cards

• Upcoming fixtures list

• League fixture schedules

• Club profile fixtures section

• Player profile match log

• Push notifications during live matches

• Global search results

Navigation Structure

Match Center Home

↓

Match Detail

↓

Tabs

↓

Overview

Live Events

Lineups

Statistics

Fantasy Impact

---

# Match States

Every match passes through five states.

Pre-Match

Before kickoff.

Live

During the match.

Half-Time

Between halves.

Full-Time

After the final whistle.

Postponed

Match postponed or cancelled.

---

## Pre-Match State

Displayed content:

• Kickoff time and date

• Venue and city

• Referee

• Confirmed lineups (when released)

• Predicted lineups (when available)

• Team news and injury updates

• Head-to-head record

• League standings context

• Match statistics preview

• Fantasy relevance summary

Countdown displayed until kickoff.

---

## Live State

Displayed content:

• Current score

• Match clock

• Live event feed

• Formations

• Key statistics

• Live fantasy points for selected players

• Highlights (when available)

The screen updates in real time without manual refresh.

---

## Half-Time State

Displayed content:

• Half-time score

• First-half statistics

• First-half events

• Early fantasy points (interim)

Status indicator:

Half-Time

---

## Full-Time State

Displayed content:

• Final score

• Full match statistics

• Complete event feed

• Official fantasy points

• Man of the match (when available)

Status indicator:

Full-Time

The match remains viewable indefinitely.

---

## Postponed State

Displayed content:

• New date and time (when confirmed)

• Reason for postponement

• Status explanation

Fantasy treatment:

Follows the match cancellation rules defined in the Fantasy Engine.

---

# Match Detail Screen

## Screen Layout

Header

Club A vs Club B

Score

Clock

Status

↓

Tab Bar

Overview

Events

Lineups

Stats

Fantasy

↓

Tab Content

---

## Header

Displays:

• Club crests

• Club names

• Current score

• Match minute and status

• Competition badge

• Venue (when expanded)

• Live indicator (when live)

---

## Overview Tab

Combines the most relevant information.

Sections:

Score Summary

Scorers

Key Events

Statistics Snapshot

Fantasy Points Preview

Next Actions

---

## Events Tab

Displays a chronological feed.

Each event includes:

• Event type icon

• Minute

• Player name

• Club

• Event detail (assist, own goal, penalty, etc.)

Supported event types:

Goal

Own Goal

Penalty

Penalty Missed

Assist

Yellow Card

Second Yellow Card

Red Card

Substitution

Injury

Save

Clean Sheet Break

---

## Lineups Tab

Displays confirmed formations.

Features:

• Formation diagram

• Starting XI per club

• Substitutes list

• Player status indicators

• Player selection from lineups

Each player card links to the Player Profile.

---

## Stats Tab

Displays match statistics.

Core statistics:

Possession

Shots

Shots on Target

Corners

Fouls

Yellow Cards

Red Cards

Offsides

Passes

Pass Accuracy

Expected Goals (xG)

Expected Assists (xA)

Saves

Crosses

Tackles

---

## Fantasy Tab

Connects the match to fantasy gameplay.

Displays:

• Live points for players in the user's squad

• Point changes with reasons

• Current captain performance

• Squad players in this match

• Formations and status of squad players

Fantasy data is read-only during a live match.

---

# Live Event Feed

## Event Order

Events are displayed chronologically.

The most recent event appears at the bottom of the feed.

New events animate into the feed.

---

## Event Notification

Each event generates a system notification.

Rules:

• Goals trigger immediate notifications

• Cards trigger immediate notifications

• Substitutions trigger notifications when completed

• Other events follow the notification rules defined in the Notifications chapter

---

## Event Accuracy

Events originate from the official data provider.

Events marked as unofficial are hidden until confirmed.

Disputed events are flagged and corrected through the data correction workflow.

---

# Real-Time Behavior

## Data Source

Live data is delivered through a real-time connection.

Primary mechanism:

WebSocket

Fallback mechanism:

Periodic polling

Automatic reconnection with exponential backoff.

---

## Update Frequency

Live score and clock updates:

As events arrive.

Statistics updates:

Every 60 seconds during live play.

Fantasy points:

Recalculated on each event.

---

## Synchronization

The client and server synchronize through versioned payloads.

Out-of-order events are reordered by sequence numbers.

Duplicate events are ignored.

---

# Fantasy Integration

## Live Points

Every squad player appearing in this match displays:

• Current fantasy points

• Point breakdown (base points, bonus, deductions)

• Status (playing, benched, not involved)

---

## Point Breakdown

Expandable section showing:

Playing time

Goals

Assists

Clean sheet contribution

Saves (goalkeepers)

Penalty saves

Penalty misses

Bonus points

Card deductions

---

## Captain Indicator

The user's captain is highlighted in the fantasy panel.

Captain points are displayed as doubled.

Vice-captain activation status is shown when applicable.

---

# Pre-Match Features

## Kickoff Countdown

Displays time until kickoff.

Format:

HH:MM:SS

Refreshes every second.

---

## Lineup Availability

Lineups appear when released by the official source.

Predicted lineups are labeled as unofficial.

Lineup release notification is sent to followers of the involved clubs.

---

## Team News

Team news cards display:

• Injuries

• Suspensions

• Expected returns

• Manager statements (when available)

---

# Post-Match Features

## Final Statistics

Full match statistics are displayed.

Statistics are locked after verification.

---

## Fantasy Finalization

Official fantasy points are assigned after match verification.

Points are final unless corrected through the data correction workflow.

---

## Player Ratings

Ratings appear when provided by the data source.

Ratings are informational only.

Ratings do not affect fantasy points.

---

# Offline Mode

During a network loss:

• The last known score remains visible

• The last received events remain visible

• The match clock freezes

• A disconnected indicator appears

• Reconnection resumes automatically

Cached match data is displayed from local storage.

---

# Error Handling

## Data Provider Failure

If live data is unavailable:

• The system shows the last known state

• A delayed data indicator appears

• Points remain unchanged until data resumes

---

## Event Delivery Failure

If events fail to deliver:

• The client requests a state resynchronization

• The server sends the latest full state

• The client reconciles missed events

---

## Invalid Event

Invalid events are rejected.

Invalid events are logged for monitoring.

---

# Performance Requirements

Live updates must arrive within:

5 seconds

of the official event time.

The Match Detail screen must render initial content within:

2 seconds

on a mid-range device.

The live event feed must remain responsive during peak match windows.

The screen must remain smooth while updating every second during live matches.

---

# Accessibility

Live score updates must be announced by screen readers.

Color is never the only indicator of match state.

Touch targets on the pitch diagram must be at least:

44 x 44 px

Alternative text for club crests.

Reduced motion support for event animations.

---

# Analytics

Tracked events include:

• Match detail screen views

• Tab usage distribution

• Event feed interactions

• Lineup views

• Fantasy tab usage

• Time spent during live matches

• Notification click-through from matches

---

# Security

Match data is read-only for users.

Live data endpoints require authentication for fantasy content.

Public match data may be cached at the edge.

---

# Acceptance Criteria

✓ User can view any Botola fixture in all five states.

✓ Live scores and events update within 5 seconds.

✓ Lineups display when officially released.

✓ Fantasy points update live for squad players.

✓ Captain points display as doubled.

✓ Postponed matches follow fantasy cancellation rules.

✓ Offline mode preserves the last known state.

✓ Reconnection resumes automatically.

✓ The screen remains responsive during peak load.

✓ Screen readers announce live score changes.

---

# Future Improvements

• Match video highlights

• Live commentary feed

• xG timeline visualization

• Player heat maps

• Head-to-head live comparison

• VAR decision explanations

• Social live reactions

• Watch party features

---

# Dependencies

• Live data provider

• Real-time engine

• Fantasy Engine scoring

• Player and club databases

• Notification service

• Analytics service

---

# 30. News & Content

---

# Objective

The News & Content module keeps users informed about Botola Pro, their favorite clubs, and fantasy-relevant developments.

It delivers articles, match previews, reports, injury updates, and fantasy tips in an engaging, localized format.

---

# Goals

The News & Content module should:

• Provide timely and accurate football news

• Support multiple languages

• Surface fantasy-relevant information

• Keep users informed between gameweeks

• Increase session frequency

• Support content creators

• Maintain an editorial workflow

---

# Navigation

News is accessible from:

Home

↓

News Feed

↓

Article Detail

↓

Related Content

Also accessible from:

• Discover module news section

• Player profile related news

• Club profile club news

• Notification deep links

---

# Content Types

News & Content supports the following types.

Match News

• Previews

• Reviews

• Lineup news

• Post-match reactions

---

Club News

• Transfer announcements

• Manager statements

• Squad updates

• Club announcements

---

Fantasy Content

• Player recommendations

• Transfer tips

• Captain advice

• Gameweek guides

• Team analysis

---

League News

• Fixture announcements

• Scheduling changes

• League decisions

---

Player Content

• Profiles

• Interviews

• Performance analysis

• Injury updates

---

Features

• Themed editorials

• Historical retrospectives

• Community features

---

# Content Workflow

## Content Lifecycle

Draft

↓

Review

↓

Scheduled

↓

Published

↓

Archived

---

## Content States

Draft

Visible to editors only.

Review

Pending editorial approval.

Scheduled

Assigned publish date and time.

Published

Live for all users.

Archived

Removed from active feeds.

---

## Publishing Rules

Content must pass review before publishing.

Scheduling supports time zones:

Africa/Casablanca

Content must be available in at least one of:

Arabic

French

English

---

## Localization

Every published article may have multiple language versions.

Default language:

English

Supported languages:

Arabic

French

English

Major articles should offer all three.

---

# Content Feed

## Feed Composition

Home Feed

Personalized and mixed.

Discover News Feed

All recent articles.

Club News Feed

Articles from a selected club.

Fantasy Feed

Fantasy-specific content.

---

## Feed Ordering

Default:

Most recent first.

Optional:

Editorial pick.

Sponsored content is labeled clearly.

---

## Feed Refresh

Automatic refresh on new content.

Pull to refresh.

---

# Article Detail

## Layout

Header Image

Title

Author

Published Date

Est. Read Time

↓

Article Body

↓

Related Articles

↓

Share Actions

---

## Header

Displays:

• Cover image

• Title

• Category

• Reading time

• Author

• Date

---

## Body

Supports rich content:

Text

Images

Quotes

Lists

Data visualizations

Embedded video

---

## Actions

Users can:

• Like

• Save

• Share

• Report

• Comment (future)

---

# Save / Favorites

Users can save articles.

Saved articles appear in the profile area.

---

# Content Categories / Filters

Users can filter content by:

Category

Club

Competition

Language

Date

---

# Notifications

Categories can follow topics.

Follow actions:

• Owner activation

• Smart notifications

Users receive notifications for:

• Favorite clubs

• Fantasy players

• League news

---

# Moderation

Comment moderation

or content reports:

• Report reasons

• Remove inappropriate

Content policy

Community Guidelines

---

# Comments (Future)

Comments must be moderated.

Users can:
• Like
• Reply
• Report
• Block

---

# Engagement

Articles track:

Views

Read time

Likes

Shares

Saves

Click-through

---

# Search

News is searchable:

By keyword in title.

By keyword in body.

Search results include a News tab.

---

# Performance Requirements

Articles must load within:

2 seconds

Images optimized for mobile.

The feed must remain smooth during scroll.

---

# Accessibility

- Alt text on images
- High contrast
- Text contrast:
  ≥ 4.5:1
- Screen reader support
- Readable text size

---

# Analytics

Tracked:

Article views

Read time

Likes/shares/saves

Config variations (A/B)

Notifications clicks

Top categories

---

# Security

Content is read-only.

Publishing requires an editor role.

Serving is protected from unauthorized injection.

Content is marked-ad-safe.

---

# Acceptance Criteria

✓ All content types display correctly.

✓ Content publishes and schedules correctly.

✓ Content is localized in three languages.

✓ Users can save, like, and share articles.

✓ Notifications fire for followed topics.

✓ Comments (when enabled) are moderated.

✓ Offline mode shows cached articles.

---

# Future Improvements

• Video articles

• Podcast integration

• Community comments

• Live blog integration

• Push content targeting

---

# Dependencies

• Content Management System (CMS)

• Editorial team

• Notification service

• Search service

• Analytics service

---

# 31. TACTIX AI

---

# Objective

TACTIX AI is an intelligent layer that helps managers make informed decisions through data-driven recommendations and insights.

In Version 1, TACTIX AI is rule-based and statistics-driven rather than a conversational assistant. It generates captain recommendations, transfer suggestions, and performance insights from official match data.

---

# Goals

TACTIX AI should:

• Recommend captain choices with reasoning

• Suggest transfers based on player value

• Provide matchup and fixture insights

• Highlight trends and opportunities

• Explain every recommendation

• Respect budget and team constraints

• Improve over time as the platform grows

---

# Scope

## Included in Version 1

- Captain recommendation algorithm

- Transfer suggestion engine

- Fixture difficulty analysis

- Form analysis

- Price trend insights

- Ownership insight

- Injury impact warnings

---

## Not Included in Version 1

- Natural language chatbot

- Generative match commentary

- Predictive betting

- Streaming personalisation

- Advanced machine learning models

- User-to-user trading

These features belong to future phases.

---

# Recommendation Principles

Recommendations are guidance, not guarantees.

Recommendations are transparent and explainable.

Recommendations never override user control.

Recommendations respect team rules and budget.

Recommendations are based only on verified data.

Recommendations are never influenced by paid placements.

---

# Captain Recommendation

## Inputs

The captain recommendation uses:

• Expected points

• Fixture difficulty

• Home or away

• Player form

• Opposition defence strength

• Ownership trends

• Minutes played

• Update to price

---

## Output

Returns a shortlist of recommended captain candidates.

Each candidate includes:

Player name

Projected points

Confidence score

Reason

Alternative recommendation

---

## Confidence Indicators

High / Medium / Low

Determined by data quality and model output.

---

## Presentation

Recommendations appear:

- On the Home dashboard

- In the My Team module

- On the Player Profile

- In the AI Insights panel

All recommendations are labelled as AI-generated.

---

# Transfer Suggestions

## Logic

Transfer suggestions evaluate:

- Current points per million

- Bench and redundancy

- Fixture opportunity

- Projected price changes

- Form replacement needs

- Budget availability

- Squad constraints

---

## Output

Provides at most 3 suggestions per gameweek.

Each suggestion includes:

- Player to transfer out

- Player to transfer in

- Cost difference

- Projected benefit

- Reasoning

- Risk note

Suggestions respect:

- Budget limits
- Position limits (3 defenders maximum)
- Club limits (3 players per club maximum)
- Formation requirements

---

## Rules

Suggestions do not trigger automatically.

Users confirm before any transfer is applied.

---

# Fixture Difficulty Ranking

## Purpose

Attaches a difficulty score to each fixture.

Used in:

- Fixture difficulty indicators

- Scheduling planning

- Transfer recommendations

- Captain selection

---

## Scale

0 = easy

5 = hard

---

## Inputs

- Home or away
- Opposition strength
- Defence of opponent
- Attack of opponent
- Recent form
- Historical results

---

# Form

## Definition

Form is derived from recent:

- Fantasy points
- Appearances
- Statistics

Trailing window: realistic

Default: Last 6 games

---

## Form Score

Normalised to a consistent 0–10 point scale.

---

# Player Insights

Generates automatic insight tags.

Frame supports:

• In great form, e.g. 3 goals in last 2

• Plays without clean sheets for 4 games

• Has dropped in price twice in a month

• Faces easy fixtures

• High penalty blank

• Plays for a bottom club

• Returned from injury

---

# Gameweek Insights

Displays 4-6 short prediction cards, per gameweek.

Examples:

- Highest expected scorer this week
- Which defender has the best fixture
- A midfielder worth considering
- A player with a high transfer risk

---

# Data and Science

## Data Sources

- Official match data

- Historical stats

- Id name data for currently squad

Model updates are prohibited from live data.

---

## Label

Model is trained offline.

Runs in a batch process.

Scores every night after official data is updated.

---

## Confidence

Model prediction scores not exposed raw. Uniform categories used: High, Medium, Low.

---

# Privacy

AI is deterministic and transparent.

TACTIX AI never uses personal user data in bulk models.

Personalisation uses only within the app.

---

# Error Mitigation

## Low Data

If historical data is limited:

- Hide recommendations

- Show caution message

- Fallback to official season data

---

## Unavailable Service

If the AI service is down:

- Recommendations hidden

- Core fantasy features unaffected

- Cache last known returns

---

## Incorrect Data

Irregular input is rejected due to data corrections raising points.

---

# Analytics

Tracked:

• Recommendation impressions

• Recommendation acceptance rate

• Captain suggestion pick rate

• Suggestion rejection rate

• Engagement duration

---

# Acceptance Criteria

✓ Captain recommendations display with reasoning.

✓ Transfer suggestions respect all squad constraints.

✓ Fixture difficulty scores show consistently.

✓ All content is labelled as AI-generated.

✓ Recommendations never include paid placements.

✓ Service failure does not break core fantasy features.

✓ Users can dismiss or ignore AI suggestions.

---

# Future Improvements

## Phase Roadmap

- Conversational assistant

- Predictive scoring models

- News summarisation

- Automated content authoring

- Head-to-head analysis

- Draft analysis

- League insights

---

# Dependencies

• Fantasy Engine

• Scoring System

• Player and club data

• Fixture data

• Transfer rules

---

# 32. Gamification

---

# Objective

Gamification deepens engagement through achievements, badges, streaks, and rewards that recognize manager skill, dedication, and consistency.

Gamification is designed to reward football knowledge and activity without introducing pay-to-win mechanics.

---

# Goals

Gamification should:

• Reward participation and consistency

• Recognize skill and knowledge

• Encourage weekly engagement

• Strengthen community competition

• Provide satisfying progress feedback

• Never affect fantasy fairness

• Support seasonal and lifetime milestones

---

# Core Principles

Gamification must never:

• Influence points or rankings directly

• Be purchasable

• Create unfair advantages

All rewards are cosmetic or social.

---

# Achievement System

## Achievement Categories

Category

Description

---

Onboarding

Complete registration, profile setup, and first squad.

Weekly

Earn points, make transfers, hit milestones each gameweek.

Seasonal

Reach season-long milestones like total points or top-100 finishes.

Social

Invite friends, join leagues, share results.

Stat Mastery

Hit statistical milestones, e.g. 10 clean sheets, 100 goals scored.

Streak

Maintain consecutive weekly participation.

---

# Achievement Definition

Each achievement includes:

- Unique identifier
- Name
- Description
- Category
- Tier
- Icon
- Unlock condition
- Progress tracking
- Reward (badge, trophy, cosmetic)

---

# Achievement Tiers

Bronze

First milestone.

Silver

Intermediate milestone.

Gold

Advanced milestone.

Platinum

Elite milestone.

---

# Achievement States

Locked

Not yet earned.

In Progress

Progress tracked toward completion.

Earned

Unlocked and displayed.

Hidden

Surprise achievements revealed only when earned.

---

# Unlock Notifications

On unlock:

- A celebration animation appears
- A notification is sent
- The achievement is added to the profile

---

# Badges

## Badge Types

- Achievements badges
- Season badges
- Special event badges
- League champion badges

## Badge Display

Badges appear on:

- User profile
- League member lists
- Competition leaderboards
- Shared result cards

---

# Trophies

Trophies represent major milestones.

Examples:

- Season league winner
- Global top 100 finish
- Highest single-gameweek score
- Perfect gameweek (11/11 starters played)

---

# Streaks

## Weekly Streak

Tracked by active participation in consecutive gameweeks.

Active participation means:

- Squad is valid and locked
- At least one point earned

---

## Streak Reset

A streak resets when the manager:

- Misses a full gameweek without a valid squad
- Deletes their team (then starts a new streak)

---

## Streak Rewards

Longer streaks unlock cosmetic streak badges.

Examples:

3 consecutive gameweeks

10 consecutive gameweeks

20 consecutive gameweeks

Whole-season participation

---

# XP and Levels

## Experience Points

Managers earn XP for:

- Completing onboarding
- Making transfers
- Selecting captain each gameweek
- Joining leagues
- Inviting friends
- Reaching weekly point milestones

---

## Levels

XP accumulates into levels.

Levels provide:

- Level number
- Title
- Cosmetic badge frame

Levels never provide gameplay advantages.

---

# Weekly Awards

## Definition

Awards granted after each gameweek.

Examples:

- Top weekly scorer
- Highest weekly rank climb
- Best captain choice
- Most valuable transfer

---

## Award Display

Weekly awards appear:

- On the profile
- In league dashboards
- On the competition center

---

# Season Rewards

End-of-season recognition:

- Champion trophy
- Top-3 podium badges
- Top-10 season badges
- Participation badges
- Best manager categories

---

# Anti-Cheat and Fair Play

## Fair Play Rules

- No point manipulation through self-play
- No account sharing for reward farming
- No fraudulent referral activity

---

## Detection

Suspicious behavior triggers review.

- Automated flags
- Manual review by administrators
- Evidence preserved

---

## Penalties

Confirmed violations result in:

- Revocation of rewards
- Temporary suspension
- Permanent ban (severe cases)

---

# Privacy

Achievements are public by default.

Users can hide achievements in privacy settings.

---

# Analytics

Tracked:

• Achievement unlock rates

• Streak retention impact

• Level distribution

• Award engagement

• Gamification feature usage

---

# Performance Requirements

Gamification events must not block core flows.

Celebration animations must run at 60fps.

---

# Acceptance Criteria

✓ Achievements unlock correctly and notify the user.

✓ Badges display across profile and leaderboards.

✓ Streaks track correctly and reset properly.

✓ XP and levels progress correctly.

✓ Weekly awards are computed after scoring finalizes.

✓ No gamification feature affects fantasy points.

✓ Admins can review and revoke rewards.

---

# Future Improvements

• Season-long leagues challenges

• Friend duels

• Fantasy cup knockouts

• Trading card cosmetics

• Seasonal pass

---

# Dependencies

• Fantasy Engine

• Scoring System

• League System

• Competition Center

• Notification service

• Profile module

---

# 33. Premium

---

# Objective

Premium is the primary revenue stream of TACTIX.

It provides an ad-free, enhanced fantasy experience through advanced statistics, AI insights, exclusive content, and premium features.

Premium never affects game fairness.

---

# Goals

Premium should:

• Generate sustainable recurring revenue

• Provide clear value over the free tier

• Preserve a fair game for all users

• Offer flexible purchase options

• Integrate with app store billing

• Support future premium offerings

---

# Premium Principles

Premium must never:

• Grant extra fantasy points

• Provide transfer advantages

• Unlock exclusive players

• Influence match data

• Create pay-to-win mechanics

Premium enhances insight, convenience, and experience.

---

# Tier Model

## Free Tier

All core fantasy features.

Includes:

• Squad creation and management

• Transfers and captain selection

• Public and private leagues

• Live scoring

• Basic player statistics

• Ads displayed

---

## Premium Tier

All free features, plus:

• Ad-free experience

• Advanced player statistics

• TACTIX AI insights

• Fixture difficulty rankings

• Advanced comparison tools

• Premium news content

• Early access to new features

• Priority support

---

# Pricing

Prices are proposed and subject to final business approval.

## Monthly

MAD 25 / month

Equivalent offers set at launch.

## Annual

MAD 200 / year

Approximately two months free.

## Trial

7-day free trial

Available once per account.

---

# Premium Benefits Detail

## Advanced Statistics

Includes:

- Heat maps
- Advanced passing metrics
- Expected stats (xG, xA)
- Shot maps
- Formation analysis
- Comparative analytics

---

## TACTIX AI

Includes:

- Captain recommendations
- Transfer suggestions
- Fixture difficulty analysis
- Gameweek insights
- Player trend analysis

Free users see limited, teaser AI insights.

---

## Ad-Free

All ads removed.

Banner, interstitial, and sponsored placements hidden.

---

## Exclusive Content

Premium-only articles:

- Weekly expert picks
- Data-driven previews
- Premium gameweek guides

---

# Purchase Flow

## Entry Points

- Upgrade button in profile
- Premium banner on dashboard
- Locked content prompts
- Settings

---

## Purchase Steps

Select Tier

↓

Choose Plan

↓

Billing Authorization

↓

Confirmation

↓

Receipt

---

## Payment Methods

Android

Google Play Billing

iOS

Apple App Store In-App Purchase

---

## Receipts

Receipts are stored for audit.

Receipt verification is performed server-side.

---

# Subscription Management

## Manage Subscription

Users can:

- View plan
- Upgrade
- Downgrade
- Cancel
- Restore purchase

Managed within the app and store.

---

## Cancellation

Effective at end of current period.

Premium benefits remain until period ends.

---

## Refund Policy

Follows app store refund policy.

Refund requests handled by the respective store.

---

# Trial Rules

- One trial per account per payment method
- Trial must convert or expire
- No repeat trials without eligibility

---

# Entitlement Validation

## Server-Side Entitlement

The server validates entitlements.

The client never grants premium access.

---

## Validation Checks

Every premium feature request:

- Verifies active subscription
- Checks expiration
- Checks platform
- Checks region

---

## Grace Period

A short grace period allows access during billing retry.

Grace duration:

3 days

---

# Sync and Restore

Premium status syncs across devices.

Restore purchase revalidates entitlements.

---

# Revenue Protection

## Fraud Prevention

Server-side receipt validation.

Duplicate receipt detection.

Abnormal entitlement patterns flagged.

---

## Fair Play

Premium never modifies gameplay rules.

Any report of premium unfairness is investigated.

---

# Analytics

Tracked:

• Conversion rate

• Trial start rate

• Trial-to-paid rate

• Churn rate

• Plan distribution

• Feature usage by tier

• ARPU

---

# Acceptance Criteria

✓ Premium users receive all advertised benefits.

✓ Free users retain full gameplay fairness.

✓ Purchases verify server-side.

✓ Subscriptions sync and restore correctly.

✓ Cancellation and refund flows work.

✓ Trial limits are enforced.

✓ Premium features never affect fantasy points.

---

# Future Improvements

• Premium seasonal pass

• Premium leagues with prizes

• Lifetime membership

• Web billing

• Gift subscriptions

---

# Dependencies

• App store billing integrations

• Entitlement service

• Ads service (free tier)

• Analytics service

• Notification service

---

# 34. Profile & Settings

---

# Objective

Profile & Settings gives managers full control over their identity, preferences, privacy, and account.

The profile displays personal statistics, achievements, and history, while settings manages preferences and account-level actions.

---

# Goals

Profile & Settings should:

• Display complete user information

• Support all editable profile fields

• Manage preferences and privacy

• Provide secure account management

• Handle account deletion per platform policy

• Provide transparent data controls

---

# Profile Overview

## Profile Sections

Personal Information

Statistics

Achievements

History

Favorite Club

Settings

---

## Profile Components

Header

Avatar

Display Name

Username

Badges

Rank

↓

Statistics Panel

↓

Achievements Grid

↓

Season History

↓

Actions

---

# Editable Fields

Field

Rules

---

Username

3-20 characters.

Unique.

One change per 90 days.

Display Name

2-40 characters.

Country

Selectable list.

Language

Arabic, French, English.

Favorite Club

Selectable club list.

Avatar

Upload or default.

Supported formats: PNG, JPG, WEBP.

Max size: 2 MB.

Bio

Max 200 characters.

---

# Read-Only Fields

User ID

Registration Date

Total Points

Season Rank

Leagues Joined

Achievements

---

# Profile Statistics

## Career Statistics

Current Season Points

Overall Points

Highest Weekly Score

Best Overall Rank

Transfers Made

Captain Success Rate

Most Selected Club

Favorite Formation

Total Seasons Played

---

## Season Statistics

Season Points

Season Rank

Gameweeks Played

Transfers Used

Weekly Average

---

# Profile Visibility

## Public Profile

Visible by default to:

- League members
- Search

## Visibility Options

Public

Friends only

Private

---

## Hidden Elements

Users can hide:

- Rankings
- Achievements
- Statistics
- Email

---

# Settings

## Language

Supported:

Arabic

French

English

Changes apply immediately.

---

## Theme

System

Light

Dark

---

## Notifications

Per-category toggles:

Deadline reminders

Match events

Transfer updates

League activity

News

Marketing

---

## Privacy

Private profile

Hide rankings

Hide email

Block invitations

---

## Accessibility

Text size

High contrast

Reduce motion

---

## Account

Change password

Email verification status

Delete account

---

# Account Management

## Change Password

Requires current password.

Validates new password policy.

---

## Delete Account

Flow:

Confirmation

↓

Warning

↓

Verification (password or email)

↓

Scheduled deletion

---

### Deletion Rules

- Immediate deletion scheduled after 7-day grace period
- During grace, account can be restored
- After deletion, data is anonymized or removed per policy
- Username remains reserved for 180 days

---

## Data Export

Users can request a copy of their data.

Export includes:

- Profile data
- Fantasy teams
- Match history
- Achievements

Delivery:

Email link, 7 days validity.

---

# Session Management

## Active Sessions

Users can view active sessions.

Devices listed:

- Device name
- Platform
- Last active

Users can revoke individual sessions.

---

## Logout

Logout invalidates all refresh tokens.

---

# Help & Support

## Access

Help Center link from settings.

## Topics

Fantasy rules

Transfers

Captain

Scoring

Leagues

Account

Technical issues

Contact support

FAQ

---

# Feedback

Users can submit feedback.

- Rating prompt (in-app)
- Feedback form
- Crash report opt-in

---

# Analytics

Tracked:

• Settings usage

• Language changes

• Theme changes

• Profile edits

• Account actions

• Help Center views

---

# Acceptance Criteria

✓ All editable fields validate and save.

✓ Profile visibility options work.

✓ Notifications can be toggled per category.

✓ Password change flow works.

✓ Account deletion respects grace and reservation rules.

✓ Data export works.

✓ Active sessions can be revoked.

✓ Delete account is available per store policy.

---

# Future Improvements

• Advanced privacy dashboard

• Data download history

• Multiple teams (future)

• Cross-device settings sync

---

# Dependencies

• Authentication

• User Profile

• Gamification

• Notification service

• Analytics service

---

# 35. Notifications

---

# Objective

Notifications keep managers informed about deadlines, matches, transfers, league activity, and system updates at the right time, on the right channel, without being intrusive.

---

# Goals

Notifications should:

• Deliver time-critical information

• Respect user preferences

• Support multiple channels

• Avoid notification fatigue

• Deep link to relevant screens

• Measure engagement

• Meet delivery reliability targets

---

# Notification Types

Category

Examples

---

Deadline

Gameweek deadline approaching, squad not saved.

Transfer

Transfer completed, budget updated.

Captain

Captain not selected, captain recommendation.

Match

Goal, red card, full-time, live points.

Player

Price rise, price drop, injury, suspension, return.

League

Invitation, join request, league announcement, result.

Achievement

Badge unlocked, level up, weekly award.

News

Breaking news, followed club news.

Premium

Trial started, renewal, expiry.

System

Maintenance, app update, account security.

---

# Channels

## Push Notifications

Delivered through:

- FCM (Android)
- APNs (iOS)

---

## In-App Notifications

Notification center inside the app.

Persistent.

---

## Email Notifications

For critical account events:

- Verification
- Password reset
- Billing

---

# Delivery Rules

## Time-Critical

- Deadline reminders
- Match events
- Price changes

Delivered immediately.

---

## Non-Critical

- News
- Marketing
- Weekly recaps

Batched or scheduled.

---

## Quiet Hours

Notifications are suppressed per user preference.

Local time respected:

Africa/Casablanca

---

# Notification Content

## Structure

Title

Body

Deep Link

Category

Priority

Timestamp

---

## Localization

All notifications render in the user's language:

Arabic

French

English

---

## Deep Links

Each notification opens the relevant screen:

- Team
- Match
- League
- Player
- Article

---

# Preferences

## Per-Category Toggles

Users enable or disable categories.

Defaults: critical categories enabled.

---

## Channel Preferences

Users choose:

- Push (on/off)
- In-app (always)
- Email (on/off)

---

## Frequency Control

Non-critical categories support:

- Immediate
- Daily digest
- Off

---

# Scheduling

## Deadline Reminders

Timing:

- 24 hours before deadline
- 2 hours before deadline
- 30 minutes before deadline (if squad unsaved)

Each reminder is sent once.

---

## Price Change Alerts

Sent when a player's price changes.

Cooldown: one per player per gameweek.

---

## Match Notifications

Goals and red cards:

Immediate.

Full-time points:

After verification.

---

# Notification Center

## In-App Center

Displays:

- All in-app notifications
- Read/unread state
- Category filter
- Clear all

---

## Unread Badge

Badge count shows unread items.

---

# Delivery Reliability

Targets:

- Push delivery rate ≥ 95%
- Median delivery latency ≤ 60 seconds
- No silent drops for critical categories

---

# Failure Handling

## Push Failure

Fallback: in-app notification.

Device registered tokens refreshed automatically.

---

## Delivery Retry

Critical notifications retried with backoff.

Max retries: 3

---

# Engagement Measurement

Tracked:

• Impressions

• Open rate

• Click-through rate

• Opt-out rate

• Per-category performance

---

# Anti-Spam

- Maximum push notifications per day: 10
- Critical notifications exempt
- Marketing requires explicit opt-in

---

# Acceptance Criteria

✓ All notification types are supported.

✓ Users control every category.

✓ Deep links land on the correct screen.

✓ Notifications localize correctly.

✓ Deadline reminders fire at specified times.

✓ Delivery rate meets ≥ 95% target.

✓ Quiet hours are respected.

✓ Opt-out works for all categories.

---

# Future Improvements

• Rich media notifications

• Live activity widgets

• Smart frequency optimization

• Notification digests

---

# Dependencies

• Push providers (FCM, APNs)

• Notification service

• Fantasy Engine events

• League events

• Content service

• Profile preferences

---

# 36. Admin Requirements

---

# Objective

The Admin Dashboard provides the operational control plane for TACTIX.

It enables administrators to manage users, clubs, players, fixtures, statistics, content, leagues, and system configuration without direct database intervention.

---

# Goals

Admin Requirements should:

• Cover all operational tasks

• Enforce role-based access

• Provide audit trails

• Support data correction workflows

• Manage content and announcements

• Monitor system health

• Remain secure and restricted

---

# Admin Roles

## Administrator

Permissions:

- Manage users
- Manage clubs
- Manage players
- Manage fixtures
- Correct statistics
- Send announcements
- Manage reports
- Manage leagues

---

## Super Administrator

Full platform access.

Responsibilities:

- Security configuration
- Role management
- Integrations
- Data synchronization
- System monitoring
- Feature flags

---

# Dashboard Overview

## Home Screen

Displays:

- Key metrics
- Active users
- System health
- Pending reports
- Pending corrections
- Scheduled content
- Data sync status

---

# User Management

## User Search

Search by:

- Username
- Email
- User ID

---

## User Actions

View profile

Edit profile

Suspend account

Restore account

Permanently delete account

Reset password

Assign roles

---

## Moderation

Review reported users.

Action options:

Warn

Suspend

Ban

Exonerate

---

# Club Management

## CRUD Operations

Create

Read

Update

Delete (soft)

---

## Club Fields

Name

Crest

City

Stadium

Colors

Season squad

Status

---

## Club Status

Active

Inactive

Suspended

---

# Player Management

## CRUD Operations

Create

Read

Update

Delete (soft)

---

## Player Fields

Name

Photo

Club

Position

Nationality

Date of Birth

Status

Starting price

---

## Status Management

Available

Doubtful

Injured

Suspended

Unavailable

Transferred

Retired

---

# Fixture Management

## CRUD Operations

Create

Read

Update

Delete (soft)

---

## Fixture Fields

Competition

Gameweek

Home club

Away club

Venue

Kickoff time

Status

---

## Fixture Status

Scheduled

In Progress

Half-Time

Full-Time

Postponed

Cancelled

---

# Statistics Correction

## Purpose

Correct errors in official match data.

## Workflow

Report

↓

Review

↓

Correction

↓

Verification

↓

Points Recalculation

↓

Audit Log

---

## Rules

- Only administrators can edit official statistics
- Every correction is logged
- Corrections trigger fantasy point recalculation
- Affected users are notified

---

# Content Management

## Announcements

Create announcements.

Targeting:

All users

League members

Premium users

---

## News Management

Draft, review, schedule, publish articles.

Manage categories and featured content.

---

## Moderation

Review reported content.

Actions:

Keep

Remove

Edit

---

# League Management

## League Review

View any league.

Remove members.

Transfer ownership.

Disband league.

---

## Fair Play

Review reported leagues.

Actions:

Warn

Remove league

Ban organizer

---

# Data Synchronization

## Sync Monitor

Displays:

- Data provider status
- Last successful sync
- Pending updates
- Sync errors

---

## Manual Sync

Trigger manual data refresh.

Override provider data when required.

---

# System Configuration

## Feature Flags

Enable or disable features.

---

## Maintenance Mode

Enable maintenance mode.

Users see a maintenance screen.

---

## Settings

Currency

Season configuration

Gameweek management

Scoring configuration

---

# Notifications

## Admin Notifications

Admins receive alerts for:

- Data sync failures
- Error rate spikes
- High traffic
- Abuse reports

---

# Audit Log

## Logged Actions

Every administrative action is recorded:

- Administrator
- Action
- Target
- Timestamp
- Details

---

## Log Retention

Minimum retention:

2 seasons

---

# Reporting

## Reports Available

- User growth
- Engagement
- Revenue
- System errors
- Support volume

---

# Security

## Admin Access

- Admin login requires 2FA
- Session timeout enforced
- Role-based access control
- IP allowlisting (optional)

---

## Admin Actions

Sensitive actions require confirmation.

---

# Performance Requirements

Admin dashboard must load within:

3 seconds

Search across datasets must return within:

2 seconds

---

# Acceptance Criteria

✓ All operational tasks are covered.

✓ Roles restrict access correctly.

✓ Every admin action is audited.

✓ Statistics corrections trigger recalculation.

✓ Maintenance mode works end to end.

✓ Feature flags take effect without redeploy.

✓ Admin can operate without database access.

---

# Future Improvements

• Advanced analytics dashboards

• Bulk data imports

• Automated moderation

• Revenue dashboards

---

# Dependencies

• All platform services

• Data provider integration

• Audit service

• Notification service

---

# 37. Analytics

---

# Objective

Analytics provides the data foundation for measuring product health, understanding user behavior, and driving decisions across acquisition, engagement, retention, and monetization.

---

# Goals

Analytics should:

• Measure every core journey

• Track engagement and retention

• Support revenue analysis

• Identify drop-off points

• Enable data-driven decisions

• Respect user privacy

---

# Principles

- Privacy by default
- Events are anonymous where possible
- Consent-based tracking
- No selling of personal data
- Transparent data policy

---

# Event Taxonomy

## Event Structure

Event Name

Event Properties

User Context

Timestamp

Device Context

Session ID

---

## Event Naming Convention

snake_case

Format:

object.action

Examples:

user.registered

team.created

transfer.completed

league.joined

match.opened

---

# Core Event Categories

## Acquisition

- app.installed
- app.opened_first_time
- signup.started
- signup.completed
- onboarding.completed

---

## Engagement

- screen_viewed
- session.started
- session.ended
- team.updated
- transfer.completed
- captain.selected
- match.opened
- league.joined
- search.performed

---

## Retention

- gameweek.completed
- weekly_login
- streak.maintained
- streak.broken

---

## Monetization

- premium.viewed
- trial.started
- subscription.purchased
- subscription.cancelled
- subscription.renewed

---

# Funnels

## Onboarding Funnel

App Installed

↓

Signup Started

↓

Signup Completed

↓

Team Created

↓

League Joined

---

## Activation Funnel

Registered

↓

Team Created

↓

First Transfer

↓

First Live Match Viewed

---

# Dashboards

## Product Dashboard

Metrics:

- DAU / WAU / MAU
- New users
- Retention cohorts
- Session duration
- Feature usage

---

## Engagement Dashboard

- Gameweek participation
- Weekly return rate
- Transfer activity
- League activity
- Match views

---

## Revenue Dashboard

- Conversion rate
- ARPU
- Churn rate
- Plan distribution
- Trial-to-paid rate

---

## Performance Dashboard

- API latency
- Error rates
- Crash-free sessions
- Load times

---

# Retention Analysis

## Cohorts

Tracked by:

- Registration week
- Registration month
- Acquisition channel

---

## Metrics

- Day 1 / 7 / 30 retention
- Weekly retention
- Gameweek retention
- Season retention

---

# Segmentation

Segments by:

- Language
- Country
- Device platform
- Favorite club
- League type
- Premium status
- Engagement level

---

# A/B Testing

## Test Scope

Supported tests:

- Onboarding flows
- UI variations
- Notification copy
- Pricing presentation

---

## Test Rules

- Statistical significance required
- Tests documented
- Winners rolled out
- Losers archived

---

# Privacy & Compliance

## Data Collection

- Consent captured at signup
- Opt-out respected
- No tracking of sensitive data
- No cross-device ad tracking without consent

---

## Retention

Analytics data retained per policy:

12 months

---

## Export & Deletion

User analytics data deleted on account deletion.

---

# Data Pipeline

## Collection

Client SDK events.

Server-side events.

---

## Processing

Event validation.

Deduplication.

Enrichment.

---

## Storage

Raw events stored.

Aggregated metrics stored.

---

## Access

Dashboards for teams.

Raw data access restricted.

---

# Acceptance Criteria

✓ Core events are tracked for every module.

✓ Funnels are measurable.

✓ Retention cohorts are computable.

✓ Revenue metrics are accurate.

✓ Consent is respected.

✓ Analytics data can be deleted on request.

✓ Dashboards load within 5 seconds.

---

# Future Improvements

• Predictive churn models

• Personalized recommendations

• Marketing attribution

• Real-time dashboards

---

# Dependencies

• Analytics SDK

• Data pipeline service

• All platform modules

• Admin dashboard

---

# 38. Error Handling & Edge Cases

---

# Objective

This chapter defines how TACTIX handles errors, failures, and edge cases across the platform.

It ensures predictable, recoverable, and user-friendly behavior in unexpected situations without compromising data integrity or fairness.

---

# Error Handling Principles

- Every error is explained clearly
- Users always have a recovery path
- No screen is left blank
- Loading states are always visible
- Data integrity is never compromised
- Failures are logged and monitored

---

# Error Response Format

## Standard Error Response

Code

Message

Details

Hint

---

## Error Code Levels

4xx

Client-side requests

5xx

Server-side failures

---

## User-Facing Messages

Localized in:

Arabic

French

English

Each message explains:

- What happened
- Why it happened (when known)
- How to resolve it

---

# Network Errors

## Offline

Behavior:

- Show offline screen
- Preserve current state
- Queue non-critical actions
- Show cached data where available

---

## Intermittent Connection

- Auto-retry requests
- Exponential backoff
- Maximum 3 retries

---

## Timeout

- Retry once
- On failure, show retry prompt

---

# API Errors

## 400 Bad Request

Show validation feedback.

Highlight invalid fields.

---

## 401 Unauthorized

- Prompt sign-in
- Refresh token flow
- Redirect to login on failure

---

## 403 Forbidden

Show access denied message.

---

## 404 Not Found

Show content unavailable message.

---

## 422 Unprocessable

Show validation-specific message.

---

## 429 Rate Limited

Show "too many requests" and retry after delay.

---

## 5xx Server Errors

- Show friendly error
- Log error
- Provide retry

---

# Fantasy Engine Edge Cases

## Deadline Race

Two requests at the same time as deadline.

Rule:

The first persisted valid action wins.

---

## Captain Autosub Triggered at Deadline

Allows one captain if player somehow ends with 0 minutes, using valid bench order.

---

## Squad Locked Mid-Action

If a user attempts a transfer after deadline:

Rejected.

Show deadline message.

---

## Duplicate Player

Adding a player already in squad is rejected.

---

## Budget Exceeded

Transfer rejected.

Show budget shortfall.

---

## Club Limit Exceeded

More than 3 from a club:

Rejected.

---

## Formation Invalid

Squad cannot lock without valid formation.

---

## No Bench Players

Applies if all bench options missing.

---

# Match Data Edge Cases

## Postponed Match

- Fantasy points not awarded
- Squad remains valid
- Gameweek schedule adjusted
- Notification sent

---

## Abandoned Match

- Points not awarded
- Match marked incomplete
- Admin review

---

## Late Lineup

Lineup released after deadline:

- Squad locked.

---

## Player Substituted Early

Substitution logic defined in Fantasy Engine.

---

## Own Goal

Standard fantasy scoring rule applies for the player.

---

## VAR Reversal

If a goal is disallowed:

- Event corrected
- Points recalculated for affected squads
- Notifications sent

---

# Team & League Edge Cases

## Deleted Account in League

Team is removed.

League still functions.

Manager replaced by placeholder.

---

## League Member List

League removed from invite.

---

## League Full

Join request rejected.

---

## Duplicate League Name

Rejected or auto-suffixed.

---

## Two Same Club limit

Rule is fixed at 3, list clear.

---

# Notification Edge Cases

## Device Changed

Token refreshed.

---

## Push Disabled

Fallback in-app.

---

# Price Engine Edge Cases

## Simultaneous Price Changes

Race handled server-side atomically.

---

## Price Floor / Ceiling Enforced

No change beyond limits.

---

# Concurrency

All money, transfers, and points operations are atomic.

Conflicts resolved server-side.

---

# Data Integrity

## Idempotency

- All write operations are idempotent
- Duplicate requests have no side effects

---

## Audit

Every write is logged.

---

## Rollback

Failed transactions roll back atomically.

---

# Monitoring

Errors and edge cases are:

- Logged
- Alerted
- Tracked in dashboards
- Reviewed post-incident

---

# Acceptance Criteria

✓ Errors show clear, localized messages.

✓ Every error has a recovery path.

✓ Deadline races resolve fairly.

✓ Gameweek is maintained per rules.

✓ Reversals trigger correct recalculation.

✓ Operations are atomic.

✓ Auth failures prompt correct path.

✓ All failures are logged.

---

# Future Improvements

- Proactive issue detection
- Self-healing flows
- Advanced debugging tools

---

# Dependencies

- All modules
- Monitoring service
- Logging service
- Analytics

---

# 39. Security & Compliance

---

# Objective

Security & Compliance defines the requirements that protect user data, ensure platform integrity, and satisfy regulatory obligations for a Moroccan consumer application.

---

# Goals

Security & Compliance should:

• Protect user accounts and data

• Prevent unauthorized access

• Ensure fair play integrity

• Meet Moroccan data protection requirements

• Satisfy app store requirements

• Provide audit capability

---

# Data Protection

## Applicable Law

Morocco:

Law 09-08 on personal data protection

Oversight:

CNDP (Commission Nationale de Protection des Données à Caractère Personnel)

---

## Obligations

- Register processing operations with CNDP
- Obtain consent before processing
- Inform users about data use
- Enable access and correction rights
- Enable deletion rights
- Report breaches appropriately

---

# Privacy Policy & Terms

## Required Documents

Privacy Policy

Terms of Service

---

## Acceptance

Accepted during registration.

Available before acceptance.

Updated versions require re-acceptance.

---

# Age Requirements

## Minimum Age

13 years

## Enforcement

- Age declaration at registration
- Content appropriate for minors
- No real-money prizes (excluded in Version 1)

---

# Authentication Security

## Password Requirements

Minimum 8 characters.

Contain uppercase, lowercase, number, special character.

---

## Storage

Passwords stored with:

Argon2id or bcrypt

Salted and hashed.

Never stored in plain text.

---

## Failed Login Protection

5 failed attempts.

Locked for 15 minutes.

---

## Session Security

- Refresh tokens rotated
- Logout invalidates all sessions
- Sessions expire after inactivity

---

## Two-Factor Authentication

Required for:

Administrator accounts.

Optional for users (future).

---

# Data Encryption

## In Transit

TLS 1.2 or higher.

Applies to all API traffic.

---

## At Rest

Database encryption.

Sensitive fields encrypted.

---

# Access Control

## Role-Based Access Control

Roles:

Guest

Registered User

League Owner

Administrator

Super Administrator

---

## Principle of Least Privilege

Users access only what their role allows.

---

# Rate Limiting

## Endpoints

Authentication endpoints:

Rate limited.

Public endpoints:

Rate limited.

---

## Limits

Login attempts:

5 per 15 minutes per account.

Registration:

10 per hour per device/IP.

API requests:

Defined per endpoint.

---

# Abuse Prevention

## Bot Protection

- CAPTCHA on registration
- Device fingerprinting (risk-based)
- Suspicious pattern detection

---

## Multi-Account Detection

- Email uniqueness
- Device signals
- Manual review

---

# Fair Play & Anti-Cheat

## Integrity Rules

- No manipulation of fantasy points
- No account sharing
- No fraudulent referrals

---

## Detection

Automated flagging.

Manual review.

---

## Penalties

Warnings

Suspension

Ban

---

# Content Moderation

## Moderation Rules

- Usernames checked for offensive content
- League names checked
- Comments moderated
- Reported content reviewed

---

# Payment Security

## Payments

Handled by app store billing.

TACTIX does not store card data.

Receipts validated server-side.

---

# Audit Logging

## Logged Events

- Authentication events
- Administrative actions
- Data corrections
- Financial events
- Security events

---

## Log Protection

Logs are append-only.

Access restricted.

---

# Breach Response

## Process

Detect

↓

Contain

↓

Assess

↓

Notify

↓

Remediate

---

## Notification

Users notified where required.

---

# App Store Compliance

## Account Deletion

In-app account deletion required.

---

## Data Export

Users can export their data.

---

# Vulnerability Management

## Practices

- Regular dependency updates
- Penetration testing before launch
- Security review of releases
- Incident response plan

---

# Acceptance Criteria

✓ Passwords are hashed with strong algorithms.

✓ Failed logins lock accounts.

✓ Admin accounts require 2FA.

✓ All traffic uses TLS.

✓ Role-based access is enforced.

✓ Rate limits are active.

✓ Data protection obligations are documented.

✓ Breach response process is defined.

✓ Account deletion and data export work.

✓ Audit logs cover security events.

---

# Future Improvements

• Optional user 2FA

• Bug bounty program

• Security certifications

• Automated compliance reporting

---

# Dependencies

• Authentication

• Admin dashboard

• Audit service

• Analytics

---

# 40. Performance Requirements

---

# Objective

Performance Requirements define the speed, reliability, and responsiveness targets that TACTIX must meet on mobile devices and server infrastructure.

---

# Goals

Performance Requirements should:

• Ensure a fast user experience

• Handle peak traffic reliably

• Minimize load times

• Provide smooth animations

• Optimize battery and data usage

• Scale for growth

---

# App Launch Performance

## Cold Start

Target:

Under 2 seconds

on a mid-range device.

---

## Warm Start

Target:

Under 1 second

---

## Splash Screen

Displayed until app is ready.

---

# Screen Loading

## Screen Load Time

Target:

Under 1.5 seconds

for data-backed screens.

---

## Skeleton Screens

Shown during loading.

---

## No Blank Screens

Every screen has a state.

---

# API Performance

## Response Time

Average API response time:

Under 250 ms

p95 under:

500 ms

---

## Timeout

Client timeout:

10 seconds

---

## Retry

Automatic retry on transient failures:

Maximum 3 attempts

---

# Real-Time Performance

## Live Updates

Event delivery target:

Under 5 seconds

from official event time.

---

## Connection

WebSocket reconnect:

Automatic with backoff.

---

## Reconnect Time

Reconnect within:

5 seconds

---

# Animation Performance

## Frame Rate

Target:

60 fps

for animations.

---

## Reduced Motion

Honored when enabled.

---

# Data Usage

## Image Optimization

Images compressed for mobile.

Formats:

WebP

---

## Payload Size

API payloads minimal.

Paginated lists.

---

## Offline Caching

Frequent data cached locally.

Cache strategy per resource.

---

# Battery Usage

## Background Activity

Minimized.

No unnecessary polling in background.

---

## Live Updates

Use push events over polling when possible.

---

# Scalability

## Target Scale

Year 1:

50,000 registered users

15,000 MAU

Peak concurrent:

1,000 live match sessions

---

## Design

Stateless API services.

Horizontal scaling.

Database read replicas.

Caching layer (Redis).

---

# Database Performance

## Query Performance

Common queries indexed.

Slow query monitoring.

---

## Write Performance

Bulk operations batched.

---

# Edge Caching

## Cacheable Content

- Static assets
- Public player/club data
- Fixture schedules

Served from CDN.

---

# Error Rate

## Target

Crash-free sessions:

99.8%

API error rate:

Under 0.5%

---

# Load Testing

## Requirements

- Load tested before launch
- Tested at peak gameweek traffic
- Results documented

---

# Performance Monitoring

## Metrics Tracked

- API latency
- Screen load times
- Crash rates
- Frame drops
- Network failures
- Resource usage

---

## Alerting

Alerts on threshold breach.

---

# Acceptance Criteria

✓ Cold start under 2 seconds.

✓ API p95 under 500 ms.

✓ Live events under 5 seconds.

✓ Animations at 60 fps.

✓ Crash-free sessions 99.8%.

✓ Load tested at peak traffic.

✓ Performance is monitored continuously.

---

# Future Improvements

• Prefetch intelligence

• Predictive caching

• Edge computing

---

# Dependencies

• Backend infrastructure

• Mobile architecture

• Real-time engine

• CDN

---

# 41. Future Roadmap & Final Acceptance

---

# Objective

Future Roadmap & Final Acceptance defines the phased evolution of TACTIX and consolidates the criteria required to declare Version 1 production-ready.

---

# Version 1 Scope Recap

Launch scope (Botola Pro Inwi):

- User authentication
- Onboarding
- Fantasy team creation
- Transfers and budget
- Captain selection
- Live scoring
- Public and private leagues
- Rankings
- Notifications
- Player and club discovery
- Match Center
- Basic statistics
- Profiles and settings
- Gamification
- Admin dashboard

---

# Future Roadmap

## Phase 2 — Expansion

- Fantasy CAF Champions League
- Fantasy CAF Confederation Cup
- Improved AI recommendations
- Fantasy Cup knockout
- Draft mode

---

## Phase 3 — Ecosystem

- Official league partnership
- Sponsor integrations
- Fantasy tournaments
- Enhanced community features
- News and statistics platform expansion

---

## Phase 4 — International

- Fantasy Africa Cup of Nations
- Other African leagues
- Global fantasy
- TACTIX AI assistant expansion

---

## Phase 5 — Platform

- TACTIX becomes the leading football platform in Africa

---

# Release Strategy

## Alpha

Internal testing.

## Beta

Limited external testing.

## Production

Public launch.

---

# Versioning

## Version Scheme

Major.Minor.Patch

Example:

1.0.0

---

## Changes

- Breaking changes increment major
- Features increment minor
- Fixes increment patch

---

# Final Acceptance Criteria

Version 1 is production-ready when:

✓ All core user journeys are fully functional.

✓ Fantasy points are calculated accurately per the Scoring System.

✓ Live match data synchronizes correctly.

✓ A full Botola Pro season is supported.

✓ Security testing is complete.

✓ Performance targets are met.

✓ The admin dashboard manages all operational tasks without direct database intervention.

✓ Critical defects are resolved.

✓ Legal and privacy obligations are satisfied.

✓ App store review passes.

---

# Definition of Done

For every feature:

✓ Requirements documented.

✓ Implemented.

✓ Tested.

✓ Localized (Arabic, French, English).

✓ Accessible.

✓ Performance validated.

✓ Analytics tracked.

✓ Documentation updated.

✓ Deployed to production (release).

---

# Release Checklist

- Feature complete
- Testing complete
- Load testing complete
- Security review complete
- Content verified
- Support trained
- Stores submission prepared
- Analytics verified
- Monitoring active
- Rollback plan ready

---

# Post-Launch Monitoring

## First 48 Hours

- Crash rate
- API errors
- Login success
- Team creation
- Support volume
- Revenue activity

---

## First Gameweek

- Scoring accuracy
- Deadline behavior
- Live updates
- League joins
- Recognition of issues

---

# Support Plan

- Help center
- Support email
- Bug reporting
- Fair play appeals

---

# Ongoing Maintenance

- Botola season data updates
- Price correction
- Gameweek scheduling
- Bug fixes
- Content updates

---

# Acceptance Sign-Off

The PRD is approved when all acceptance criteria pass.

Amendments require versioned updates.