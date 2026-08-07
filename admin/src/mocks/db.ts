/**
 * In-memory mock database backing the mocked fetch.
 * Populated from docs/engineering/Database.md entity definitions.
 * Mutators used by service stubs to simulate writes.
 */
import type {
  Article,
  AuditLog,
  Club,
  FeatureFlag,
  Fixture,
  Gameweek,
  User,
  MatchEvent,
  Player,
} from '../types/api';

/* ---------- helpers ---------- */
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const now = () => new Date().toISOString();

export const MOCK_CLUBS: Club[] = [
  {
    id: 'club-1',
    name: 'Wydad Casablanca',
    short_name: 'WAC',
    city: 'Casablanca',
    stadium: 'Stadium Boleiro',
    crest_url: 'https://placehold.co/48x48/png?text=WAC',
    colors: '#0065B8/#FFFFFF',
    status: 'active',
    created_at: now(),
    updated_at: now(),
  },
  {
    id: 'club-2',
    name: 'RAK Casablanca',
    short_name: 'RAK',
    city: 'Casablanca',
    stadium: 'Stadium Mohamed V',
    crest_url: 'https://placehold.co/48x48/png?text=RAK',
    colors: '#DC143C/#FFFFFF',
    status: 'active',
    created_at: now(),
    updated_at: now(),
  },
  {
    id: 'club-3',
    name: 'FAR Rabat',
    short_name: 'FAR',
    city: 'Rabat',
    stadium: 'Stadium Mohamed V',
    crest_url: 'https://placehold.co/48x48/png?text=FAR',
    colors: '#007A33/#FFFFFF',
    status: 'active',
    created_at: now(),
    updated_at: now(),
  },
  {
    id: 'club-4',
    name: 'Ittihad Tanger',
    short_name: 'ITT',
    city: 'Tangier',
    stadium: 'Stadium Salle C',
    crest_url: 'https://placehold.co/48x48/png?text=ITT',
    colors: '#0066B3/#FF0000',
    status: 'active',
    created_at: now(),
    updated_at: now(),
  },
  {
    id: 'club-5',
    name: 'Olympique Casablanca',
    short_name: 'OCM',
    city: 'Casablanca',
    stadium: 'Stadium Boleiro',
    crest_url: 'https://placehold.co/48x48/png?text=OCM',
    colors: '#00489C/#FFFFFF',
    status: 'active',
    created_at: now(),
    updated_at: now(),
  },
];

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'pl-1',
    club_id: 'club-1',
    first_name: 'Youssef',
    last_name: 'En-Nesyri',
    photo_url: 'https://placehold.co/40x40/png?text=EN',
    position: 'FWD',
    nationality: 'Morocco',
    date_of_birth: '1994-05-20',
    shirt_number: 9,
    status: 'active',
    starting_price: 80,
    current_price: 85,
    previous_price: 80,
    created_at: now(),
    updated_at: now(),
  },
  {
    id: 'pl-2',
    club_id: 'club-1',
    first_name: 'Achraf',
    last_name: 'Hakimi',
    photo_url: 'https://placehold.co/40x40/png?text=AH',
    position: 'DEF',
    nationality: 'Morocco',
    date_of_birth: '1998-11-04',
    shirt_number: 3,
    status: 'active',
    starting_price: 75,
    current_price: 80,
    previous_price: 75,
    created_at: now(),
    updated_at: now(),
  },
  {
    id: 'pl-3',
    club_id: 'club-3',
    first_name: 'Yassine',
    last_name: 'Bennacer',
    photo_url: 'https://placehold.co/40x40/png?text=YB',
    position: 'MID',
    nationality: 'Algeria',
    date_of_birth: '1994-12-30',
    shirt_number: 8,
    status: 'active',
    starting_price: 70,
    current_price: 72,
    previous_price: 70,
    created_at: now(),
    updated_at: now(),
  },
];

export const MOCK_USER_ROLES = ['admin', 'moderator', 'user'] as const;

const firstNames = ['Ahmed', 'Fatima', 'Mohamed', 'Layla', 'Omar', 'Zineb', 'Karim', 'Salma', 'Adil', 'Imane'];
const lastNames = ['Benali', 'Cherif', 'Mansouri', 'El Fassi', 'Berrada', 'Saidi', 'Haddad', 'Tahir', 'Moulin', 'Dahbi'];

