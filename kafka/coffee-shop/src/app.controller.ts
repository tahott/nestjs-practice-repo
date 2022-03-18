import { Body, Controller, Inject, OnModuleDestroy, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('COFFEE_SHOP') private readonly client: ClientKafka,
  ) { }
  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  // @Post('order')
  // order(@Body() createOrder: OrderDto) {
  //   return this.client.emit('order', Object.assign(createOrder, { date: new Date() }));
  // }

  // @Post('order-wait-response')
  // orderWaitResponse(
  //   @Body() createOrder: OrderDto
  // ) {
  //   return this.client.send('order', createOrder);
  // }
}
