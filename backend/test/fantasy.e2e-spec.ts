import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-access-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '30d';
process.env.BCRYPT_ROUNDS = '10';
process.env.CORS_ORIGIN = 'http://localhost:3000';
process.env.API_PREFIX = 'api/v1';
process.env.PORT = '3000';

interface PlayerJson {
  id: string;
  position: string;
  currentPrice: string;
}

describe('Fantasy (e2e)', () => {
  let app: INestApplication;
  const run = Date.now().toString(36);

  let tokenA: string;
  let tokenB: string;
  let userIdB: string;
  let leagueCode: string;
  let leagueId: string;
  let invitationId: string;

  const register = (email: string, username: string) =>
    request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email, username, password: 'SuperSecret1' })
      .expect(201);

  const cheapest = (players: PlayerJson[]) =>
    [...players].sort(
      (a, b) => Number(a.currentPrice) - Number(b.currentPrice),
    );

  const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers two users', async () => {
    const a = await register(`fantasy.a.${run}@tactix.ma`, `fantaa.${run}`);
    const b = await register(`fantasy.b.${run}@tactix.ma`, `fantab.${run}`);
    tokenA = a.body.tokens.access_token;
    tokenB = b.body.tokens.access_token;
    userIdB = b.body.user.id;
    expect(tokenA).toBeTruthy();
    expect(tokenB).toBeTruthy();
  });

  it('creates a team once and rejects a duplicate', async () => {
    const created = await request(app.getHttpServer())
      .post('/api/v1/teams')
      .set(auth(tokenA))
      .send({ name: 'Atlas Lions' })
      .expect(201);

    expect(created.body.name).toBe('Atlas Lions');
    expect(created.body.squadSlots).toEqual([]);

    await request(app.getHttpServer())
      .post('/api/v1/teams')
      .set(auth(tokenA))
      .send({ name: 'Dupe' })
      .expect(400);
  });

  it('fills the squad with server-validated prices', async () => {
    const byPosition = async (position: string, limit: number) => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/players?position=${position}&limit=${limit}`)
        .expect(200);
      return res.body.items as PlayerJson[];
    };

    const gk = cheapest(await byPosition('GK', 5))[0];
    const def = cheapest(await byPosition('DEF', 5))[0];
    const mids = cheapest(await byPosition('MID', 5));
    const fwds = cheapest(await byPosition('FWD', 5));

    const slots = [
      { playerId: gk.id, position: 'GK1' },
      { playerId: def.id, position: 'DEF1' },
      { playerId: mids[0].id, position: 'MID1', isCaptain: true },
      { playerId: mids[1].id, position: 'MID2' },
      { playerId: fwds[0].id, position: 'FWD1', isViceCaptain: true },
    ];

    const squad = await request(app.getHttpServer())
      .put('/api/v1/teams/my/squad')
      .set(auth(tokenA))
      .send({ slots })
      .expect(200);

    expect(squad.body.squadSlots).toHaveLength(5);
    const expectedValue =
      Number(gk.currentPrice) +
      Number(def.currentPrice) +
      Number(mids[0].currentPrice) +
      Number(mids[1].currentPrice) +
      Number(fwds[0].currentPrice);
    expect(Number(squad.body.value)).toBeCloseTo(expectedValue);
    expect(Number(squad.body.budgetRemaining)).toBeCloseTo(100 - expectedValue);
  });

  it('rejects a misplaced player', async () => {
    const defs = cheapest(
      (await request(app.getHttpServer())
        .get('/api/v1/players?position=DEF&limit=5')
        .expect(200)).body.items as PlayerJson[],
    );

    await request(app.getHttpServer())
      .put('/api/v1/teams/my/squad')
      .set(auth(tokenA))
      .send({ slots: [{ playerId: defs[0].id, position: 'FWD1' }] })
      .expect(400);
  });

  it('makes two transfers: the first free, the second penalised', async () => {
    const fwds = cheapest(
      (await request(app.getHttpServer())
        .get('/api/v1/players?position=FWD&limit=5')
        .expect(200)).body.items as PlayerJson[],
    );
    const mids = cheapest(
      (await request(app.getHttpServer())
        .get('/api/v1/players?position=MID&limit=5')
        .expect(200)).body.items as PlayerJson[],
    );

    const first = await request(app.getHttpServer())
      .post('/api/v1/transfers')
      .set(auth(tokenA))
      .send({ playerOutId: fwds[0].id, playerInId: fwds[1].id })
      .expect(201);

    expect(first.body.cost).toBe(0);
    expect(Number(first.body.priceDelta)).toBeCloseTo(
      Number(fwds[1].currentPrice) - Number(fwds[0].currentPrice),
    );

    const second = await request(app.getHttpServer())
      .post('/api/v1/transfers')
      .set(auth(tokenA))
      .send({ playerOutId: mids[0].id, playerInId: mids[2].id })
      .expect(201);

    expect(second.body.cost).toBe(4);

    const stats = await request(app.getHttpServer())
      .get('/api/v1/transfers/stats')
      .set(auth(tokenA))
      .expect(200);

    expect(stats.body.transfersMade).toBe(2);
    expect(stats.body.nextTransferCost).toBe(8);

    const list = await request(app.getHttpServer())
      .get('/api/v1/transfers')
      .set(auth(tokenA))
      .expect(200);
    expect(list.body).toHaveLength(2);
  });

  it('creates a league and joins it by code', async () => {
    const created = await request(app.getHttpServer())
      .post('/api/v1/leagues')
      .set(auth(tokenA))
      .send({ name: 'Moroccan Masters', capacity: 8 })
      .expect(201);

    leagueCode = created.body.code;
    leagueId = created.body.id;
    expect(leagueCode).toMatch(/^[A-Z2-9]{8}$/);

    await request(app.getHttpServer())
      .post('/api/v1/leagues/join')
      .set(auth(tokenB))
      .send({ code: leagueCode.toLowerCase() })
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/v1/leagues/join')
      .set(auth(tokenB))
      .send({ code: leagueCode })
      .expect(400);
  });

  it('rejects an unknown league code', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/leagues/join')
      .set(auth(tokenB))
      .send({ code: 'ZZZZZZZZ' })
      .expect(404);
  });

  it('shows standings with both members ranked', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/leagues/${leagueId}/standings`)
      .set(auth(tokenB))
      .expect(200);

    expect(res.body.standings).toHaveLength(2);
    expect(res.body.standings[0].hasTeam).toBe(true);
    expect(res.body.standings[0].totalPoints).toBe(0);
    expect(res.body.standings[1].rank).toBe(2);
  });

  it('forbids non-members from viewing a league', async () => {
    const outsider = await register(
      `fantasy.c.${run}@tactix.ma`,
      `fantac.${run}`,
    );
    await request(app.getHttpServer())
      .get(`/api/v1/leagues/${leagueId}`)
      .set(auth(outsider.body.tokens.access_token))
      .expect(403);
  });

  it('manages invitations end to end', async () => {
    const left = await request(app.getHttpServer())
      .delete(`/api/v1/leagues/${leagueId}/membership`)
      .set(auth(tokenB))
      .expect(200);
    expect(left.body.left).toBe(true);

    const invitation = await request(app.getHttpServer())
      .post(`/api/v1/leagues/${leagueId}/invitations`)
      .set(auth(tokenA))
      .send({ userId: userIdB })
      .expect(201);

    invitationId = invitation.body.id;
    expect(invitation.body.expiresAt).toBeTruthy();

    const accepted = await request(app.getHttpServer())
      .post('/api/v1/leagues/invitations/accept')
      .set(auth(tokenB))
      .send({ invitationId })
      .expect(201);
    expect(accepted.body.id).toBe(leagueId);

    await request(app.getHttpServer())
      .post('/api/v1/leagues/invitations/accept')
      .set(auth(tokenB))
      .send({ invitationId })
      .expect(400);
  });

  it('blocks non-owners from inviting', async () => {
    await request(app.getHttpServer())
      .post(`/api/v1/leagues/${leagueId}/invitations`)
      .set(auth(tokenB))
      .send({ userId: userIdB })
      .expect(403);
  });

  it('blocks the owner from leaving', async () => {
    await request(app.getHttpServer())
      .delete(`/api/v1/leagues/${leagueId}/membership`)
      .set(auth(tokenA))
      .expect(400);
  });
});