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

  async update(id: number, updatePartnerDto: PartnerDto, photoFile?: Multer.File): Promise<Partner> {
    try {
        const partner = await this.partnersRepository.findOne({ where: { PartnerId: id } });

        if (!partner) {
            throw new Error('Partner no encontrado');
        }

        let filePath = partner.PhotoURL; // Mantener la imagen previa si no hay nuevo archivo

        if (photoFile) {
            // Si hay un archivo nuevo, buscar y eliminar el anterior de la base de datos
            if (partner.PhotoURL) {
                const previousFilePath = partner.PhotoURL;

                if (fs.existsSync(previousFilePath)) {
                    fs.unlinkSync(previousFilePath);
                }
            }

            // Definir la ruta de almacenamiento
            const uploadDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            filePath = path.join(uploadDir, photoFile.filename);

            // Guardar el nuevo archivo
            fs.writeFileSync(filePath, photoFile.buffer);
        }

        // Actualizar el registro en la base de datos
        await this.partnersRepository.update(id, {
            ...updatePartnerDto,
            PhotoURL: filePath,
        });

        return await this.partnersRepository.findOne({ where: { PartnerId: id } });
    } catch (error) {
        console.error('Error al actualizar el partner:', error.message);

        throw new HttpException(
            { message: 'Error al actualizar el partner', error: error.message },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
  }



  async remove(id: number): Promise<void> {
    await this.partnersRepository.delete(id);
  }
}
