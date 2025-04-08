import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { AuthService } from '../../auth/auth.service'; // Importar el servicio de autenticación
import { Partner } from 'src/partners/entities/partner.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService, // Inyectar el servicio de autenticación
  ) {}

  async create(createUserDto: UserDto): Promise<User> { 

    const { PartnerId, ...userData } = createUserDto; 

    const partner = await this.partnerRepository.findOne({ where: { PartnerId } }); 

    if (!partner) { 
      throw new Error('Partner not found'); 
    } 
    const user = this.usersRepository.create({ ...userData, Partner: partner, }); 

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
    const { PartnerId, ...userData } = updateUserDto; 
    const user = await this.usersRepository.findOne({ where: { UserId: id } }); 

    if (!user) { 
      throw new Error('User not found'); 
    } 

    if (PartnerId !== undefined) {
      const partner = await this.partnerRepository.findOne({ where: { PartnerId } });

      if (!partner) {
        throw new Error('Partner not found'); 
      } 
      user.Partner = partner; 
    } 

    Object.assign(user, userData); 
    return this.usersRepository.save(user);

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