export const MOCK_USERS: User[] = Array.from({ length: 24 }).map((_, i) => {
  const role = i < 2 ? 'admin' : i < 4 ? 'moderator' : 'user';
  const status = i === 4 ? 'suspended' : i === 5 ? 'banned' : 'active';
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const created = new Date(Date.now() - rand(1, 60) * 24 * 3600_000).toISOString();
  return {
    id: `usr-${i + 1}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@tactix.example`,
    username: `${fn.toLowerCase()}${ln.toLowerCase()}${i + 1}`,
    display_name: `${fn} ${ln}`,
    country: 'Morocco',
    language: i % 3 === 0 ? 'fr' : i % 3 === 1 ? 'ar' : 'en',
    avatar_url: `https://placehold.co/32x32/png?text=${fn[0]}${ln[0]}`,
    bio: '',
    role,
    status,
    email_verified_at: created,
    created_at: created,
    updated_at: now(),
    deleted_at: status === 'banned' ? now() : undefined,
  };
});

export const MOCK_GAMEWEEKS: Gameweek[] = [
  { id: 'gw-1', competition_id: 'comp-1', number: 1, deadline_at: '2026-08-10T18:00:00Z', status: 'finished', created_at: now() },
  { id: 'gw-2', competition_id: 'comp-1', number: 2, deadline_at: '2026-08-17T18:00:00Z', status: 'finished', created_at: now() },
  { id: 'gw-3', competition_id: 'comp-1', number: 3, deadline_at: '2026-08-24T18:00:00Z', status: 'live', created_at: now() },
  { id: 'gw-4', competition_id: 'comp-1', number: 4, deadline_at: '2026-08-31T18:00:00Z', status: 'upcoming', created_at: now() },
];

export const MOCK_FIXTURES: Fixture[] = [
  { id: 'fix-1', competition_id: 'comp-1', gameweek_id: 'gw-3', home_club_id: 'club-1', away_club_id: 'club-2', venue: 'Stadium Boleiro', kickoff_at: '2026-08-22T19:00:00Z', status: 'live', home_score: 1, away_score: 0, created_at: now(), updated_at: now() },
  { id: 'fix-2', competition_id: 'comp-1', gameweek_id: 'gw-3', home_club_id: 'club-3', away_club_id: 'club-4', venue: 'Stadium Mohamed V', kickoff_at: '2026-08-22T16:00:00Z', status: 'finished', home_score: 2, away_score: 1, created_at: now(), updated_at: now() },
  { id: 'fix-3', competition_id: 'comp-1', gameweek_id: 'gw-3', home_club_id: 'club-5', away_club_id: 'club-1', venue: 'Stadium Boleiro', kickoff_at: '2026-08-23T18:00:00Z', status: 'scheduled', created_at: now(), updated_at: now() },
  { id: 'fix-4', competition_id: 'comp-1', gameweek_id: 'gw-2', home_club_id: 'club-2', away_club_id: 'club-3', venue: 'Stadium Mohamed V', kickoff_at: '2026-08-16T16:00:00Z', status: 'finished', home_score: 0, away_score: 0, created_at: now(), updated_at: now() },
  { id: 'fix-5', competition_id: 'comp-1', gameweek_id: 'gw-2', home_club_id: 'club-4', away_club_id: 'club-5', venue: 'Stadium Salle C', kickoff_at: '2026-08-15T18:00:00Z', status: 'finished', home_score: 3, away_score: 2, created_at: now(), updated_at: now() },
];

let eventSeq = 0;
const seedEvent = (fixture_id: string, payload: Partial<MatchEvent>) => {
  eventSeq += 1;
  return {
    id: `evt-${eventSeq}`,
    fixture_id,
    minute: 1,
    type: 'goal',
    player_id: undefined,
    player_name: '',
    detail: '',
    sequence: eventSeq,
    verified: false,
    created_at: now(),
    ...payload,
  } as MatchEvent;
};

export const MOCK_MATCH_EVENTS: MatchEvent[] = [
  seedEvent('fix-1', { minute: 22, type: 'goal', player_id: 'pl-1', player_name: 'Y. En-Nesyri', detail: 'Right-footed shot from the centre', verified: true }),
  seedEvent('fix-1', { minute: 45, type: 'card', player_id: 'pl-2', player_name: 'A. Hakimi', card: 'yellow', detail: 'Foul', verified: true }),
  seedEvent('fix-2', { minute: 12, type: 'goal', player_id: 'pl-3', player_name: 'Y. Bennacer', detail: 'Penalty', verified: true }),
  seedEvent('fix-2', { minute: 67, type: 'sub', player_id: 'pl-3', player_name: 'Y. Bennacer', detail: 'Substituted off', verified: false }),
];

