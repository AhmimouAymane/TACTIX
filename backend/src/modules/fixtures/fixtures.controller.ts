import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('fixtures')
@Controller('fixtures')
export class FixturesController {}
