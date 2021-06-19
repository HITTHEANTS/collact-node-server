import { Test, TestingModule } from '@nestjs/testing';
import { CoService } from './co.service';

describe('CoService', () => {
  let service: CoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoService],
    }).compile();

    service = module.get<CoService>(CoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
