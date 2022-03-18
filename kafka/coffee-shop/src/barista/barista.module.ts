import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BaristaController } from './barista.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COFFEE_SHOP_BARISTA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'coffee-shop',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'barista',
          }
        }
      }
    ]),
  ],
  controllers: [BaristaController],
})
export class BaristaModule {}
