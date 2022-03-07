import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions: CorsOptions = {
    origin: true,
  }

  app.useStaticAssets(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
