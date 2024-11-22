import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { AuthService } from '../../auth/auth.service'; // Importar el servicio de autenticación

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService, // Inyectar el servicio de autenticación
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    const user = new User();
    user.Username = createUserDto.username;
    user.PasswordHash = await this.authService.hashPassword(createUserDto.passwordHash); // Hashear la contraseña
    console.log(createUserDto.passwordHash)
    console.log(user.PasswordHash)
    user.Email = createUserDto.email;
    user.PhoneNumber = createUserDto.phoneNumber;
    user.Address = createUserDto.address;
    user.PhotoUrl = createUserDto.photoUrl;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { IsDeleted: false } });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { UserId: id, IsDeleted: false },
    });
  }

  async update(id: number, updateUserDto: UserDto): Promise<User> {
    const user = await this.findOne(id);
    user.Username = updateUserDto.username;
    if (updateUserDto.passwordHash) {
      user.PasswordHash = await this.authService.hashPassword(updateUserDto.passwordHash); // Hashear la contraseña
    }
    user.Email = updateUserDto.email;
    user.PhoneNumber = updateUserDto.phoneNumber;
    user.Address = updateUserDto.address;
    user.PhotoUrl = updateUserDto.photoUrl;
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.update(id, { IsDeleted: true });
  }

  findByEmail(email: string): Promise<User> {
    console.log(email)
    return this.usersRepository.findOne({
      where: { Email: email, IsDeleted: false },
    });
  }
}
