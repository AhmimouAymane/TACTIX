/**
 * Service layer for the TACTIX admin SPA.
 *
 * No real network is performed: every call flows through `mockedFetch`,
 * an in-memory router over `mocks/db.ts` that yields typed responses.
 *
 * Authentication follows the "Ladmin" token flow: on login a
 * `ladmin_token` is written to localStorage and a tiny bearer header is
 * attached to every subsequent stubbed request.
 */
import type {
  Article,
  AuditAction,
  AuditLog,
  Club,
  FeatureFlag,
  Fixture,
  LoginRequest,
  LoginResponse,
  MatchEvent,
  MatchEventType,
  PaginatedResponse,
  PaginationMeta,
  Player,
  RoleName,
  User,
  UserStatus,
} from '../types/api';
import { MOCK_GAMEWEEKS, Stores } from '../mocks/db';

/* ---------- globals ---------- */

const LADMIN_TOKEN_KEY = 'ladmin_token';

export const auth = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(LADMIN_TOKEN_KEY);
  },
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LADMIN_TOKEN_KEY, token);
  },
  clearToken(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(LADMIN_TOKEN_KEY);
  },
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
  get bearer(): string {
    const t = this.getToken();
    return t ? `Bearer ${t}` : '';
  },
};

export class ApiError extends Error {
  public code: string;
  public status: number;
  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = 'ApiError';
  }
}

export interface MockResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<unknown>;
  headers: Headers;
}

export interface MockFetchOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  query?: Record<string, string>;
}

function jsonResponse<T>(data: T, init: { status?: number; meta?: Record<string, unknown> } = {}): MockResponse {
  const status = init.status ?? 200;
  const payload = init.meta ? { data, meta: init.meta } : { data };
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => payload,
    headers: new Headers({ 'Content-Type': 'application/json' }),
  };
}

