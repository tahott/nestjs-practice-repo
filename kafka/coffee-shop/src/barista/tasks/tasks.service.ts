import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Interval } from "@nestjs/schedule";
import { BaristaService } from "../barista.service";

@Injectable()
export class TasksService {
  constructor(
    @Inject('COFFEE_SHOP_BARISTA') private readonly client: ClientKafka
  ) {}
  @Interval(3000)
  async handleInterval() {
    if (BaristaService.getOrderList().length > 0
      && !BaristaService.currentBaristaWorkState()
    ) {
      BaristaService.setWorkBarista();
      const menu = BaristaService.shiftOrder();

      switch (menu) {
        case 'americano':
          await this.delay(3000);
          break;
        case 'latte':
          await this.delay(5000);
          break;
        default:
          break;
      }

      BaristaService.setWorkBarista();
      this.client.emit('order.state', Object.assign({ state: 'completed', date: new Date() }));
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
}