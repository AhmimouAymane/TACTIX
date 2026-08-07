import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clubs')
@Controller('clubs')
export class ClubsController {}
