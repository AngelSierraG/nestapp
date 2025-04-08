import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../entities/partner.entity';
import { PartnerDto } from '../dto/partner.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  create(createPartnerDto: PartnerDto): Promise<Partner> {
    const partner = this.partnersRepository.create(createPartnerDto);
    return this.partnersRepository.save(partner);
  }

  findAll(): Promise<Partner[]> {
    return this.partnersRepository.find();
  }

  findOne(id: number): Promise<Partner> {
    return this.partnersRepository.findOne({ where: { PartnerId: id }});
  }

  async update(id: number, updatePartnerDto: PartnerDto): Promise<Partner> {
    await this.partnersRepository.update(id, updatePartnerDto);
    return this.partnersRepository.findOne({ where: { PartnerId: id }});
  }

  async remove(id: number): Promise<void> {
    await this.partnersRepository.delete(id);
  }
}
