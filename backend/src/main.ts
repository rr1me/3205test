import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';

(async () => {
  const app = await NestFactory.create(AppModule,
    { cors: {
      origin: process.env.CORS_ORIGIN,
      methods: 'GET, POST',
      allowedHeaders: 'Content-Type, Accept'
    } });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
})();
