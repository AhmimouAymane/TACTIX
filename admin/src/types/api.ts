/**
 * TACTIX Admin API types.
 * Mirrors the entity list defined in docs/engineering/Database.md
 * and the admin endpoints documented in docs/engineering/API.md (section 17).
 */

/* ===================== Core entities ===================== */

export type RoleName = 'admin' | 'moderator' | 'user';

export interface Role {
  id: string;
  name: RoleName;
  permissions: string[];
}

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  username: string;
  display_name: string;
  country?: string;
  language: string;
  favorite_club_id?: string;
  avatar_url?: string;
  bio?: string;
  role: RoleName;
  status: UserStatus;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface Session {
  id: string;
  user_id: string;
  token_hash: string;
  device?: string;
  platform?: string;
  expires_at: string;
  created_at: string;
}

/* ===================== Football reference data ===================== */

export type Position = 'GK' | 'DEF' | 'MID' | 'FWD';
export type PlayerStatus = 'active' | 'loaned' | 'retired' | 'banned';

export interface Club {
  id: string;
  name: string;
  short_name: string;
  city: string;
  stadium: string;
  crest_url?: string;
  colors: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  club_id: string;
  first_name: string;
  last_name: string;
  photo_url?: string;
  position: Position;
  nationality: string;
  date_of_birth: string;
  shirt_number: number;
  status: PlayerStatus;
  starting_price: number;
  current_price: number;
  previous_price: number;
  created_at: string;
  updated_at: string;
}

export interface PriceHistoryEntry {
  id: string;
  player_id: string;
  price: number;
  effective_at: string;
  reason: string;
}

export type FixtureStatus = 'scheduled' | 'live' | 'paused' | 'finished' | 'cancelled' | 'postponed';
export type MatchStatus = FixtureStatus;

export interface Fixture {
  id: string;
  competition_id: string;
  gameweek_id?: string;
  home_club_id: string;
  away_club_id: string;
  venue: string;
  kickoff_at: string;
  status: FixtureStatus;
  home_score?: number;
  away_score?: number;
  created_at: string;
  updated_at: string;
}

export type MatchEventType =
  | 'goal'
  | 'assist'
  | 'card'
  | 'sub'
  | 'save'
  | 'penalty'
  | 'var';

export type CardType = 'yellow' | 'red' | 'yellow-red';

export interface MatchEvent {
  id: string;
  fixture_id: string;
  minute: number;
  added_minute?: number;
  type: MatchEventType;
  player_id?: string;
  player_name?: string;
  card?: CardType;
  detail: string;
  sequence: number;
  verified: boolean;
  created_at: string;
}

export interface Competition {
  id: string;
  name: string;
  code: string;
  country: string;
  season_start: string;
  season_end: string;
  status: 'active' | 'inactive';
}

export type GameweekStatus = 'upcoming' | 'live' | 'finished';

export interface Gameweek {
  id: string;
  competition_id: string;
  number: number;
  deadline_at: string;
  status: GameweekStatus;
  created_at: string;
}

/* ===================== Fantasy entities ===================== */

export interface FantasyTeam {
  id: string;
  user_id: string;
  season_id: string;
  name: string;
  budget_remaining: number;
  formation: string;
  value: number;
  total_points: number;
  current_rank?: number;
  created_at: string;
  updated_at: string;
}

export interface SquadSlot {
  id: string;
  team_id: string;
  player_id: string;
  position: string;
  is_captain: boolean;
  is_vice_captain: boolean;
  purchased_price: number;
  created_at: string;
  updated_at: string;
}

export interface GameweekEntry {
  id: string;
  team_id: string;
  gameweek_id: string;
  points: number;
  captain_id: string;
  vice_captain_id: string;
  transfers_made: number;
  penalty_points: number;
  status: 'draft' | 'locked';
  locked_at?: string;
}

export interface Transfer {
  id: string;
  team_id: string;
  gameweek_id: string;
  player_out_id: string;
  player_in_id: string;
  cost: number;
  price_delta: number;
  created_at: string;
}

export interface GameweekPoints {
  id: string;
  entry_id: string;
  player_id: string;
  fixture_id: string;
  base_points: number;
  bonus_points: number;
  deductions: number;
  total: number;
  source_event_id?: string;
}

export interface PriceChangeEvent {
  id: string;
  player_id: string;
  gameweek_id: string;
  old_price: number;
  new_price: number;
  direction: 'rise' | 'fall';
  created_at: string;
}

/* ===================== League entities ===================== */

export type LeagueType = 'private' | 'public';

export interface League {
  id: string;
  name: string;
  code: string;
  type: LeagueType;
  owner_id: string;
  capacity: number;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface LeagueMember {
  id: string;
  league_id: string;
  user_id: string;
  joined_at: string;
  role: 'owner' | 'member';
}

export interface LeagueInvitation {
  id: string;
  league_id: string;
  user_id: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired';
  expires_at: string;
  created_at: string;
}

export interface LeagueAnnouncement {
  id: string;
  league_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export interface LeagueStanding {
  id: string;
  league_id: string;
  user_id: string;
  gameweek_id: string;
  rank: number;
  total_points: number;
  gameweek_points: number;
  updated_at: string;
}

/* ===================== Content entities ===================== */

export type ArticleStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_image?: string;
  status: ArticleStatus;
  author_id: string;
  published_at?: string | null;
  created_at: string;
}

export interface ArticleTranslation {
  id: string;
  article_id: string;
  language: string;
  title: string;
  body: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  target: 'all' | 'premium' | 'league';
  status: 'draft' | 'published';
  published_at?: string | null;
  created_at: string;
}

/* ===================== Billing entities ===================== */

export type SubscriptionProvider = 'google' | 'apple';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'billing_retry';

export interface Subscription {
  id: string;
  user_id: string;
  provider: SubscriptionProvider;
  product_id: string;
  status: SubscriptionStatus;
  current_period_end: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Receipt {
  id: string;
  subscription_id: string;
  provider: SubscriptionProvider;
  provider_receipt: string;
  verified: boolean;
  created_at: string;
}

/* ===================== Notifications & System ===================== */

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
  deep_link?: string;
  read_at?: string | null;
  created_at: string;
}

export interface NotificationPreference {
  id: string;
  user_id: string;
  category: string;
  channel: 'push' | 'email' | 'sms';
  enabled: boolean;
}

export type AuditAction =
  | 'user_suspend'
  | 'user_restore'
  | 'user_role_update'
  | 'player_price_change'
  | 'player_update'
  | 'fixture_update'
  | 'fixture_result'
  | 'match_event_add'
  | 'match_event_edit'
  | 'match_event_delete'
  | 'stats_correct'
  | 'article_create'
  | 'article_update'
  | 'article_publish'
  | 'announcement_create'
  | 'feature_flag_update'
  | 'maintenance_mode_update';

export interface AuditLog {
  id: string;
  actor_id: string;
  action: AuditAction;
  entity_type: string;
  entity_id?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_code: string;
  tier: number;
  unlocked_at: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  updated_by?: string;
  updated_at: string;
}

/* ===================== API envelope ===================== */

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    hint?: string;
  };
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
}
