import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PartnersService } from '../services/partners.service';
import { PartnerDto } from '../dto/partner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as Multer from 'multer';


@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads', // Carpeta donde se guardan los archivos
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      }
    })
  }))

  create(@Body() createPartnerDto: PartnerDto,
  @UploadedFile() photoFile: Multer.File
  ) {
    return this.partnersService.create(createPartnerDto, photoFile);
  }

  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.partnersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      }
    })
  }))
  async update(@Param('id') id: number, @Body() updatePartnerDto: PartnerDto, @UploadedFile() photoFile?: Multer.File) {
    return this.partnersService.update(+id, updatePartnerDto, photoFile);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.partnersService.remove(+id);
  }
}
