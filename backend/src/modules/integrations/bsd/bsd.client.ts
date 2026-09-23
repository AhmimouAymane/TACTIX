import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import {
  BsdEvent,
  BsdIncidentList,
  BsdPlayerDetail,
  BsdPlayerStatsList,
  BsdSeasonList,
  BsdSquadResponse,
  BsdTeam,
} from './bsd.types';

export class BsdError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly path: string,
  ) {
    super(message);
    this.name = 'BsdError';
  }
}

const BASE_URL = 'https://sports.bzzoiro.com/api/v2';
const PAGE_SIZE = 200;

@Injectable()
export class BsdClient {
  private token(): string {
    const token = process.env.BSD_API_TOKEN;
    if (!token) {
      throw new ServiceUnavailableException(
        'BSD sync is not configured (BSD_API_TOKEN missing)',
      );
    }
    return token;
  }

  async get<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Token ${this.token()}` },
    });

    if (!res.ok) {
      throw new BsdError(
        `BSD request failed: ${res.status} ${res.statusText}`,
        res.status,
        path,
      );
    }

    return (await res.json()) as T;
  }

  async listAll<T>(path: string, params: Record<string, string | number> = {}): Promise<T[]> {
    const items: T[] = [];
    let offset = 0;

    for (;;) {
      const page = await this.get<T[] | { results?: T[]; next?: string | null }>(path, {
        ...params,
        limit: PAGE_SIZE,
        offset,
      });
      const batch = Array.isArray(page) ? page : (page.results ?? []);
      items.push(...batch);

      if (!Array.isArray(page) && page.next) {
        offset += batch.length;
        if (batch.length === 0) break;
        continue;
      }
      if (batch.length < PAGE_SIZE) break;
      offset += batch.length;
    }

    return items;
  }

  getSeasons(leagueId: number): Promise<BsdSeasonList> {
    return this.get(`/leagues/${leagueId}/seasons/`);
  }

  listTeams(leagueId: number, seasonId?: number): Promise<BsdTeam[]> {
    return this.listAll<BsdTeam>('/teams/', {
      league_id: leagueId,
      ...(seasonId ? { season_id: seasonId } : {}),
    });
  }

  getSquad(teamId: number): Promise<BsdSquadResponse> {
    return this.get(`/teams/${teamId}/squad/`);
  }

  getPlayer(playerId: number): Promise<BsdPlayerDetail> {
    return this.get(`/players/${playerId}/`);
  }

  listEvents(params: Record<string, string | number>): Promise<BsdEvent[]> {
    return this.listAll<BsdEvent>('/events/', params);
  }

  getIncidents(eventId: number): Promise<BsdIncidentList> {
    return this.get(`/events/${eventId}/incidents/`);
  }

  getPlayerStats(eventId: number): Promise<BsdPlayerStatsList> {
    return this.get(`/events/${eventId}/player-stats/`);
  }

  imageUrl(kind: 'team' | 'player', id: number): string {
    return `https://sports.bzzoiro.com/img/${kind}/${id}/`;
  }
}
