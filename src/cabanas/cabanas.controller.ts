// src/cabanas/cabanas.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CabanasService } from './cabanas.service';
import { Cabana } from '../entities/cabana.entity';

@Controller('cabanas')
export class CabanasController {
  constructor(private readonly cabanasService: CabanasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cabaña' }) 
  @ApiBody({ type: Cabana })
  create(@Body() cabana: Cabana) {
    return this.cabanasService.create(cabana);
  }

  @Get()
  findAll() {
    return this.cabanasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cabanasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() cabana: Cabana) {
    return this.cabanasService.update(id, cabana);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cabanasService.remove(id);
  }
}

