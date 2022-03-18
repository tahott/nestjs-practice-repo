import { Controller, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('barista')
export class BaristaController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('COFFEE_SHOP_BARISTA') private readonly client: ClientKafka,
  ) { }
  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @MessagePattern('order')
  recvOrderMsg(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originMessage = context.getMessage();

    const res = `
      Receiving a new message from topic: order,
      ${JSON.stringify(originMessage.value)}
    `;

    console.log(res);

    setTimeout(() => {
      this.client.emit('order.state', Object.assign(originMessage.value, { state: 'completed', date: new Date() }));
    }, Math.floor(Math.random() * (10000 - 3000)) + 3000);

    return res;
  }
}
