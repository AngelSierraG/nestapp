// src/cabanas/cabanas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cabana } from '../entities/cabana.entity';

@Injectable()
export class CabanasService {
  constructor(
    @InjectRepository(Cabana)
    private readonly cabanaRepository: Repository<Cabana>,
  ) {}

  create(cabana: Cabana): Promise<Cabana> {
    const newCabana = this.cabanaRepository.create(cabana);
    return this.cabanaRepository.save(newCabana);
  }

  findAll(): Promise<Cabana[]> {
    return this.cabanaRepository.find();
  }

  findOne(id: number): Promise<Cabana> {
    return this.cabanaRepository.findOne({where: { idCabana: id }});
  }

  async update(id: number, cabana: Cabana): Promise<Cabana> {
    await this.cabanaRepository.update(id, cabana);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cabanaRepository.delete(id);
  }
}
