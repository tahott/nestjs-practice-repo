import { Module } from '@nestjs/common';
import { BaristaModule } from './barista/barista.module';
import { ManagerModule } from './manager/manager.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    BaristaModule,
    ManagerModule,
    PaymentModule,
  ],
  controllers: [],
})
export class AppModule {}
