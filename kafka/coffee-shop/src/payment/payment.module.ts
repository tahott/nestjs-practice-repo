import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COFFEE_SHOP_PAYMENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'coffee-shop',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'payment',
          },
        },
      },
    ])
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
