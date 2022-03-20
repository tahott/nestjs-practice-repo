import { Body, Controller, Inject, OnModuleDestroy, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

class OrderDto {
  type: string;
  name: string;
  size: string;
  amount: number;
}

@Controller()
export class ManagerController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('COFFEE_SHOP_MANAGER') private readonly client: ClientKafka,
  ) { }
  async onModuleInit() {
    this.client.subscribeToResponseOf('order.pending');
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Post('order')
  order(@Body() createOrder: OrderDto) {
    return this.client.emit('order.pending', Object.assign(createOrder, { date: new Date() }));
  }

  @Post('order-wait-response')
  orderWaitResponse(
    @Body() createOrder: OrderDto
  ) {
    return this.client.send('order.pending', createOrder);
  }

  @MessagePattern('payment')
  recvPaymentMsg(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originMessage = context.getMessage();

    const res = `
      Receiving a new message from topic: payment,
      ${JSON.stringify(originMessage.value)}
    `;

    console.log(res)

    if (JSON.parse(JSON.stringify(originMessage.value)).paymentResult) {
      this.client.emit('order.success', originMessage.value);
    }
  }
}
