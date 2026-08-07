import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {}