export const MOCK_ARTICLES: Article[] = [
  { id: 'art-1', title: 'Welcome to the new season', slug: 'welcome-new-season', category: 'news', cover_image: 'https://placehold.co/120x80', status: 'published', author_id: 'usr-1', published_at: '2026-08-01T10:00:00Z', created_at: '2026-07-28T10:00:00Z' },
  { id: 'art-2', title: 'Transfers roundup: week 1', slug: 'transfers-week-1', category: 'transfers', cover_image: 'https://placehold.co/120x80', status: 'published', author_id: 'usr-2', published_at: '2026-08-03T10:00:00Z', created_at: '2026-08-02T10:00:00Z' },
  { id: 'art-3', title: 'How the new scoring works', slug: 'new-scoring', category: 'features', cover_image: 'https://placehold.co/120x80', status: 'draft', author_id: 'usr-1', published_at: null, created_at: '2026-08-04T10:00:00Z' },
  { id: 'art-4', title: 'Botola Pro Inwi awards night', slug: 'awards-night', category: 'news', cover_image: 'https://placehold.co/120x80', status: 'review', author_id: 'usr-2', published_at: null, created_at: '2026-08-05T10:00:00Z' },
];

export const MOCK_ARTICLE_TRANSLATIONS = [
  { id: 'tr-1', article_id: 'art-1', language: 'en', title: 'Welcome to the new season', body: 'The new fantasy football season is here...', created_at: '2026-07-28T10:00:00Z' },
  { id: 'tr-2', article_id: 'art-1', language: 'ar', title: 'موسم التريك يبدأ', body: 'موسم كرة القدم الخيالي الجديد هنا...', created_at: '2026-07-28T10:00:00Z' },
  { id: 'tr-3', article_id: 'art-1', language: 'fr', title: 'Bienvenue dans la nouvelle saison', body: 'La nouvelle saison de fantasy football est lancée...', created_at: '2026-07-28T10:00:00Z' },
];

const auditActions = [
  'user_suspend',
  'user_restore',
  'user_role_update',
  'player_price_change',
  'player_update',
  'fixture_update',
  'fixture_result',
  'match_event_add',
  'match_event_edit',
  'match_event_delete',
  'stats_correct',
  'article_create',
  'article_update',
  'article_publish',
  'announcement_create',
  'feature_flag_update',
  'maintenance_mode_update',
] as const;

const auditEntityTypes = ['User', 'Player', 'Fixture', 'MatchEvent', 'Article', 'FeatureFlag', 'System'] as const;

export const MOCK_AUDIT_LOG: AuditLog[] = Array.from({ length: 18 }).map((_, i) => {
  const created = new Date(Date.now() - (18 - i) * 45 * 60_000).toISOString();
  return {
    id: `audit-${i + 1}`,
    actor_id: i % 2 === 0 ? 'usr-1' : 'usr-2',
    action: auditActions[i % auditActions.length],
    entity_type: auditEntityTypes[i % auditEntityTypes.length],
    entity_id: `ent-${i + 1}`,
    before: { status: 'active' },
    after: { status: 'suspended' },
    created_at: created,
  };
});

export const MOCK_FEATURE_FLAGS: FeatureFlag[] = [
  { id: 'ff-1', name: 'maintenance_mode', enabled: false, updated_by: 'usr-1', updated_at: now() },
  { id: 'ff-2', name: 'live_scoring', enabled: true, updated_by: 'usr-1', updated_at: now() },
  { id: 'ff-3', name: 'fantasy_transfers', enabled: true, updated_by: 'usr-1', updated_at: now() },
  { id: 'ff-4', name: 'premium_content', enabled: false, updated_by: 'usr-1', updated_at: now() },
  { id: 'ff-5', name: 'notifications_push', enabled: true, updated_by: 'usr-1', updated_at: now() },
  { id: 'ff-6', name: 'beta_scoring_v2', enabled: false, updated_by: 'usr-1', updated_at: now() },
];

/* ---------- exportable stores (mutated by service stubs) ---------- */

export const Stores = {
  users: MOCK_USERS,
  clubs: MOCK_CLUBS,
  players: MOCK_PLAYERS,
  fixtures: MOCK_FIXTURES,
  matchEvents: MOCK_MATCH_EVENTS,
  articles: MOCK_ARTICLES,
  articleTranslations: MOCK_ARTICLE_TRANSLATIONS,
  auditLog: MOCK_AUDIT_LOG,
  featureFlags: MOCK_FEATURE_FLAGS,
  nextEventId: 'evt-99',
};

export const clubsByName = (id: string): Club | undefined => MOCK_CLUBS.find((c) => c.id === id);
