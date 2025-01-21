import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(morgan('tiny'));

  const config = new DocumentBuilder()
    .setTitle('Perfido')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.setGlobalPrefix('/api/v1/auth');
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/v1/auth/api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(`Application is running on: http://localhost: ${port}`);
}

bootstrap();
