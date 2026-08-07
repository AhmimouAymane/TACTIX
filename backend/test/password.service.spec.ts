import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../src/modules/auth/password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'BCRYPT_ROUNDS') return 4;
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(PasswordService);
  });

  it('hashes and verifies a password', async () => {
    const password = 'SuperSecret1';
    const hash = await service.hash(password);
    expect(hash).not.toBe(password);
    expect(await service.compare(password, hash)).toBe(true);
    expect(await service.compare('wrong', hash)).toBe(false);
  });

  it('produces different hashes for same password', async () => {
    const password = 'SuperSecret1';
    const hash1 = await service.hash(password);
    const hash2 = await service.hash(password);
    expect(hash1).not.toBe(hash2);
    expect(await service.compare(password, hash1)).toBe(true);
    expect(await service.compare(password, hash2)).toBe(true);
  });
});