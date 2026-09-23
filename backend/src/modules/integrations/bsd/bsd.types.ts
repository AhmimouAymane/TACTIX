/**
 * Type shapes for the Bzzoiro Sports Data (BSD) football API v2.
 * Verified against live responses (Sep 2026) — see test/bsd.e2e-spec.ts.
 * Mappers read defensively and skip what they cannot resolve.
 */

export type BsdPosition = 'G' | 'D' | 'M' | 'F';

export interface BsdTeam {
  id: number;
  name: string;
  short_name?: string;
  country?: string;
  venue_id?: number;
}

export interface BsdSquadEntry {
  id: number;
  name?: string;
  short_name?: string;
  position?: BsdPosition | string;
  jersey_number?: number;
  nationality?: string;
  date_of_birth?: string | null;
  availability?: string;
}

export interface BsdSquadResponse {
  team_id: number;
  count: number;
  players: BsdSquadEntry[];
}

export type BsdEventStatus =
  | 'upcoming'
  | 'live'
  | 'finished'
  | 'cancelled'
  | 'postponed'
  | 'unresolved';

export interface BsdEvent {
  id: number;
  league_id?: number;
  season_id?: number;
  home_team_id?: number;
  home_team?: string;
  away_team_id?: number;
  away_team?: string;
  event_date?: string;
  status?: BsdEventStatus | string;
  home_score?: number | null;
  away_score?: number | null;
  round_number?: number;
  round_name?: string;
  stage?: string;
}

export interface BsdIncident {
  type?: string;
  minute?: number;
  player?: string;
  is_home?: boolean;
  card_type?: string;
  goal_type?: string;
  player_id?: number | null;
  team_id?: number;
  added_time?: number | null;
  rescinded?: boolean;
}

export interface BsdIncidentList {
  event_id: number;
  incidents: BsdIncident[];
}

export interface BsdPlayerStat {
  player_id: number;
  team_id: number;
  minutes_played?: number;
  goals?: number;
  goal_assist?: number;
  yellow_card?: number;
  red_card?: number;
  saves?: number;
}

export interface BsdPlayerStatsList {
  event_id: number;
  count: number;
  player_stats: BsdPlayerStat[];
}

export interface BsdSeason {
  id: number;
  name?: string;
  year?: number;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
}

export interface BsdSeasonList {
  league_id: number;
  count: number;
  seasons: BsdSeason[];
}

export interface BsdPlayerDetail {
  id: number;
  name: string;
  position?: string;
  market_value_eur?: number | null;
  current_team_id?: number;
}
