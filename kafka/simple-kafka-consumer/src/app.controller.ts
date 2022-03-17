import { Controller, Get } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('cafe.order')
  recvCafeOrderMsg(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originMessage = context.getMessage();

    const res = `
      Receiving a new message from topic: cafe.order,
      ${JSON.stringify(originMessage.value)}
    `;

    console.log(res);

    return res;
  }
}
