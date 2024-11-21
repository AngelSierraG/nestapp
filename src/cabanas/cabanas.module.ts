// src/cabanas/cabanas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CabanasService } from './cabanas.service';
import { CabanasController } from './cabanas.controller';
import { Cabana } from '../entities/cabana.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cabana])],
  controllers: [CabanasController],
  providers: [CabanasService],
  exports: [CabanasService], 
})
export class CabanasModule {}

