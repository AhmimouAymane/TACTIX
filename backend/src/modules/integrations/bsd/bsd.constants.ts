import { PlayerPosition, FixtureStatus } from '@prisma/client';

/** Bzzoiro league id for Botola Pro D1 (https://sports.bzzoiro.com/leagues/53/). */
export const BOTOLA_LEAGUE_ID = 53;

/**
 * BSD team ids for the 16 Botola Pro D1 clubs, taken from the league page.
 * Playoff sides and D2 clubs are excluded. Re-check against
 * GET /api/v2/teams/?league_id=53 on the first authenticated call — website
 * ids and API ids share the same space, but confirm before the first full
 * sync.
 *
 * 25/26 D1 (16): the first 16 below. 26/27 promotions: Amal Tiznit (4771),
 * Moghreb Tetouan (5186), Widad Temara (8617) replace relegated Safi (2061),
 * Dcheira (2063) and Yacoub El Mansour (2068). The union is kept so history
 * keeps resolving.
 */
export const BOTOLA_CLUB_IDS = [
  586, // AS FAR Rabat
  594, // RS Berkane
  2067, // Raja Club Athletic
  2064, // Wydad Casablanca
  2060, // Hassania d'Agadir
  2059, // Ittihad Tanger
  2065, // Kawkab Marrakech
  2071, // MAS de Fes
  2061, // Olympic Safi
  2063, // Olympique Dcheira
  2069, // Difaa El Jadidi
  2066, // Fath Union Sport
  2070, // CODM Meknes
  2072, // Renaissance Zemamra
  2062, // Union Touarga Sport
  2068, // US Yacoub El Mansour
  4771, // Union Sportive Amal Tiznit (promoted 26/27)
  5186, // Moghreb Atletico Tetouan (promoted 26/27)
  8617, // Widad Temara (promoted 26/27)
];

export const BSD_POSITION_MAP: Record<string, PlayerPosition> = {
  G: 'GK',
  D: 'DEF',
  M: 'MID',
  F: 'FWD',
};

export const BSD_STATUS_MAP: Record<string, FixtureStatus> = {
  upcoming: 'SCHEDULED',
  unresolved: 'SCHEDULED',
  live: 'LIVE',
  finished: 'FINISHED',
  postponed: 'POSTPONED',
  cancelled: 'CANCELLED',
};

/** BSD stage names that map to our gameweeks (varies by season). */
export const SYNCED_STAGES = ['league-phase', 'regular-season'];

export function priceFromMarketValue(marketValueEur: number | null | undefined): number {
  const value = Math.max(0, marketValueEur ?? 0);
  if (value <= 0) return 4.0;
  const scaled = 4 + (8 * Math.log10(1 + value / 50000)) / Math.log10(101);
  return Math.min(13, Math.max(4, Math.round(scaled * 10) / 10));
}

export function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: '', lastName: parts[0] };
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts[parts.length - 1] };
}
