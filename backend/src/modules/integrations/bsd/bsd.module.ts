import { Module } from '@nestjs/common';
import { BsdClient } from './bsd.client';
import { BsdSyncController } from './bsd-sync.controller';
import { BsdSyncService } from './bsd-sync.service';

@Module({
  controllers: [BsdSyncController],
  providers: [BsdClient, BsdSyncService],
  exports: [BsdClient, BsdSyncService],
})
export class BsdModule {}
