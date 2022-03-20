import { Controller } from '@nestjs/common';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { BaristaService } from './barista.service';

@Controller('barista')
export class BaristaController {
  constructor() { }

  @MessagePattern('order.success')
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

    BaristaService.insertOrder(
      JSON.parse(JSON.stringify(originMessage.value)).name
    );

    return res;
  }
}