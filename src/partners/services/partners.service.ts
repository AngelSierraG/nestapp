import * as fs from 'fs';
import * as path from 'path';
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

  async update(PartnerId: number, updatePartnerDto: PartnerDto, photoFile?: Multer.File): Promise<Partner> {
    try {
        // Buscar el registro existente
        const partner = await this.partnersRepository.findOne({ where: { PartnerId } });

        if (!partner) {
            throw new Error('Partner no encontrado');
        }

        let filePath = partner.PhotoURL; // Mantener la imagen anterior si no hay nuevo archivo

        if (photoFile) {
          // Si existe una imagen anterior, eliminarla
          if (partner.PhotoURL && fs.existsSync(partner.PhotoURL)) {
              fs.unlinkSync(partner.PhotoURL);
          }
      
          // Definir la nueva ruta
          const uploadDir = path.join(__dirname, '..', 'uploads');
          if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
          }
      
          filePath = path.join(uploadDir, photoFile.filename);
      
          // Leer el archivo desde el disco antes de guardarlo
          const fileData = fs.readFileSync(photoFile.path);
          fs.writeFileSync(filePath, fileData);
      }

        // **Actualizar la base de datos con los nuevos datos**
        await this.partnersRepository.update(PartnerId, {
            ...updatePartnerDto,
            PhotoURL: filePath,
        });

        // **Retornar el registro actualizado**
        return await this.partnersRepository.findOne({ where: { PartnerId } });
    } catch (error) {
        console.error('Error al actualizar el partner:', error.message);

        throw new HttpException(
            { message: 'Error al actualizar el partner', error: error.message },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
  }

  async remove(PartnerId: number): Promise<void> {
    // Buscar el partner antes de eliminarlo
    const partner = await this.partnersRepository.findOne({ where: { PartnerId } });

    if (!partner) {
        throw new Error('Partner no encontrado');
    }

    // Si hay un archivo asociado, eliminarlo
    if (partner.PhotoURL && fs.existsSync(partner.PhotoURL)) {
        fs.unlinkSync(partner.PhotoURL);
    }

    // Eliminar el registro de la base de datos
    await this.partnersRepository.delete(PartnerId);
  }

}
