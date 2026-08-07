import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('TACTIX API')
    .setDescription('Moroccan Fantasy Football Platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('players', 'Player database')
    .addTag('clubs', 'Club database')
    .addTag('fixtures', 'Fixtures and matches')
    .addTag('gameweeks', 'Gameweek management')
    .addTag('teams', 'Fantasy team management')
    .addTag('transfers', 'Player transfers')
    .addTag('leagues', 'League management')
    .addTag('rankings', 'Rankings and standings')
    .addTag('news', 'News and articles')
    .addTag('notifications', 'Notifications')
    .addTag('admin', 'Admin endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 TACTIX Backend running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/docs`);
}

bootstrap();