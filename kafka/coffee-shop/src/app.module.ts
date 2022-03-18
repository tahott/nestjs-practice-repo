import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { BaristaController } from './barista/barista.controller';
import { BaristaModule } from './barista/barista.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [
    BaristaModule,
    ManagerModule,
  ],
  // controllers: [, BaristaController],
})
export class AppModule {}
