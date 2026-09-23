import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUserEntity } from '../auth/entities/authenticated-user.entity';
import { TransfersService } from './transfers.service';
import { MakeTransferDto } from './dto/transfers.dto';

@ApiTags('transfers')
@UseGuards(JwtAuthGuard)
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get()
  list(@CurrentUser() identity: AuthenticatedUserEntity) {
    return this.transfersService.listTransfers(identity.userId);
  }

  @Get('stats')
  stats(@CurrentUser() identity: AuthenticatedUserEntity) {
    return this.transfersService.getTransferStats(identity.userId);
  }

  @Post()
  make(
    @CurrentUser() identity: AuthenticatedUserEntity,
    @Body() dto: MakeTransferDto,
  ) {
    return this.transfersService.makeTransfer(identity.userId, dto);
  }
}