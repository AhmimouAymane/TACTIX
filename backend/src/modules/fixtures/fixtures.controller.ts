import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FixtureStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { FixturesService } from './fixtures.service';

class FixtureListQueryDto {
  @IsUUID()
  @IsOptional()
  gameweekId?: string;

  @IsEnum(FixtureStatus)
  @IsOptional()
  status?: FixtureStatus;

  @IsUUID()
  @IsOptional()
  competitionId?: string;
}

@ApiTags('fixtures')
@Controller('fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @Get()
  findAll(@Query() query: FixtureListQueryDto) {
    return this.fixturesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.fixturesService.findOne(id);
  }
}