import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    await this.$connect();
  }

  async onModuleDestroy() {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }
    const models = Reflect.ownKeys(this).filter(
      (key): key is string =>
        typeof key === 'string' && !key.startsWith('_') && !key.startsWith('$'),
    );
    const delegates = this as unknown as Record<string, { deleteMany?: () => Promise<unknown> }>;
    for (const model of models) {
      if (typeof delegates[model]?.deleteMany === 'function') {
        await delegates[model].deleteMany();
      }
    }
  }
}