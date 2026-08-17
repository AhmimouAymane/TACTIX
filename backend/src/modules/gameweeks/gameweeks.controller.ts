import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GameweeksService } from './gameweeks.service';

@ApiTags('gameweeks')
@Controller('gameweeks')
export class GameweeksController {
  constructor(private readonly gameweeksService: GameweeksService) {}

  @Get()
  findAll() {
    return this.gameweeksService.findAll();
  }

  @Get('current')
  findCurrent() {
    return this.gameweeksService.findCurrent();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gameweeksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/process')
  @HttpCode(HttpStatus.OK)
  process(@Param('id', ParseUUIDPipe) id: string) {
    return this.gameweeksService.process(id);
  }
}