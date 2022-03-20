import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TasksService } from "./tasks.service";

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
  providers: [TasksService],
})
export class TasksModule { }