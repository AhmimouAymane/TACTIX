import { PrismaClient } from '@prisma/client';
import {
  Prisma,
  FixtureStatus,
  GameweekStatus,
  PlayerPosition,
  UserRole,
  UserStatus,
} from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'ladmin@tactix.app';
const ADMIN_PASSWORD = 'Admin12345!';

const clubs = [
  {
    name: 'Raja Club Athletic',
    shortName: 'RCA',
    city: 'Casablanca',
    stadium: 'Stade Mohamed V',
    colors: { primary: '#008751', secondary: '#FFFFFF' },
  },
  {
    name: 'Wydad Athletic Club',
    shortName: 'WAC',
    city: 'Casablanca',
    stadium: 'Stade Mohamed V',
    colors: { primary: '#E30613', secondary: '#FFFFFF' },
  },
  {
    name: 'AS FAR',
    shortName: 'ASF',
    city: 'Rabat',
    stadium: 'Stade Moulay Abdellah',
    colors: { primary: '#003366', secondary: '#FFFFFF' },
  },
  {
    name: 'RS Berkane',
    shortName: 'RSB',
    city: 'Berkane',
    stadium: 'Stade Municipal de Berkane',
    colors: { primary: '#FF8C00', secondary: '#000000' },
  },
];

type ClubSeed = {
  clubIndex: number;
  firstName: string;
  lastName: string;
  position: PlayerPosition;
  price: string;
  shirtNumber: number;
};

const players: ClubSeed[] = [
  // RCA
  { clubIndex: 0, firstName: 'Amine', lastName: 'Toufik', position: PlayerPosition.GK, price: '5.0', shirtNumber: 1 },
  { clubIndex: 0, firstName: 'Hamza', lastName: 'Lazaar', position: PlayerPosition.DEF, price: '4.5', shirtNumber: 4 },
  { clubIndex: 0, firstName: 'Mehdi', lastName: 'El Ghazi', position: PlayerPosition.MID, price: '7.5', shirtNumber: 10 },
  { clubIndex: 0, firstName: 'Karim', lastName: 'Ait Baha', position: PlayerPosition.FWD, price: '8.5', shirtNumber: 9 },
  // WAC
  { clubIndex: 1, firstName: 'Soufiane', lastName: 'El Amrani', position: PlayerPosition.GK, price: '5.2', shirtNumber: 1 },
  { clubIndex: 1, firstName: 'Ilias', lastName: 'Chafik', position: PlayerPosition.DEF, price: '4.8', shirtNumber: 3 },
  { clubIndex: 1, firstName: 'Anas', lastName: 'Boumediene', position: PlayerPosition.MID, price: '7.0', shirtNumber: 8 },
  { clubIndex: 1, firstName: 'Zakaria', lastName: 'El Kaddouri', position: PlayerPosition.FWD, price: '9.0', shirtNumber: 7 },
  // AS FAR
  { clubIndex: 2, firstName: 'Mohamed', lastName: 'Bellamine', position: PlayerPosition.GK, price: '4.8', shirtNumber: 1 },
  { clubIndex: 2, firstName: 'Ayoub', lastName: 'El Khalfi', position: PlayerPosition.DEF, price: '4.2', shirtNumber: 5 },
  { clubIndex: 2, firstName: 'Oussama', lastName: 'Ziani', position: PlayerPosition.MID, price: '6.8', shirtNumber: 6 },
  // RS Berkane
  { clubIndex: 3, firstName: 'Nabil', lastName: 'El Moussaoui', position: PlayerPosition.GK, price: '4.5', shirtNumber: 1 },
  { clubIndex: 3, firstName: 'Adil', lastName: 'El Hassani', position: PlayerPosition.MID, price: '6.2', shirtNumber: 10 },
  { clubIndex: 3, firstName: 'Hicham', lastName: 'Amraoui', position: PlayerPosition.FWD, price: '7.8', shirtNumber: 9 },
];

