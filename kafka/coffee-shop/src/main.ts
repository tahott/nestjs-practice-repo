import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'coffee-shop',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'coffee-shop',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`Application is running on: ${ await app.getUrl() }`);
}
bootstrap();
