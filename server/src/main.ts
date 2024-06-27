import getCors from './config/cors';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(getCors());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