function errorResponse(code: string, message: string, status: number): MockResponse {
  return {
    ok: false,
    status,
    statusText: 'Error',
    json: async () => ({ error: { code, message } }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  };
}

const delay = (cb: () => MockResponse) => new Promise<MockResponse>((resolve) => setTimeout(() => resolve(cb()), 220));

function splitPathQuery(url: string): { path: string; query: Record<string, string> } {
  const [pathname, search] = url.split('?');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const query: Record<string, string> = {};
  if (search) {
    for (const pair of search.split('&')) {
      const [k, v] = pair.split('=');
      query[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
    }
  }
  return { path, query };
}

function paginate<T extends object>(list: T[], query: Record<string, string>): PaginatedResponse<T> {
  const search = (query.q ?? query.search ?? '').toLowerCase();
  let page = Number(query.page) || 1;
  const perPage = Number(query.per_page) || Number(query.perPage) || 10;
  const hasSearch = search.length > 0;

  let items = list;
  if (query.status) items = items.filter((i) => String((i as unknown as { status?: string }).status ?? '') === query.status);
  if (query.role) items = items.filter((i) => String((i as unknown as { role?: string }).role ?? '') === query.role);
  if (query.category) items = items.filter((i) => String((i as unknown as { category?: string }).category ?? '') === query.category);
  if (query.type) items = items.filter((i) => String((i as unknown as { type?: string }).type ?? '') === query.type);

  if (hasSearch) {
    items = items.filter((i) => {
      const str = Object.values(i)
        .map((v) => (typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)))
        .join(' ')
        .toLowerCase();
      return str.includes(search);
    });
  }

  if (page < 1) page = 1;
  const total = items.length;
  const total_pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const paged = items.slice(start, start + perPage);
  return { data: paged, meta: { page, per_page: perPage, total, total_pages } as PaginationMeta };
}

function mutateUser(id: string, mut: (u: User) => void): MockResponse {
  const idx = Stores.users.findIndex((u) => u.id === id);
  if (idx === -1) return errorResponse('NOT_FOUND', 'User not found', 404);
  mut(Stores.users[idx]);
  return jsonResponse(Stores.users[idx]);
}

export default async function mockedFetch(url: string, options: MockFetchOptions = {}): Promise<MockResponse> {
  const { method = 'GET', body } = options;
  const { path, query } = splitPathQuery(url);

  /* ---------------- Auth ---------------- */
  if (path === '/auth/login' && method === 'POST') {
    const { email, password } = (body ?? {}) as LoginRequest;
    return delay(() => {
      if (!email || !password) return errorResponse('VALIDATION_ERROR', 'Email and password required', 400);
      const token = `ladmin.${btoa(email)}.${Date.now()}`;
      const user = Stores.users.find((u) => u.email === email) ?? Stores.users[0];
      return jsonResponse<LoginResponse>({
        access_token: token,
        refresh_token: `${token}.refresh`,
        expires_in: 3600,
        user,
      });
    });
  }

  /* ---------------- Admin Users ---------------- */
  if (path === '/admin/users' && method === 'GET') {
    return delay(() => jsonResponse(paginate(Stores.users, query)));
  }
  if (path.match(/^\/admin\/users\/[^/]+$/) && method === 'PATCH') {
    const id = path.split('/')[3];
    const idx = Stores.users.findIndex((u) => u.id === id);
    if (idx === -1) return errorResponse('NOT_FOUND', 'User not found', 404);
    Object.assign(Stores.users[idx], body as Partial<Pick<User, 'role' | 'status' | 'display_name'>>, { updated_at: new Date().toISOString() });
    return jsonResponse(Stores.users[idx]);
  }
  if (path.match(/^\/admin\/users\/[^/]+\/suspend$/) && method === 'POST') {
    const id = path.split('/')[3];
    return mutateUser(id, (u) => {
      u.status = 'suspended';
      u.updated_at = new Date().toISOString();
    });
  }
  if (path.match(/^\/admin\/users\/[^/]+\/restore$/) && method === 'POST') {
    const id = path.split('/')[3];
    return mutateUser(id, (u) => {
      u.status = 'active';
      u.updated_at = new Date().toISOString();
    });
  }

  /* ---------------- Admin Players / Fixtures (stubbed writes) ---------------- */
  if (path === '/admin/players' && method === 'POST') {
    return jsonResponse({ ...Stores.players[0], id: 'pl-new', created_at: new Date().toISOString() });
  }
  if (path.match(/^\/admin\/players\/[^/]+$/) && method === 'PATCH') {
    return jsonResponse(Stores.players[0]);
  }
  if (path === '/admin/fixtures' && method === 'POST') {
    return jsonResponse({ ...Stores.fixtures[0], id: 'fix-new', created_at: new Date().toISOString() });
  }
  if (path.match(/^\/admin\/fixtures\/[^/]+$/) && method === 'PATCH') {
    return jsonResponse(Stores.fixtures[0]);
  }
  if (path === '/admin/stats/correct' && method === 'POST') {
    return jsonResponse({ corrected: true, recalculated: true });
  }

  /* ---------------- Matches (read) ---------------- */
  if (path === '/matches' && method === 'GET') return jsonResponse(Stores.fixtures);
  const eventsMatch = path.match(/^\/matches\/([^/]+)\/events$/);
  if (eventsMatch && method === 'GET') {
    const events = Stores.matchEvents.filter((e) => e.fixture_id === eventsMatch[1]);
    return jsonResponse(events);
  }

  /* ---------------- Match Event override ---------------- */
  if (path === '/admin/match-events' && method === 'POST') {
    const payload = body as Partial<MatchEvent>;
    const next = Stores.nextEventId;
    const [prefix, num] = next.split('-');
    Stores.nextEventId = `${prefix}-${Number(num) + 1}`;
    const created: MatchEvent = {
      id: next,
      fixture_id: payload.fixture_id ?? '',
      minute: payload.minute ?? 1,
      added_minute: payload.added_minute,
      type: payload.type ?? 'goal',
      player_id: payload.player_id,
      player_name: payload.player_name,
      card: payload.card,
      detail: payload.detail ?? '',
      sequence: Stores.matchEvents.length + 1,
      verified: payload.verified ?? false,
      created_at: new Date().toISOString(),
    };
    Stores.matchEvents.push(created);
    return jsonResponse(created);
  }
  if (path.match(/^\/admin\/match-events\/[^/]+$/) && method === 'PATCH') {
    const id = path.split('/')[3];
    const patch = body as Partial<MatchEvent>;
    const idx = Stores.matchEvents.findIndex((e) => e.id === id);
    if (idx === -1) return errorResponse('NOT_FOUND', 'Match event not found', 404);
    Object.assign(Stores.matchEvents[idx], patch);
    return jsonResponse(Stores.matchEvents[idx]);
  }
  if (path.match(/^\/admin\/match-events\/[^/]+$/) && method === 'DELETE') {
    const id = path.split('/')[3];
    const idx = Stores.matchEvents.findIndex((e) => e.id === id);
    if (idx === -1) return errorResponse('NOT_FOUND', 'Match event not found', 404);
    const [removed] = Stores.matchEvents.splice(idx, 1);
    return jsonResponse(removed);
  }
  if (path === '/admin/match-events/repair' && method === 'POST') {
    return jsonResponse({ total: Stores.matchEvents.length, verified: Stores.matchEvents.filter((e) => e.verified).length });
  }

  /* ---------------- Pricing re-pricing preview (mock) ---------------- */
  if (path === '/admin/pricing/preview' && method === 'POST') {
    const bodyParsed = (body ?? {}) as { player_id?: string };
    const player = bodyParsed.player_id
      ? Stores.players.find((p) => p.id === bodyParsed.player_id)
      : Stores.players[0];
    if (!player) return errorResponse('NOT_FOUND', 'Player not found', 404);
    const delta = Math.floor(Math.random() * 3) - 1;
    return jsonResponse({
      player_id: player.id,
      player_name: `${player.first_name} ${player.last_name}`,
      old_price: player.current_price,
      new_price: player.current_price + delta,
      delta,
      reason: 'Simulated market adjustment',
      affected_teams: Math.floor(Math.random() * 50) + 10,
    });
  }

  /* ---------------- Content ---------------- */
  if (path === '/admin/news' && method === 'GET') {
    return delay(() => jsonResponse(paginate(Stores.articles, query)));
  }
  if (path === '/admin/news' && method === 'POST') {
    const patch = body as Partial<Article>;
    const created: Article = {
      id: `art-${Stores.articles.length + 1}`,
      title: patch.title ?? 'Untitled',
      slug: patch.slug ?? '',
      category: patch.category ?? 'news',
      cover_image: patch.cover_image,
      status: patch.status ?? 'draft',
      author_id: patch.author_id ?? 'usr-1',
      published_at: patch.published_at ?? null,
      created_at: new Date().toISOString(),
    };
    Stores.articles.push(created);
    return jsonResponse(created);
  }
  if (path.match(/^\/admin\/news\/[^/]+$/) && method === 'PATCH') {
    const id = path.split('/')[3];
    const patch = body as Partial<Article>;
    const idx = Stores.articles.findIndex((a) => a.id === id);
    if (idx === -1) return errorResponse('NOT_FOUND', 'Article not found', 404);
    Object.assign(Stores.articles[idx], patch);
    return jsonResponse(Stores.articles[idx]);
  }
  if (path === '/admin/announcements' && method === 'POST') {
    return jsonResponse({
      id: `ann-${Math.floor(Math.random() * 1000)}`,
      title: 'Announcement',
      body: '',
      target: 'all',
      status: 'draft',
      published_at: null,
      created_at: new Date().toISOString(),
    });
  }

  /* ---------------- System: feature flags ---------------- */
  if (path === '/admin/feature-flags' && method === 'GET') return jsonResponse(Stores.featureFlags);
  if (path === '/admin/feature-flags' && method === 'POST') {
    const patch = body as Partial<FeatureFlag>;
    if (patch.id) {
      const idx = Stores.featureFlags.findIndex((f) => f.id === patch.id);
      if (idx >= 0) {
        Object.assign(Stores.featureFlags[idx], patch, { updated_at: new Date().toISOString() });
        return jsonResponse(Stores.featureFlags[idx]);
      }
    }
    const created: FeatureFlag = {
      id: `ff-${Stores.featureFlags.length + 1}`,
      name: patch.name ?? 'unknown_flag',
      enabled: patch.enabled ?? false,
      updated_by: 'usr-1',
      updated_at: new Date().toISOString(),
    };
    Stores.featureFlags.push(created);
    return jsonResponse(created);
  }

  /* ---------------- System: audit log ---------------- */
  if (path === '/admin/audit-log' && method === 'GET') {
    return delay(() => jsonResponse(paginate(Stores.auditLog, query)));
  }

  /* ---------------- System: maintenance mode ---------------- */
  if (path === '/admin/maintenance-mode' && method === 'POST') {
    const bodyParsed = (body ?? {}) as { enabled: boolean };
    return jsonResponse({ enabled: bodyParsed.enabled, updated_at: new Date().toISOString() });
  }

  /* ---------------- Reference data ---------------- */
  if (path === '/clubs' && method === 'GET') return jsonResponse(Stores.clubs);
  if (path === '/players' && method === 'GET') return jsonResponse(Stores.players);
  if (path === '/gameweeks' && method === 'GET') return jsonResponse(MOCK_GAMEWEEKS);

  return errorResponse('NOT_FOUND', `Route not found: ${method} ${path}`, 404);
}

/* ===================== typed service stubs (admin endpoints) ===================== */

export const AdminApi = {
  /* Auth */
  login: async (req: LoginRequest): Promise<LoginResponse> => {
    const res = await mockedFetch('/auth/login', { method: 'POST', body: req });
    if (!res.ok) throw new ApiError('UNAUTHORIZED', 'Invalid credentials', 401);
    return (await res.json()) as LoginResponse;
  },

  /* Users */
  getUsers: async (opts: { page?: number; per_page?: number; q?: string; status?: UserStatus; role?: RoleName } = {}): Promise<PaginatedResponse<User>> => {
    const q = new URLSearchParams();
    if (opts.page) q.set('page', String(opts.page));
    if (opts.per_page) q.set('per_page', String(opts.per_page));
    if (opts.q) q.set('q', opts.q);
    if (opts.status) q.set('status', opts.status);
    if (opts.role) q.set('role', opts.role);
    const res = await mockedFetch(`/admin/users?${q.toString()}`);
    if (!res.ok) throw new ApiError('SERVER_ERROR', 'Failed to load users', 500);
    return (await res.json()) as PaginatedResponse<User>;
  },
  updateUser: async (id: string, patch: Partial<Pick<User, 'role' | 'status' | 'display_name'>>): Promise<User> => {
    const res = await mockedFetch(`/admin/users/${id}`, { method: 'PATCH', body: patch });
    if (!res.ok) throw new ApiError('NOT_FOUND', 'User not found', 404);
    return (await res.json()) as User;
  },
  suspendUser: async (id: string): Promise<User> => {
    const res = await mockedFetch(`/admin/users/${id}/suspend`, { method: 'POST' });
    if (!res.ok) throw new ApiError('NOT_FOUND', 'User not found', 404);
    return (await res.json()) as User;
  },
  restoreUser: async (id: string): Promise<User> => {
    const res = await mockedFetch(`/admin/users/${id}/restore`, { method: 'POST' });
    if (!res.ok) throw new ApiError('NOT_FOUND', 'User not found', 404);
    return (await res.json()) as User;
  },

  /* Matches & events */
  getFixtures: async (): Promise<Fixture[]> => {
    const res = await mockedFetch('/matches');
    if (!res.ok) throw new ApiError('SERVER_ERROR', 'Failed to load fixtures', 500);
    return (await res.json()) as Fixture[];
  },
  getMatchEvents: async (fixtureId: string): Promise<MatchEvent[]> => {
    const res = await mockedFetch(`/matches/${fixtureId}/events`);
    if (!res.ok) throw new ApiError('NOT_FOUND', 'Fixture not found', 404);
    return (await res.json()) as MatchEvent[];
  },
  addMatchEvent: async (event: Partial<MatchEvent>): Promise<MatchEvent> => {
    const res = await mockedFetch('/admin/match-events', { method: 'POST', body: event });
    if (!res.ok) throw new ApiError('VALIDATION_ERROR', 'Could not create event', 400);
    return (await res.json()) as MatchEvent;
  },
  updateMatchEvent: async (id: string, patch: Partial<MatchEvent>): Promise<MatchEvent> => {
    const res = await mockedFetch(`/admin/match-events/${id}`, { method: 'PATCH', body: patch });
    if (!res.ok) throw new ApiError('NOT_FOUND', 'Match event not found', 404);
    return (await res.json()) as MatchEvent;
  },
  deleteMatchEvent: async (id: string): Promise<MatchEvent> => {
    const res = await mockedFetch(`/admin/match-events/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new ApiError('NOT_FOUND', 'Match event not found', 404);
    return (await res.json()) as MatchEvent;
  },
  repairMatchEvents: async (): Promise<{ total: number; verified: number }> => {
    const res = await mockedFetch('/admin/match-events/repair', { method: 'POST' });
    return (await res.json()) as { total: number; verified: number };
  },

  /* Pricing */
  previewPrice: async (playerId?: string): Promise<Record<string, unknown>> => {
    const res = await mockedFetch('/admin/pricing/preview', { method: 'POST', body: { player_id: playerId } });
    return (await res.json()) as Record<string, unknown>;
  },

  /* Content */
  listArticles: async (opts: { page?: number; per_page?: number; q?: string } = {}): Promise<PaginatedResponse<Article>> => {
    const q = new URLSearchParams();
    if (opts.page) q.set('page', String(opts.page));
    if (opts.per_page) q.set('per_page', String(opts.per_page));
    if (opts.q) q.set('q', opts.q);
    const res = await mockedFetch(`/admin/news?${q.toString()}`);
    if (!res.ok) throw new ApiError('SERVER_ERROR', 'Failed to load articles', 500);
    return (await res.json()) as PaginatedResponse<Article>;
  },
  createArticle: async (article: Partial<Article>): Promise<Article> => {
    const res = await mockedFetch('/admin/news', { method: 'POST', body: article });
    return (await res.json()) as Article;
  },
  updateArticle: async (id: string, patch: Partial<Article>): Promise<Article> => {
    const res = await mockedFetch(`/admin/news/${id}`, { method: 'PATCH', body: patch });
    if (!res.ok) throw new ApiError('NOT_FOUND', 'Article not found', 404);
    return (await res.json()) as Article;
  },
  publishArticle: (id: string) => AdminApi.updateArticle(id, { status: 'published', published_at: new Date().toISOString() }),

  /* Reference */
  getClubs: async (): Promise<Club[]> => {
    const res = await mockedFetch('/clubs');
    return (await res.json()) as Club[];
  },
  getPlayers: async (): Promise<Player[]> => {
    const res = await mockedFetch('/players');
    return (await res.json()) as Player[];
  },

  /* System */
  getFeatureFlags: async (): Promise<FeatureFlag[]> => {
    const res = await mockedFetch('/admin/feature-flags');
    return (await res.json()) as FeatureFlag[];
  },
  updateFeatureFlag: async (flag: Partial<FeatureFlag>): Promise<FeatureFlag> => {
    const res = await mockedFetch('/admin/feature-flags', { method: 'POST', body: flag });
    return (await res.json()) as FeatureFlag;
  },
  getAuditLog: async (opts: { page?: number; per_page?: number; q?: string } = {}): Promise<PaginatedResponse<AuditLog>> => {
    const q = new URLSearchParams();
    if (opts.page) q.set('page', String(opts.page));
    if (opts.per_page) q.set('per_page', String(opts.per_page));
    if (opts.q) q.set('q', opts.q);
    const res = await mockedFetch(`/admin/audit-log?${q.toString()}`);
    if (!res.ok) throw new ApiError('SERVER_ERROR', 'Failed to load audit log', 500);
    return (await res.json()) as PaginatedResponse<AuditLog>;
  },
  setMaintenance: async (enabled: boolean): Promise<{ enabled: boolean; updated_at: string }> => {
    const res = await mockedFetch('/admin/maintenance-mode', { method: 'POST', body: { enabled } });
    return (await res.json()) as { enabled: boolean; updated_at: string };
  },
};

export const EventTypes: MatchEventType[] = ['goal', 'assist', 'card', 'sub', 'save', 'penalty', 'var'];
export const CardTypes = ['yellow', 'red', 'yellow-red'] as const;
export const AuditActions: AuditAction[] = [
  'user_suspend', 'user_restore', 'user_role_update', 'player_price_change', 'player_update',
  'fixture_update', 'fixture_result', 'match_event_add', 'match_event_edit', 'match_event_delete',
  'stats_correct', 'article_create', 'article_update', 'article_publish', 'announcement_create',
  'feature_flag_update', 'maintenance_mode_update',
];
