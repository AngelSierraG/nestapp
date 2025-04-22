import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../entities/partner.entity';
import { PartnerDto } from '../dto/partner.dto';
import * as Multer from 'multer';




@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  async create(createPartnerDto: PartnerDto, photoFile: Multer.File): Promise<Partner> {
    try {
      if (!photoFile) {
        throw new Error('No se ha subido ningún archivo');
      }
  
      const filePath = `uploads/${photoFile.filename}`;
      const partner = this.partnersRepository.create({
        ...createPartnerDto,
        PhotoURL: filePath,
      });
  
      return await this.partnersRepository.save(partner);
    } catch (error) {
      console.error('Error al crear el partner:', error.message);
  
      throw new HttpException(
        { message: 'Error al registrar el partner', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
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
