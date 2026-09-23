import { TransfersService } from '../src/modules/transfers/transfers.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TransfersService', () => {
  const team = {
    id: 't1',
    userId: 'u1',
    budgetRemaining: 100,
    value: 50,
  };
  const gameweek = { id: 'g1', number: 1, status: 'OPEN' };
  const playerOut = { id: 'p1', currentPrice: 6, lastName: 'Out' };
  const playerIn = { id: 'p2', currentPrice: 8, lastName: 'In' };

  const prismaMock = {
    fantasyTeam: { findFirst: jest.fn(), update: jest.fn() },
    gameweek: { findFirst: jest.fn() },
    player: { findUnique: jest.fn() },
    squadSlot: { findMany: jest.fn(), update: jest.fn() },
    transfer: { findMany: jest.fn(), count: jest.fn(), create: jest.fn() },
    gameweekEntry: { updateMany: jest.fn() },
    $transaction: jest.fn(),
  };

  let service: TransfersService;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.fantasyTeam.findFirst.mockResolvedValue(team);
    prismaMock.gameweek.findFirst.mockResolvedValue(gameweek);
    prismaMock.player.findUnique.mockImplementation(({ where }) => {
      if (where.id === 'p1') return Promise.resolve(playerOut);
      if (where.id === 'p2') return Promise.resolve(playerIn);
      return Promise.resolve(null);
    });
    prismaMock.squadSlot.findMany.mockResolvedValue([
      { teamId: 't1', playerId: 'p1', purchasedPrice: 6 },
    ]);
    prismaMock.transfer.count.mockResolvedValue(0);
    prismaMock.transfer.create.mockResolvedValue({ id: 'tr1', cost: 0 });
    prismaMock.$transaction.mockImplementation((fn) => fn(prismaMock));
    service = new TransfersService(prismaMock as never);
  });

  it('throws when the user has no team', async () => {
    prismaMock.fantasyTeam.findFirst.mockResolvedValue(null);
    await expect(service.makeTransfer('u1', {} as never)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws when no gameweek is open', async () => {
    prismaMock.gameweek.findFirst.mockResolvedValue(null);
    await expect(
      service.makeTransfer('u1', { playerOutId: 'p1', playerInId: 'p2' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when the player out is not in the squad', async () => {
    prismaMock.squadSlot.findMany.mockResolvedValue([]);
    await expect(
      service.makeTransfer('u1', { playerOutId: 'p1', playerInId: 'p2' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when the player in is already in the squad', async () => {
    prismaMock.squadSlot.findMany.mockResolvedValue([
      { teamId: 't1', playerId: 'p1', purchasedPrice: 6 },
      { teamId: 't1', playerId: 'p2', purchasedPrice: 8 },
    ]);
    await expect(
      service.makeTransfer('u1', { playerOutId: 'p1', playerInId: 'p2' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws on insufficient budget', async () => {
    prismaMock.fantasyTeam.findFirst.mockResolvedValue({
      ...team,
      budgetRemaining: 0,
    });
    await expect(
      service.makeTransfer('u1', { playerOutId: 'p1', playerInId: 'p2' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('makes the first transfer of the gameweek free', async () => {
    const result = await service.makeTransfer('u1', {
      playerOutId: 'p1',
      playerInId: 'p2',
    });

    expect(result.cost).toBe(0);
    expect(prismaMock.squadSlot.update).toHaveBeenCalledWith({
      where: { teamId_playerId: { teamId: 't1', playerId: 'p1' } },
      data: { playerId: 'p2', purchasedPrice: 8 },
    });
    expect(prismaMock.fantasyTeam.update).toHaveBeenCalledWith({
      where: { id: 't1' },
      data: { budgetRemaining: { increment: -2 }, value: { increment: 2 } },
    });
  });

  it('charges 4 points per extra transfer in the same gameweek', async () => {
    prismaMock.transfer.count.mockResolvedValue(1);

    const result = await service.makeTransfer('u1', {
      playerOutId: 'p1',
      playerInId: 'p2',
    });

    expect(result.cost).toBe(4);
    expect(prismaMock.transfer.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ cost: 4, priceDelta: 2 }),
    });
  });

  it('applies the penalty to the draft entry of the gameweek', async () => {
    prismaMock.transfer.count.mockResolvedValue(3);
    await service.makeTransfer('u1', { playerOutId: 'p1', playerInId: 'p2' });

    expect(prismaMock.gameweekEntry.updateMany).toHaveBeenCalledWith({
      where: { teamId: 't1', gameweekId: 'g1', status: 'DRAFT' },
      data: { transfersMade: { increment: 1 }, penaltyPoints: { increment: 12 } },
    });
  });
});