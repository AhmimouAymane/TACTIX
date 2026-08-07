import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {}
