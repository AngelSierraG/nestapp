import { MiddlewareConsumer, Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { PartnersModule } from './partners/partners.module';
import * as passport from 'passport'; // Importa passport

@Module({
  imports: [TypeOrmModule.forRoot({ 
    type: 'mysql', 
    host: 'localhost', 
    port: 3306, 
    //username: 'root',
    username: 'chiapuf8_angel', 
    //password: '', 
    password: 'ASf21abc', 
    //database: 'treslagunas',
    database: 'mayandb', 
    //autoLoadEntities: true, 
    synchronize: false, 
    entities: [__dirname + '/**/*.entity{.ts,.js}'
      //Cabana
    ],
    }),  UsersModule, AuthModule, PartnersModule, 
  //CabanasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) { consumer.apply(LoggerMiddleware , passport.initialize()).forRoutes('*'); }
}
