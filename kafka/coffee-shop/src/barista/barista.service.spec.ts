import { Test, TestingModule } from '@nestjs/testing';
import { BaristaService } from './barista.service';

describe('BaristaService', () => {
  let service: BaristaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaristaService],
    }).compile();

    service = module.get<BaristaService>(BaristaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
