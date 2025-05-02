import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TiposCabanasService } from 'src/tipos-cabanas/service/tipos-cabanas/tipos-cabanas.service';
import { CreateTiposCabanasDto } from 'src/tipos-cabanas/dto/create-tipos-cabanas.dto/create-tipos-cabanas.dto';

@ApiTags('TiposCabanas')
@Controller('tipos-cabanas')
export class TiposCabanasController {
  constructor(private readonly tiposCabanasService: TiposCabanasService) {}

  @Get()
  findAll() {
    return this.tiposCabanasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tiposCabanasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTiposCabanasDto) {
    return this.tiposCabanasService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateTiposCabanasDto) {
    return this.tiposCabanasService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tiposCabanasService.delete(id);
  }
}