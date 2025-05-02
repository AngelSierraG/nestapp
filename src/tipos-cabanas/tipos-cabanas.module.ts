import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposCabanasService } from './service/tipos-cabanas/tipos-cabanas.service';
import { TiposCabanasController } from './controller/tipos-cabanas/tipos-cabanas.controller';
import { TiposCabanas } from 'src/tipos-cabanas/entity/tipos-cabanas.entity/tipos-cabanas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TiposCabanas])],
  providers: [TiposCabanasService],
  controllers: [TiposCabanasController],
  exports: [TypeOrmModule]
})
export class TiposCabanasModule {}
