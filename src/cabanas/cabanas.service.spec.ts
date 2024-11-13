import { Test, TestingModule } from '@nestjs/testing';
import { CabanasService } from './cabanas.service';

describe('CabanasService', () => {
  let service: CabanasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CabanasService],
    }).compile();

    service = module.get<CabanasService>(CabanasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
