import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create(AppModule,
    { cors: {
      origin: 'http://localhost:3000',
      methods: 'GET, POST',
      allowedHeaders: 'Content-Type, Accept'
    } });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
})();
