import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  passwordHash: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  photoUrl?: string;
}
