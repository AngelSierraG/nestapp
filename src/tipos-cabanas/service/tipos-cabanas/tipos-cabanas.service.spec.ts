import { Test, TestingModule } from '@nestjs/testing';
import { TiposCabanasService } from './tipos-cabanas.service';

describe('TiposCabanasService', () => {
  let service: TiposCabanasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposCabanasService],
    }).compile();

    service = module.get<TiposCabanasService>(TiposCabanasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
