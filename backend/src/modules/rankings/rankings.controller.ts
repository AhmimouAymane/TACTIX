import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rankings')
@Controller('rankings')
export class RankingsController {}
