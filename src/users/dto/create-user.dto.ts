import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsTrue } from '../../common/decorators/is-true.decorator';
import { MESSAGES } from '../../common/utils/messages';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  confirmPassword: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean({ message: MESSAGES.aggreedToTerms })
  @IsTrue({ message: MESSAGES.aggreedToTermsRequired })
  agreedToTerms: boolean;
}