async function main() {
  console.log('Seeding TACTIX database...');

  // Idempotent: wipe in dependency-first order.
  await prisma.fixture.deleteMany();
  await prisma.gameweek.deleteMany();
  await prisma.player.deleteMany();
  await prisma.club.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      username: 'ladmin',
      passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
      displayName: 'TACTIX Admin',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      language: 'en',
    },
  });

  const competition = await prisma.competition.create({
    data: {
      name: 'Botola Pro 1',
      code: 'BOTOLA_PRO_2026',
      country: 'MA',
      seasonStart: new Date('2026-08-01T00:00:00Z'),
      seasonEnd: new Date('2027-05-31T00:00:00Z'),
    },
  });

  const createdClubs = await prisma.club.createManyAndReturn({
    data: clubs.map((club) => ({
      name: club.name,
      shortName: club.shortName,
      city: club.city,
      stadium: club.stadium,
      colors: club.colors,
    })),
  });

  await prisma.player.createMany({
    data: players.map((player) => ({
      clubId: createdClubs[player.clubIndex].id,
      firstName: player.firstName,
      lastName: player.lastName,
      position: player.position,
      nationality: 'MA',
      shirtNumber: player.shirtNumber,
      startingPrice: new Prisma.Decimal(player.price),
      currentPrice: new Prisma.Decimal(player.price),
      previousPrice: new Prisma.Decimal(player.price),
    })),
  });

  const gameweeks = await prisma.gameweek.createManyAndReturn({
    data: [
      {
        competitionId: competition.id,
        number: 1,
        deadlineAt: new Date('2026-08-14T19:00:00Z'),
        status: GameweekStatus.OPEN,
      },
      {
        competitionId: competition.id,
        number: 2,
        deadlineAt: new Date('2026-08-21T19:00:00Z'),
        status: GameweekStatus.UPCOMING,
      },
    ],
  });

  await prisma.fixture.createMany({
    data: [
      {
        competitionId: competition.id,
        gameweekId: gameweeks[0].id,
        homeClubId: createdClubs[0].id,
        awayClubId: createdClubs[1].id,
        venue: 'Stade Mohamed V',
        kickoffAt: new Date('2026-08-15T20:00:00Z'),
        status: FixtureStatus.SCHEDULED,
      },
      {
        competitionId: competition.id,
        gameweekId: gameweeks[0].id,
        homeClubId: createdClubs[2].id,
        awayClubId: createdClubs[3].id,
        venue: 'Stade Moulay Abdellah',
        kickoffAt: new Date('2026-08-15T17:00:00Z'),
        status: FixtureStatus.SCHEDULED,
      },
      {
        competitionId: competition.id,
        gameweekId: gameweeks[1].id,
        homeClubId: createdClubs[1].id,
        awayClubId: createdClubs[2].id,
        venue: 'Stade Mohamed V',
        kickoffAt: new Date('2026-08-22T20:00:00Z'),
        status: FixtureStatus.SCHEDULED,
      },
      {
        competitionId: competition.id,
        gameweekId: gameweeks[1].id,
        homeClubId: createdClubs[3].id,
        awayClubId: createdClubs[0].id,
        venue: 'Stade Municipal de Berkane',
        kickoffAt: new Date('2026-08-22T17:00:00Z'),
        status: FixtureStatus.SCHEDULED,
      },
    ],
  });

  const counts = {
    users: await prisma.user.count(),
    competitions: await prisma.competition.count(),
    clubs: await prisma.club.count(),
    players: await prisma.player.count(),
    gameweeks: await prisma.gameweek.count(),
    fixtures: await prisma.fixture.count(),
  };

  console.log('Seed completed:');
  console.log(`  - admin user: ${ADMIN_EMAIL} (username: ladmin, role: ADMIN)`);
  console.log(`  - competition: ${competition.name} (${competition.code})`);
  console.log(`  - clubs: ${counts.clubs}`);
  console.log(`  - players: ${counts.players}`);
  console.log(`  - gameweeks: ${counts.gameweeks}`);
  console.log(`  - fixtures: ${counts.fixtures}`);
  console.log(`  - users: ${counts.users}`);

  void admin;
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
