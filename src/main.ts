import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config=new DocumentBuilder()
    .setTitle('Pets mart')
    .setDescription("This is just for learning purpose.")
    .setVersion('1.0')
    .addTag('petsmart')
    .build();
    
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  
  
  app.setGlobalPrefix('api/v1');
  app.enableCors({ credentials: true });
  await app.listen(3000);
}
bootstrap();
