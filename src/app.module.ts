import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloController } from './hello/hello.controller';
import { CabanasController } from './cabanas/cabanas.controller';
import { CabanasModule } from './cabanas/cabanas.module';
import { Cabana } from './entities/cabana.entity';

@Module({
  imports: [TypeOrmModule.forRoot({ 
    type: 'mysql', 
    host: 'localhost', 
    port: 3306, 
    username: 'root', 
    password: '', 
    database: 'treslagunas', 
    autoLoadEntities: true, 
    synchronize: false, 
    entities: [Cabana],
    }),
  CabanasModule
  ],
  controllers: [AppController, HelloController, CabanasController],
  providers: [AppService],
})
export class AppModule {}
