import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, passwordHash: string): Promise<any> {
    this.logger.log('Entrando a validateUser'); // Verifica que este log se imprima
    const user = await this.usersService.findByEmail(email);
    this.logger.log('Credenciales recibidas:');
    this.logger.log('Email:', email);
    this.logger.log('PasswordHash:', passwordHash);
    
    if (user) {
      this.logger.log('Usuario encontrado:', user);
      const passwordMatch = await bcrypt.compare(passwordHash, user.PasswordHash);
      if (passwordMatch) {
        const { PasswordHash, ...result } = user;
        //this.logger.log('Validación exitosa:', result);
        return result;
      } else {
        this.logger.log('Contraseña incorrecta para el usuario:', email);
      }
    } else {
      this.logger.log('Usuario no encontrado con el email:', email);
    }
    
    return null;
  }

  async login(user: any) {
    this.logger.log(user)
    const payload = { username: user.Username, sub: user.UserId };
    this.logger.log('Generando token para el usuario:',  payload);
    this.logger.log(this.jwtService.sign(payload))
    return {
      access_token: this.jwtService.sign(payload),
    };
  }  

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;  // Número de rondas de sal
    return await bcrypt.hash(password, saltRounds);
  }
}
