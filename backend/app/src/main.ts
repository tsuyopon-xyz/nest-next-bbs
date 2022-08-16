import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // CORS options: https://github.com/expressjs/cors#configuration-options
  app.enableCors({
    origin: process.env.ACCESS_ALLOW_ORIGIN,
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT);
}
bootstrap();
