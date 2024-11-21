import { Test, TestingModule } from '@nestjs/testing';
import { CabanasController } from './cabanas.controller';

describe('CabanasController', () => {
  let controller: CabanasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CabanasController],
    }).compile();

    controller = module.get<CabanasController>(CabanasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
