import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    @Inject('COFFEE_SHOP_USER') private readonly client: ClientKafka
  ) { }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @MessagePattern('order.state')
  recvCafeOrderMsg(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originMessage = context.getMessage();

    const res = `
      Receiving a new message from topic: order.state,
      ${JSON.stringify(originMessage.value)}
    `;

    console.log(res);

    return res;
  }
}
