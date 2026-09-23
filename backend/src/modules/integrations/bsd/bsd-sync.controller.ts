import {
  BadRequestException,
  Controller,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { BsdSyncService } from './bsd-sync.service';
import { SyncQueryDto } from './dto/sync-query.dto';

@ApiTags('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/sync')
export class BsdSyncController {
  constructor(private readonly sync: BsdSyncService) {}

  @Post('clubs')
  syncClubs(@Query() query: SyncQueryDto) {
    return this.sync.syncClubs(query.seasonId);
  }

  @Post('squads')
  syncSquads() {
    return this.sync.syncSquads();
  }

  @Post('prices')
  syncPrices() {
    return this.sync.syncPrices();
  }

  @Post('fixtures')
  syncFixtures(@Query() query: SyncQueryDto) {
    if (!query.seasonId) {
      throw new BadRequestException('seasonId query param is required');
    }
    return this.sync.syncFixtures(query.seasonId);
  }

  @Post('results')
  syncResults(@Query() query: SyncQueryDto) {
    if (!query.seasonId) {
      throw new BadRequestException('seasonId query param is required');
    }
    return this.sync.syncResults(query.seasonId, query.round, query.stage);
  }
}
