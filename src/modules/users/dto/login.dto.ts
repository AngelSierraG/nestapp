import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  
  @ApiProperty()
  email: string;

  @ApiProperty()
  passwordHash: string;

}
