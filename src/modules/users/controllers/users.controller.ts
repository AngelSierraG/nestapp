import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a single user.', type: User })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(Number(id));
  }
}
