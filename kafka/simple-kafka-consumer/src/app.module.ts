import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAFE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cafe',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'cafe-service',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
