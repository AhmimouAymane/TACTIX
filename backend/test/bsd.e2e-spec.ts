import { BsdClient } from '../src/modules/integrations/bsd/bsd.client';

/**
 * Live reconnaissance against the Bzzoiro Sports Data API.
 * Runs ONLY when BSD_API_TOKEN is set:
 *   $env:BSD_API_TOKEN="..."; npm run test:e2e -- bsd.e2e-spec
 * Without a token the suite is skipped so CI stays green.
 */
const token = process.env.BSD_API_TOKEN;
const maybe = token ? describe : describe.skip;

maybe('BSD live recon (Botola Pro)', () => {
  let client: BsdClient;

  beforeAll(() => {
    process.env.BSD_API_TOKEN = token;
    client = new BsdClient();
  });

  it('lists Botola teams with stable ids', async () => {
    const teams = await client.listTeams(53);
    expect(teams.length).toBeGreaterThanOrEqual(16);
    for (const team of teams.slice(0, 3)) {
      expect(typeof team.id).toBe('number');
      expect(team.name).toBeTruthy();
    }
    console.log(
      'teams:',
      teams.map((t) => `${t.id}:${t.name}`).join(' | ').slice(0, 400),
    );
  });

  it('returns a squad with positions and availability', async () => {
    const teams = await client.listTeams(53);
    const squad = await client.getSquad(teams[0].id);
    expect(squad.players.length).toBeGreaterThan(0);
    const entry = squad.players[0];
    expect(typeof entry.id).toBe('number');
    expect(entry.name).toBeTruthy();
    console.log('squad[0]:', JSON.stringify(entry).slice(0, 400));
  });

  it('lists finished events with scores and rounds', async () => {
    const events = await client.listEvents({
      league_id: 53,
      status: 'finished',
      limit: 5,
    });
    expect(events.length).toBeGreaterThan(0);
    expect(typeof events[0].id).toBe('number');
    expect(events[0].event_date).toBeTruthy();
    console.log('event[0]:', JSON.stringify(events[0]).slice(0, 500));
  });

  it('returns incidents and player stats for a finished event', async () => {
    const events = await client.listEvents({
      league_id: 53,
      status: 'finished',
      limit: 5,
    });
    const incidents = await client.getIncidents(events[0].id);
    expect(Array.isArray(incidents.incidents)).toBe(true);
    console.log('incident[0]:', JSON.stringify(incidents.incidents[0] ?? null).slice(0, 400));

    const stats = await client.getPlayerStats(events[0].id);
    expect(Array.isArray(stats.player_stats)).toBe(true);
    console.log('stat[0]:', JSON.stringify(stats.player_stats[0] ?? null).slice(0, 400));
  });
});
