import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Console } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  function getSwaggerServerUrl() {
    switch (process.env.NODE_ENV) {
      case 'production':
        return 'https://nestjs-ecommerce-alpha.vercel.app';
      default:
        return `http://localhost:${3000}`;
    }
  }

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('0.1')
    .addServer(getSwaggerServerUrl())
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
