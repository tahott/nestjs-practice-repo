import { Test, TestingModule } from '@nestjs/testing';
import { BaristaController } from './barista.controller';

describe('BaristaController', () => {
  let controller: BaristaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaristaController],
    }).compile();

    controller = module.get<BaristaController>(BaristaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
