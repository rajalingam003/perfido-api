import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MESSAGES } from './common/utils/messages';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(MESSAGES.setUrl);

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
