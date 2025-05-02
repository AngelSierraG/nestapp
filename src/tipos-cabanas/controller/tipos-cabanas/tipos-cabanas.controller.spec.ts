import { Test, TestingModule } from '@nestjs/testing';
import { TiposCabanasController } from './tipos-cabanas.controller';

describe('TiposCabanasController', () => {
  let controller: TiposCabanasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposCabanasController],
    }).compile();

    controller = module.get<TiposCabanasController>(TiposCabanasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
