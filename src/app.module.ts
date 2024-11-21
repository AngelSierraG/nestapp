import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({ 
    type: 'mysql', 
    host: 'localhost', 
    port: 3306, 
    username: 'root',
    //username: 'chiapuf8_angel', 
    password: '', 
    //password: 'ASf21abc', 
    //database: 'treslagunas',
    database: 'mayandb', 
    autoLoadEntities: true, 
    synchronize: false, 
    entities: [__dirname + '/**/*.entity{.ts,.js}'
      //Cabana
    ],
    }), UsersModule,
  //CabanasModule
  ],
  controllers: [AppController,
    // HelloController, CabanasController
    ],
  providers: [AppService],
})
export class AppModule {}
