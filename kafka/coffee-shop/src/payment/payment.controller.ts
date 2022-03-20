import { Controller, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payment')
export class PaymentController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('COFFEE_SHOP_PAYMENT') private readonly client: ClientKafka,
  ) { }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @MessagePattern('order.pending')
  recvOrderMsg(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originMessage = context.getMessage();

    const paymentResult = this.thirdPartyPaymentFn();

    const res = `
      Receiving a new message from topic: order.pending,
      ${JSON.stringify(originMessage.value), JSON.stringify({ paymentResult })}
    `;

    console.log(res);

    this.client.emit(
      'payment',
      Object.assign(originMessage.value, { paymentResult }),
    )

    return res;
  }

  private thirdPartyPaymentFn(): boolean {
    const draw = [true, true, true, true, true, true, true, true, false, false];

    return draw[Math.floor(Math.random() * 10)];
  }
}


