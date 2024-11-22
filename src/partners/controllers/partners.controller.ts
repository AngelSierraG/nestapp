import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnersService } from '../services/partners.service';
import { PartnerDto } from '../dto/partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() createPartnerDto: PartnerDto) {
    return this.partnersService.create(createPartnerDto);
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
  update(@Param('id') id: number, @Body() updatePartnerDto: PartnerDto) {
    return this.partnersService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.partnersService.remove(+id);
  }
}
