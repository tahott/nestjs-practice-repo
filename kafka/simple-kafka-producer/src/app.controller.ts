import { Body, Controller, Get, Inject, OnModuleDestroy, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

class OrderDto {
  type: string;
  name: string;
  size: string;
  amount: number;
}

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly appService: AppService,
    @Inject('CAFE_SERVICE') private readonly client: ClientKafka,
  ) { }
  async onModuleInit() {
    this.client.subscribeToResponseOf('cafe.order');

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('order')
  order(@Body() createOrder: OrderDto) {
    return this.client.emit('cafe.order', createOrder);
  }

  @Post('order-wait-response')
  orderWaitResponse(
    @Body() createOrder: OrderDto
  ) {
    return this.client.send('cafe.order', createOrder);
  }
}
