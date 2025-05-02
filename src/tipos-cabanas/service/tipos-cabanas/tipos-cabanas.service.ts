import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposCabanas } from 'src/tipos-cabanas/entity/tipos-cabanas.entity/tipos-cabanas.entity';
import { CreateTiposCabanasDto } from 'src/tipos-cabanas/dto/create-tipos-cabanas.dto/create-tipos-cabanas.dto';

@Injectable()
export class TiposCabanasService {
  constructor(
    @InjectRepository(TiposCabanas)
    private tiposCabanasRepository: Repository<TiposCabanas>,
  ) {}

  findAll(): Promise<TiposCabanas[]> {
    return this.tiposCabanasRepository.find();
  }

  findOne(id: number): Promise<TiposCabanas> {
    return this.tiposCabanasRepository.findOne({ where: { idTipo: id } });
  }

  async create(dto: CreateTiposCabanasDto): Promise<TiposCabanas> {
    const nuevaCabana = this.tiposCabanasRepository.create(dto);
    return this.tiposCabanasRepository.save(nuevaCabana);
  }

  async update(id: number, dto: CreateTiposCabanasDto): Promise<TiposCabanas> {
    await this.tiposCabanasRepository.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.tiposCabanasRepository.delete(id);
  }
}