import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('scoring')
@Controller('scoring')
export class ScoringController {}
