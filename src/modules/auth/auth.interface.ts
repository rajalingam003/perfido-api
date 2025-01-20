import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ILogin {
  @ApiProperty({
    pattern: '^(.+)@(.+)$',
    default: 'example@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 8,
    // pattern: '^(.+)@(.+)$',
    required: true,
  })
  // @IsStrongPassword(
  //   {
  //     minLength: 8,
  //     minNumbers: 1,
  //     minSymbols: 1,
  //     minLowercase: 1,
  //     minUppercase: 1,
  //   },
  //   {
  //     message: [
  //       'Your password must meet the following criteria:',
  //       'Minimum length: 8 characters',
  //       'At least 1 numeric digit',
  //       'At least 1 special symbol',
  //       'At least 1 lowercase letter',
  //       'At least 1 uppercase letter',
  //       'Please ensure that your password adheres to these requirements for enhanced security',
  //     ].toString(),
  //   },
  // )
  password: string;
}
