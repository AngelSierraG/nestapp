import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: ['error', 'warn', 'log'] // <--- Add this line in options object
});

  
  // Configuración de Swagger 
  const config = new DocumentBuilder() 
  .setTitle('Cabañas API') 
  .setDescription('API para gestión de cabañas') 
  .setVersion('24.04.25-2') 
  .addBearerAuth()
  .build(); 

  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
