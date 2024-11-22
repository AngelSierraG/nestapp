import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersService } from './services/partners.service';
import { PartnersController } from './controllers/partners.controller';
import { Partner } from './entities/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [PartnersService],
  controllers: [PartnersController],
})
export class PartnersModule {}
