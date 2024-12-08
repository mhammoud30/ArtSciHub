import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the Angular build
  app.useStaticAssets(join(__dirname, '..', 'public/browser'));
  app.setBaseViewsDir(join(__dirname, '..', 'public/browser'));

  // Serve index.html for all unknown routes
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.originalUrl.startsWith('/api')) {
      res.sendFile(join(__dirname, '..', 'public/browser', 'index.html'));
    } else {
      next();
    }
  });

  app.setViewEngine('html');
  /**
   * Use validation pipes globally
   */
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

  /**
   * swagger configuration
   */

  /*   const config = new DocumentBuilder()
    .setTitle('ArtSciHub API')
    .setDescription(
      'Use the base URL to access the API as http://localhost:3000/',
    )
    .setVersion('1.0')
    .addTag('nestjs')
    .addServer('http://localhost:3000/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); */

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://awake-adventure.up.railway.app',
      'https://artscihub.com',
    ], // Replace '*' with the actual domain(s) if needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
}
bootstrap();
