import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.Username = createUserDto.username;
    user.PasswordHash = createUserDto.passwordHash;
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
      where: { UserId: id, IsDeleted: false }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.Username = updateUserDto.username;
    user.PasswordHash = updateUserDto.passwordHash;
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
}

