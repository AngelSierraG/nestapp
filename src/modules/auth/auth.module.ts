import { Module, forwardRef} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import {  JwtAuthGuard } from './jwt-auth.guard'
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' }, // Configura la expiración del token
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,  JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService], 
})
export class AuthModule {}
