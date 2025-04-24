import * as fs from 'fs';
import * as path from 'path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../entities/partner.entity';
import { PartnerDto } from '../dto/partner.dto';
import * as Multer from 'multer';


// 🔹 Mueve la configuración de Multer fuera de la clase
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = '/uploads/';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1000000)}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = Multer({ storage });


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

      // Generar la ruta correcta
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
        HttpStatus.INTERNAL_SERVER_ERROR,
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

        if (photoFile && photoFile.filename) {
            const uploadDir = 'uploads/';
            const newFilePath = path.join(uploadDir, photoFile.filename);

            // Verificar si existe una imagen anterior y eliminarla de manera segura
            if (partner.PhotoURL) {
                const oldFilePath = path.resolve(partner.PhotoURL); // Normalizar ruta
                if (fs.existsSync(oldFilePath)) {
                    await fs.promises.unlink(oldFilePath);
                }
            }

            // Mover el archivo desde la ubicación temporal a la definitiva de forma asincrónica
            await fs.promises.rename(photoFile.path, newFilePath);
            filePath = newFilePath;
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
