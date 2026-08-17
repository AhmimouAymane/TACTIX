import { PlayerPosition } from '@prisma/client';
import { ScoringService } from '../src/modules/scoring/scoring.service';

describe('ScoringService', () => {
  let service: ScoringService;

  beforeEach(() => {
    service = new ScoringService({} as never);
  });

  it('awards appearance points only', () => {
    expect(
      service.computePlayerPoints({
        position: PlayerPosition.MID,
        appeared: true,
        goals: 0,
        assists: 0,
        saves: 0,
        penaltySaved: 0,
        penaltyMissed: 0,
        ownGoals: 0,
        yellowCards: 0,
        redCards: 0,
        goalsConceded: 0,
        cleanSheet: false,
      }),
    ).toBe(2);
  });

  it('returns zero when the player did not appear', () => {
    expect(
      service.computePlayerPoints({
        position: PlayerPosition.FWD,
        appeared: false,
        goals: 3,
        assists: 0,
        saves: 0,
        penaltySaved: 0,
        penaltyMissed: 0,
        ownGoals: 0,
        yellowCards: 0,
        redCards: 0,
        goalsConceded: 0,
        cleanSheet: false,
      }),
    ).toBe(0);
  });

  it('awards position-scaled goal points', () => {
    const base = {
      appeared: true,
      assists: 0,
      saves: 0,
      penaltySaved: 0,
      penaltyMissed: 0,
      ownGoals: 0,
      yellowCards: 0,
      redCards: 0,
      goalsConceded: 0,
      cleanSheet: false,
    };

    expect(
      service.computePlayerPoints({ ...base, position: PlayerPosition.DEF, goals: 1 }),
    ).toBe(8);
    expect(
      service.computePlayerPoints({ ...base, position: PlayerPosition.MID, goals: 2 }),
    ).toBe(12);
    expect(
      service.computePlayerPoints({ ...base, position: PlayerPosition.FWD, goals: 1 }),
    ).toBe(6);
  });

  it('adds clean sheet points for GK/DEF only', () => {
    const base = {
      appeared: true,
      goals: 0,
      assists: 0,
      saves: 0,
      penaltySaved: 0,
      penaltyMissed: 0,
      ownGoals: 0,
      yellowCards: 0,
      redCards: 0,
      goalsConceded: 0,
      cleanSheet: true,
    };

    expect(
      service.computePlayerPoints({ ...base, position: PlayerPosition.GK }),
    ).toBe(6);
    expect(
      service.computePlayerPoints({ ...base, position: PlayerPosition.MID }),
    ).toBe(3);
    expect(
      service.computePlayerPoints({ ...base, position: PlayerPosition.FWD }),
    ).toBe(2);
  });

  it('rewards saves and penalises goals conceded for the GK', () => {
    expect(
      service.computePlayerPoints({
        position: PlayerPosition.GK,
        appeared: true,
        goals: 0,
        assists: 0,
        saves: 6,
        penaltySaved: 0,
        penaltyMissed: 0,
        ownGoals: 0,
        yellowCards: 0,
        redCards: 0,
        goalsConceded: 4,
        cleanSheet: false,
      }),
    ).toBe(2);
  });

  it('handles cards, penalties and own goals', () => {
    expect(
      service.computePlayerPoints({
        position: PlayerPosition.DEF,
        appeared: true,
        goals: 0,
        assists: 0,
        saves: 0,
        penaltySaved: 1,
        penaltyMissed: 1,
        ownGoals: 1,
        yellowCards: 1,
        redCards: 1,
        goalsConceded: 0,
        cleanSheet: false,
      }),
    ).toBe(0);
  });

  it('never returns negative points', () => {
    expect(
      service.computePlayerPoints({
        position: PlayerPosition.GK,
        appeared: true,
        goals: 0,
        assists: 0,
        saves: 0,
        penaltySaved: 0,
        penaltyMissed: 0,
        ownGoals: 0,
        yellowCards: 0,
        redCards: 2,
        goalsConceded: 6,
        cleanSheet: false,
      }),
    ).toBe(0);
  });

  it('summarizes fixture events per player', () => {
    const summary = service.summarizeFixtureEvents([
      { playerId: 'p1', type: 'GOAL' as never },
      { playerId: 'p1', type: 'GOAL' as never },
      { playerId: 'p1', type: 'YELLOW_CARD' as never },
      { playerId: 'p2', type: 'ASSIST' as never },
      { playerId: 'p2', type: 'VAR_DECISION' as never },
      { playerId: null, type: 'GOAL' as never },
    ]);

    expect(summary.size).toBe(2);
    expect(summary.get('p1')?.stats.goals).toBe(2);
    expect(summary.get('p1')?.stats.yellowCards).toBe(1);
    expect(summary.get('p1')?.stats.appeared).toBe(true);
    expect(summary.get('p2')?.stats.assists).toBe(1);
  });
});