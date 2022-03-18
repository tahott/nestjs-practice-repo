import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ManagerController } from './manager.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COFFEE_SHOP_MANAGER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'coffee-shop',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'manager',
          },
        },
      },
    ]),
  ],
  controllers: [ManagerController]
})
export class ManagerModule {}
